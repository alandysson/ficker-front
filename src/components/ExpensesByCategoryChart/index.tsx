import { request } from "@/service/api";
import React, { PureComponent, useEffect } from "react";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from "recharts";

interface AmountByCategory {
  category_description: string;
  category_spending: number;
}

const colors = ["#6C5DD3", "#87E344", "#D822E3", "#17E3B9", "#F4A74B", "#F45252"];

const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

const ExpensesByCategoryChart = () => {
  // static demoUrl = "https://codesandbox.io/s/simple-radial-bar-chart-qf8fz";
  const [data, setData] = React.useState([]);

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
            amount: category.category_spending,
            fill: colors[index % colors.length],
          };
        }
      );
      setData(transformInGraphInformations.filter((item: any) => item !== undefined));
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ResponsiveContainer width={"100%"} height={200}>
      <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
        <RadialBar background dataKey="amount" />
        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default ExpensesByCategoryChart;
