import { useEffect, useState } from "react";
import { request } from "@/service/api";
import "./styles.scss";
import PlannedSpendingByRealSpendingChart from "../PlannedSpendingByRealSpendingChart";
import dayjs from "dayjs";

export interface PlannedByMonth {
  name: string;
  planejado: number;
  real: number;
}

const PlannedSpendingByRealSpendingChartContainer = () => {
  const [data, setData] = useState<PlannedByMonth[]>([]);

  const getMonthName = (monthNumber: number) => {
    const monthName = dayjs().month(monthNumber).format("MMM");
    return monthName;
  };

  const getData = async () => {
    try {
      const { data } = await request({ method: "GET", endpoint: "spendings?sort=month" });
      const transformedData = data.data[0].map((item: any) => {
        return {
          name: getMonthName(item.month),
          planejado: item.planned_spending,
          real: item.real_spending,
        };
      });
      setData(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="card-chart" style={{ width: "100%" }}>
      <h4>Gastos Planejados por Mês</h4>
      <PlannedSpendingByRealSpendingChart data={data} />
    </div>
  );
};

export default PlannedSpendingByRealSpendingChartContainer;
