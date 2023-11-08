import { request } from "@/service/api";
import { useEffect, useState } from "react";
import AnalysesByMonthChart from "../AnalysesByMonthChart";
import "./styles.scss";
import dayjs from "dayjs";

export interface IAnalysesByMonthChartContainer {
  mes: string;
  entrada: number;
  saida: number;
}

const AnalysesByMonthChartContainer = () => {
  const [chartData, setChartData] = useState<IAnalysesByMonthChartContainer[]>([]);

  const getMonthName = (monthNumber: number) => {
    const monthName = dayjs().month(monthNumber).format("MMM");
    console.log(monthName);
    return monthName;
  };

  const getData = async () => {
    try {
      const { data } = await request({
        endpoint: "spendings?sort=month", // TO DO ENDPOINT
      });
      console.log(data.data);
      const transformedData = data.data[0].map((item: any) => ({
        mes: getMonthName(item.month),
        entrada: item.incomes,
        saida: item.real_spending,
      }));
      setChartData(transformedData);
    } catch (error) {
      console.error("Erro ao obter os dados da API", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="card">
      <h4>Visão Geral</h4>
      <AnalysesByMonthChart data={chartData} />
    </div>
  );
};

export default AnalysesByMonthChartContainer;
