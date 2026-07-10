import  {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

type ChartData = {
  name: string;
  value: number;
};

interface ChartProps {
  data: ChartData[];
}

const data: ChartData[] = []

export default function Chart() {
  return (

      <PieChart width={450} height={300}>
        <Pie
          data= {data}
          dataKey="value"
          nameKey="name"
        outerRadius={100}
        label
      >
        {data.map((_, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>

  );
}

