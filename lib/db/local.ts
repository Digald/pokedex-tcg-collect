import Dexie from "dexie";
// import { BasePokemon } from "@/lib/utils/pokemonData";

// Interface for collection data
interface PokemonCollection {
  pokemonId: number;
  isCollected: boolean;
  isDoubleRare: boolean;
  isIllustrationRare: boolean;
  isUltraRare: boolean;
  isSpecialIllustrationRare: boolean;
  isHyperRare: boolean;
}

let db: PokemonDatabase;

export class PokemonDatabase extends Dexie {
  collection!: Dexie.Table<PokemonCollection, number>;

  constructor() {
    super("PokemonCollector");

    this.version(1).stores({
      // We only store the collection status, not the basic Pokémon data
      collection:
        "pokemonId, isCollected, isDoubleRare, isIllustrationRare, isSpecialIllustrationRare, isUltraRare, isHyperRare",
    });
  }
}

if (typeof window !== 'undefined') {
  db = new PokemonDatabase();
}

export { db };
