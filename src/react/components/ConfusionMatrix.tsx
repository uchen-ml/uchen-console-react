import { useMemo } from "react";

const colors = [
  ["bg-green-800", "text-gray-200"],
  ["bg-green-700", "text-gray-200"],
  ["bg-green-600", "text-gray-200"],
  ["bg-green-500", "text-gray-200"],
  ["bg-green-400", "text-gray-800"],
  ["bg-green-300", "text-gray-800"],
  ["bg-green-200", "text-gray-800"],
  ["bg-green-100", "text-gray-800"],
  ["bg-green-50", "text-gray-800"],
  ["bg-yellow-50", "text-gray-800"],
  ["bg-yellow-100", "text-gray-800"],
  ["bg-yellow-200", "text-gray-800"],
  ["bg-yellow-300", "text-gray-800"],
  ["bg-yellow-400", "text-gray-800"],
  ["bg-yellow-500", "text-gray-800"],
  ["bg-yellow-600", "text-gray-800"],
  ["bg-yellow-700", "text-gray-200"],
  ["bg-yellow-800", "text-gray-200"],
  ["bg-red-800", "text-gray-200"],
] as [string, string][];

function ValueCell({
  value,
  onHover,
}: {
  value: number;
  onHover: (on: boolean) => void;
}) {
  const color = useMemo(() => {
    const index = Math.floor((100 - value) / 5);
    return colors[index];
  }, [value]);
  return (
    <td>
      <div
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        className={[
          "w-22 px-4 py-2 mt-1 ml-1 border rounded border-purple-700  hover:border-purple-400 hover:bg-purple-900 hover:text-gray-200",
          ...(color ?? []),
        ].join(" ")}
      >
        {value.toFixed(1)}%
      </div>
    </td>
  );
}

export function ConfusionMatrix() {
  const categories = ["C++", "JS", "TS", "Python", "Java"];
  const values = useMemo(() => {
    const result = [] as number[][];
    for (let i = 0; i < categories.length; i++) {
      result.push([]);
      for (let j = 0; j < categories.length; j++) {
        result[i]!.push(Math.random() * 100);
      }
    }
    return result;
  }, [categories.length]);
  return (
    <table className="text-center">
      <thead>
        <tr>
          <td colSpan={2}></td>
          <td colSpan={categories.length}>Actual values</td>
        </tr>
        <tr>
          <td colSpan={2}></td>
          {categories.map((category) => (
            <td key={category}>{category}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {categories.map((category, i) => (
          <tr key={category} className="group">
            {i == 0 && (
              <td rowSpan={categories.length} className="-rotate-90">
                Expected
              </td>
            )}
            <td className="text  group-hover:bg-purple-950">{category}</td>
            {categories.map((predictedCategory, j) => (
              <ValueCell
                key={`${category}-${predictedCategory}`}
                value={values![i]![j]!}
              ></ValueCell>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
