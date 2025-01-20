// lib/utils/pokemonData.ts
import pokemonData from "@/public/data/pokemon.json";

// TypeScript interface for our Pokemon data
export interface BasePokemon {
  id: number;
  name: string;
  imageUrl: string;
  number: string;
}

// Function to get all Pokémon
export function getAllPokemon(): BasePokemon[] {
  return pokemonData.pokemon;
}

// Utility function to get a single Pokémon by ID
export function getPokemonById(id: number): BasePokemon | undefined {
  return pokemonData.pokemon.find((p) => p.id === id);
}

// Utility function to search Pokémon by name
export function searchPokemon(query: string): BasePokemon[] {
  const normalizedQuery = query.toLowerCase();
  return pokemonData.pokemon.filter((p) =>
    p.name.toLowerCase().includes(normalizedQuery)
  );
}
