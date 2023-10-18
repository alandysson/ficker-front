import { request } from "@/service/api";
import { useEffect, useState } from "react";
import AnalysesByMonthChart from "../AnalysesByMonthChart";
import AnalysesByMonthChartInterface from "../AnalysesByMonthChart";
import "./styles.scss";

const AnalysesByMonthChartContainer = () => {
  const [chartData, setChartData] = useState<AnalysesByMonthChartInterface[]>(
    []
  );

  const getData = async () => {
    try {
      const { data } = await request({
        endpoint: "", // TO DO ENDPOINT
      });
      setChartData(data);
      console.log(data);
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
      <AnalysesByMonthChart
        data={[
          {
            mes: "jan",
            entrada: 1394,
            saida: 789,
          },
          {
            mes: "fev",
            entrada: 1394,
            saida: 932,
          },
          {
            mes: "mar",
            entrada: 1394,
            saida: 1278,
          },
        ]}
      />
    </div>
  );
};

export default AnalysesByMonthChartContainer;
