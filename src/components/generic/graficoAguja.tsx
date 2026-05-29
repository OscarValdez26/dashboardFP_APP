import { PieChart, Pie } from "recharts";

function Needle({
  cx,
  cy,
  value,
  length,
}: {
  cx: number;
  cy: number;
  value: number;
  length: number;
}) {
  const angle = 180 - value * 1.8;
  const radians = (Math.PI * angle) / 180;

  const x = cx + length * Math.cos(radians);
  const y = cy - length * Math.sin(radians);

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="#111" />

      <line
        x1={cx}
        y1={cy}
        x2={x}
        y2={y}
        stroke="#111"
        strokeWidth={4}
        strokeLinecap="round"
      />
    </g>
  );
}

export default function GraficoAguja({ porcentaje }: { porcentaje: number }) {
  const value = porcentaje <= 100 ? porcentaje : 100;
  const getColor = (value: number) => {
    if (value < 30) return "#22c55e";
    if (value < 70) return "#facc15";

    return "#ef4444";
  };
  const data = [
    {
      value,
      fill: getColor(value),
    },
    {
      value: 100 - value,
      fill: "#e5e7eb",
    },
  ];

  // const angle = 180 - (value / 100) * 180;

  return (
    <div className="flex flex-col items-center">
      <PieChart width={250} height={140}>
        <Pie
          data={data}
          dataKey="value"
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={90}
          stroke="none"
          cx={125}
          cy={120}
        />

        <Needle cx={125} cy={120} value={value} length={50} />
      </PieChart>
      <span className="font-medium text-sm">{porcentaje}%</span>
    </div>
  );
}
