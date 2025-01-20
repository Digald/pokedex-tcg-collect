// lib/db/local.ts
import Dexie from "dexie";
// import { BasePokemon } from "@/lib/utils/pokemonData";

// Interface for collection data
interface PokemonCollection {
  pokemonId: number;
  isCollected: boolean;
  isDoubleRare: boolean;
  isIllustrationRare: boolean;
  dateCollected?: Date;
  notes?: string;
}

export class PokemonDatabase extends Dexie {
  collection!: Dexie.Table<PokemonCollection, number>;

  constructor() {
    super("PokemonCollector");

    this.version(1).stores({
      // We only store the collection status, not the basic Pokémon data
      collection: "pokemonId, isCollected, isDoubleRare, isIllustrationRare",
    });
  }
}

export const db = new PokemonDatabase();
