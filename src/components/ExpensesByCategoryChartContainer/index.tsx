import {useEffect, useState} from "react";
import ExpensesByCategoryChart from "../ExpensesByCategoryChart";
import {request} from "@/service/api";

interface AmountByCategory {
    category_description: string;
    amount: number;
}

const ExpensesByCategoryChartContainer = () => {

    const [data, setData] = useState<AmountByCategory[]>([]);

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
        <div className="card">
            <h4>Gastos por Categoria</h4>
            <ExpensesByCategoryChart/>
        </div>
    );
};

export default ExpensesByCategoryChartContainer;
