import { useMemo, useState } from "react";

function Spline(
  datapoints: number[],
  box: { x: number; y: number; height: number; width: number }
) {
  if (datapoints.length < 2) {
    return "";
  }
  const d = box.width / (datapoints.length - 1 || 1);
  const points = datapoints.map((dataPoint) => {
    return Math.round(box.y + box.height * dataPoint);
  });
  const slopes = [];
  for (let i = 1; i < points.length - 1; i++) {
    slopes.push((points[i + 1]! - points[i - 1]!) / 16);
  }
  slopes.push((points[points.length - 1]! - points[points.length - 2]!) / 8);
  console.log(datapoints, points, slopes);
  const dy = points[0]! - points[1]!;
  const commands = [
    `M${box.x} ${box.y - box.height * (1 - datapoints[0]!)}`,
    `c${d / 8} ${(points[0]! - points[1]!) / 8}, ${(d * 7) / 8} ${dy + slopes[1]!}, ${d} ${dy}`,
  ];
  for (let i = 1; i < points.length - 1; i++) {
    const end = points[i]! - points[i + 1]!;
    commands.push(`s${d - d / 8} ${end + slopes[i]!} ${d} ${end}`);
  }
  return commands.join(" ");
}

function Line({
  className = "stroke-2 stroke-black",
  box,
  dataPoints,
  onHover,
}: {
  className?: string;
  box: { x: number; y: number; height: number; width: number };
  dataPoints: number[];
  onHover: (hovering: boolean) => void;
}) {
  const path = useMemo(() => Spline(dataPoints, box), [box, dataPoints]);
  return (
    <path
      d={path}
      fill="none"
      className={className}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    />
  );
}

export function LossChart() {
  const height = 400;
  const width = 600;
  const datapoints = [1, 0.5, 1, 0.75, 0.15, 0.3, 0.1, 0.3];
  const box = useMemo(
    () => ({ x: 60, y: 60, height: height - 120, width: width - 120 }),
    [height, width]
  );
  const path = useMemo(() => Spline(datapoints, box), [box, datapoints]);
  const [hovering, setHovering] = useState(false);
  return (
    <div className="p-8">
      <div className="text-sm border mb-4 py-2 px-4 bg-slate-800">
        <code>
          W: {width} H: {height}
        </code>
      </div>

      <div className="text-sm border mb-4 py-2 px-4 bg-slate-800">
        <code>{path}</code>
      </div>
      <svg {...{ height, width }} className="bg-slate-600">
        {/* X-axis */}
        <line
          x1={50}
          y1={350}
          x2={width - 50}
          y2={350}
          className="stroke-pink-400 stroke-1"
        />
        {/* Arrow */}
        <path
          d={`M${width - 50} 350 l-10 -5 l0 10 Z`}
          fill="black"
          stroke="black"
          strokeWidth={1}
        />
        {/* Y-axis */}
        <line x1={50} y1={50} x2={50} y2={350} stroke="black" strokeWidth={2} />
        <Line
          box={box}
          dataPoints={datapoints}
          className={[
            "stroke-green-600 stroke-2",
            hovering ? "stroke-[3]" : "stroke-2",
          ].join(" ")}
          onHover={setHovering}
        />
      </svg>
    </div>
  );
}
