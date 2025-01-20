// fetchPokemon.js
import fetch from "node-fetch";
import { writeFile } from "fs/promises";

// This function adds leading zeros to numbers to create consistent Pokemon numbers
// For example: 1 becomes "001", 25 becomes "025"
function formatPokemonNumber(number) {
  return number.toString().padStart(3, "0");
}

// This function handles the fetching of a single Pokemon's data
// We use this to retry failed requests and handle errors gracefully
async function fetchPokemonData(number) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${number}/`
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Extract only the data we need to keep our JSON file small and efficient
    return {
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1), // Capitalize the name
      imageUrl: data.sprites.other["official-artwork"].front_default,
      number: formatPokemonNumber(data.id),
    };
  } catch (error) {
    console.error(`Error fetching Pokemon #${number}:`, error);
    return null;
  }
}

// Main function to fetch all Pokemon
async function fetchAllPokemon() {
  console.log("Starting Pokemon data collection...");

  const pokemonList = [];
  const TOTAL_POKEMON = 1025;
  const BATCH_SIZE = 10; // Number of simultaneous requests

  // Process Pokemon in batches to avoid overwhelming the API
  for (let i = 0; i < TOTAL_POKEMON; i += BATCH_SIZE) {
    const batch = [];

    // Create a batch of promises for concurrent fetching
    for (let j = 0; j < BATCH_SIZE && i + j < TOTAL_POKEMON; j++) {
      const pokemonNumber = i + j + 1; // +1 because Pokemon IDs start at 1
      batch.push(fetchPokemonData(pokemonNumber));
    }

    // Wait for all promises in the batch to resolve
    const results = await Promise.all(batch);

    // Filter out any failed requests and add successful ones to our list
    const successfulResults = results.filter((result) => result !== null);
    pokemonList.push(...successfulResults);

    // Log progress
    console.log(
      `Processed Pokemon ${i + 1} to ${Math.min(i + BATCH_SIZE, TOTAL_POKEMON)}`
    );
  }

  // Create the final JSON structure
  const pokemonData = {
    pokemon: pokemonList.sort((a, b) => a.id - b.id), // Ensure Pokemon are in order
  };

  // Write the data to a file
  try {
    await writeFile(
      "public/data/pokemon.json",
      JSON.stringify(pokemonData, null, 2) // Pretty print the JSON
    );
    console.log("Successfully wrote Pokemon data to pokemon.json");
  } catch (error) {
    console.error("Error writing file:", error);
  }
}

// Execute the script
fetchAllPokemon().catch((error) => {
  console.error("Script failed:", error);
});
