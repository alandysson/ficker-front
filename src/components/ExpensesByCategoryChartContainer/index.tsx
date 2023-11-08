import { useEffect, useState } from "react";
import ExpensesByCategoryChart from "../ExpensesByCategoryChart";
import { request } from "@/service/api";

interface AmountByCategory {
  category_description: string;
  amount: number;
}

const ExpensesByCategoryChartContainer = () => {
  return (
    <div className="card">
      <h4>Gastos por Categoria</h4>
      <ExpensesByCategoryChart />
    </div>
  );
};

export default ExpensesByCategoryChartContainer;
