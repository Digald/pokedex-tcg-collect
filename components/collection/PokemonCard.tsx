import { useState } from "react";

export function PokemonCard({ pokemon }: { pokemon: any }) {
  const [status, setStatus] = useState({
    isCollected: false,
    isDoubleRare: false,
    isIllustrationRare: false,
    isUltraRare: false,
    isSpecialIllustrationRare: false,
    isHyperRare: false,
  });

  const onStatusChange = (field: string, value: boolean) => {
    setStatus((prev) => ({ ...prev, [field]: value }));
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
          {[
            { id: "isCollected", label: "Collected", color: "blue" },
            {
              id: "isDoubleRare",
              label: "Double Rare (Two Black Stars)",
              color: "purple",
            },
            {
              id: "isIllustrationRare",
              label: "Illustration Rare (One Gold Star)",
              color: "green",
            },
            {
              id: "isUltraRare",
              label: "Ultra Rare (Two Silver Stars)",
              color: "orange",
            },
            {
              id: "isSpecialIllustrationRare",
              label: "Special Illustration Rare (Two Gold Stars)",
              color: "yellow",
            },
            {
              id: "isHyperRare",
              label: "Hyper Rare (Three Gold Stars)",
              color: "red",
            },
          ].map(({ id, label, color }) => (
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
                  checked={status[id]}
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
