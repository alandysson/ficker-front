import { useEffect, useState } from "react";
import { request } from "@/service/api";
import "./styles.scss";
import PlannedSpendingByRealSpendingChart from "../PlannedSpendingByRealSpendingChart";

interface PlannedByMonth {
    mes: string;
    planejado: number;
    real: number;
}

const PlannedSpendingByRealSpendingChartContainer = () => {

    const [data, setData] = useState<PlannedByMonth[]>([]);

    const getData = async () => {
        try {
            const {data} = await request({method: "GET", endpoint: ""}); // TO DO ENDPOINT
            setData(data);
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();

      }, []);

    return (
        <div className="card-chart" style={{width: "100%"}}>
            <h4>Gastos Planejados por Mês</h4>
            <PlannedSpendingByRealSpendingChart/>
        </div>
    );
};

export default PlannedSpendingByRealSpendingChartContainer;
