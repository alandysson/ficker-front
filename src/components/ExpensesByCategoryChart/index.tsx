import { request } from "@/service/api";
import React, { useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface AmountByCategory {
  category_description: string;
  category_spending: number;
}

type DataType = {
  name: string;
  value: number;
  fill: string;
};

type CustomizedLabel = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
};
const colors = ["#6C5DD3", "#87E344", "#D822E3", "#17E3B9", "#F4A74B", "#F45252"];

const ExpensesByCategoryChart = () => {
  const [data, setData] = React.useState<DataType[]>([]);

  const getData = async () => {
    try {
      const { data } = await request({
        endpoint: "categories",
      });
      const transformInGraphInformations = data.data.categories.map(
        (category: AmountByCategory, index: number) => {
          if (category.category_spending === 0) return;
          return {
            name: category.category_description,
            value: category.category_spending,
            fill: colors[index % colors.length],
          };
        }
      );
      setData(transformInGraphInformations.filter((item: any) => item !== undefined));
    } catch (error) {}
  };
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: CustomizedLabel) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <ResponsiveContainer width={"100%"} height={200}>
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="40%"
            cy="40%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{ width: 10, height: 10, backgroundColor: item.fill, marginRight: 10, borderRadius: 30 }}
            />
            <p style={{ fontSize: 12 }}>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesByCategoryChart;
