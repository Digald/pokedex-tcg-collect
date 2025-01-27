"use client";
import { useEffect, useState } from "react";
import { getAllPokemon, BasePokemon } from "@/lib/utils/pokemonData";
import { db } from "@/lib/db/local";
import { PokemonCard } from "@/components/collection/PokemonCard";

interface PokemonWithStatus extends BasePokemon {
  isCollected: boolean;
  isDoubleRare: boolean;
  isIllustrationRare: boolean;
  isUltraRare: boolean;
  isSpecialIllustrationRare: boolean;
  isHyperRare: boolean;
}

export function PokemonList() {
  const [pokemonList, setPokemonList] = useState<PokemonWithStatus[]>([]);

  useEffect(() => {
    const loadPokemon = async () => {
      // Get the static Pokémon data
      const basePokemon = getAllPokemon();

      // Get collection status from IndexedDB
      const collectionStatuses = await db.collection.toArray();

      // Combine the data
      const combinedData = basePokemon.map((pokemon) => {
        const status = collectionStatuses.find(
          (s) => s.pokemonId === pokemon.id
        );
        return {
          ...pokemon,
          isCollected: status?.isCollected ?? false,
          isDoubleRare: status?.isDoubleRare ?? false,
          isIllustrationRare: status?.isIllustrationRare ?? false,
          isUltraRare: status?.isUltraRare ?? false,
          isSpecialIllustrationRare: status?.isSpecialIllustrationRare ?? false,
          isHyperRare: status?.isHyperRare ?? false,
        };
      });

      setPokemonList(combinedData);
    };

    loadPokemon();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
