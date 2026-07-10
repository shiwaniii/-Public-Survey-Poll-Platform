// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const COLORS = [
//   "#2563eb",
//   "#22c55e",
//   "#f59e0b",
//   "#ef4444",
//   "#8b5cf6",
// ];

// type ChartData = {
//   name: string;
//   value: number;
// };

// interface ChartProps {
//   data: ChartData[];
// }

// export default function Chart({ data }: ChartProps) {
//   return (

//       <PieChart width={450} height={300}>
//         <Pie
//           data={data}
//           dataKey="value"
//           nameKey="name"
//         outerRadius={100}
//         label
//       >
//         {data.map((_, index) => (
//           <Cell
//             key={index}
//             fill={COLORS[index % COLORS.length]}
//           />
//         ))}
//       </Pie>

//       <Tooltip />
//       <Legend />
//     </PieChart>

//   );
// }

import React from "react";

export type ChartSlice = {
  label: string;
  value: number;
  percent: number;
  color: string;
};

type DonutChartProps = {
  data: ChartSlice[];
  size?: number;
  strokeWidth?: number;
};

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 150,
  strokeWidth = 22,
}) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${center} ${center})`}>
        {data.map((slice) => {
          const dash = (slice.percent / 100) * circumference;
          const offset = (cumulative / 100) * circumference;
          cumulative += slice.percent;
          return (
            <circle
              key={slice.label}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
            />
          );
        })}
      </g>
      <circle cx={center} cy={center} r={radius - strokeWidth / 2 - 4} fill="#ffffff" />
    </svg>
  );
};

export default DonutChart;
