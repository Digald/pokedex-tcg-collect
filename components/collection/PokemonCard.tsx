import { useState } from "react";
import { savePokemonStatus } from "@/lib/db/local";

type StatusKeys = keyof typeof initialStatus;
const initialStatus = {
  isCollected: false,
  isDoubleRare: false,
  isIllustrationRare: false,
  isUltraRare: false,
  isSpecialIllustrationRare: false,
  isHyperRare: false,
} as const;

export function PokemonCard({ pokemon }: { pokemon: any }) {
  const [status, setStatus] = useState({
    isCollected: pokemon.isCollected,
    isDoubleRare: pokemon.isDoubleRare,
    isIllustrationRare: pokemon.isIllustrationRare,
    isUltraRare: pokemon.isUltraRare,
    isSpecialIllustrationRare: pokemon.isSpecialIllustrationRare,
    isHyperRare: pokemon.isHyperRare,
  });

  const onStatusChange = async (id: StatusKeys, value: boolean) => {
    try {
      const newStatus = { ...status, [id]: value };
      await savePokemonStatus({
        pokemonId: pokemon.id,
        ...newStatus,
      });
      setStatus(newStatus);
      console.log(newStatus);
    } catch (error) {
      console.error("Failed to save pokemon status:", error);
      // Optionally revert the checkbox if save fails
      // setStatus(status);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-xl p-6 border border-gray-200">
        <div className="bg-white rounded-lg p-4 shadow-inner mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {pokemon.name}
            </h3>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
              #{pokemon.number}
            </span>
          </div>

          <div className="relative aspect-square mb-4 bg-gray-50 rounded-lg p-2">
            <img
              src={pokemon.imageUrl}
              alt={pokemon.name}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <div className="space-y-3">
          {(
            [
              {
                id: "isCollected" as const,
                label: "Collected",
                color: "blue",
                value: pokemon.isCollected,
              },
              {
                id: "isDoubleRare" as const,
                label: "Double Rare (Two Black Stars)",
                color: "purple",
                value: pokemon.isDoubleRare,
              },
              {
                id: "isIllustrationRare" as const,
                label: "Illustration Rare (One Gold Star)",
                color: "green",
                value: pokemon.isIllustrationRare,
              },
              {
                id: "isUltraRare" as const,
                label: "Ultra Rare (Two Silver Stars)",
                color: "orange",
                value: pokemon.isUltraRare,
              },
              {
                id: "isSpecialIllustrationRare" as const,
                label: "Special Illustration Rare (Two Gold Stars)",
                color: "yellow",
                value: pokemon.isSpecialIllustrationRare,
              },
              {
                id: "isHyperRare" as const,
                label: "Hyper Rare (Three Gold Stars)",
                color: "red",
                value: pokemon.isHyperRare,
              },
            ] satisfies {
              id: StatusKeys;
              label: string;
              color: string;
              value: boolean;
            }[]
          ).map(({ id, label, color, value }) => (
            <div
              key={id}
              className={`p-2 rounded-lg transition-colors ${
                status[id]
                  ? `bg-${color}-100 border border-${color}-200`
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <label className="flex items-center justify-between cursor-pointer">
                <span
                  className={`text-sm font-medium ${
                    status[id] ? `text-${color}-700` : "text-gray-600"
                  }`}
                >
                  {label}
                </span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => onStatusChange(id, e.target.checked)}
                  className={`rounded border-gray-300 text-${color}-600 focus:ring-${color}-500`}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
