import { Image } from "antd";
import "./styles.scss";
import { useEffect, useState } from "react";
import { ITransaction } from "@/interfaces";
import { request } from "@/service/api";

const LastTransactionsList = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const getTransactions = async () => {
    try {
      const { data } = await request({
        method: "GET",
        endpoint: "transaction/all",
      });
      setTransactions(data.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const formatCurrency = (value: any) => {
    const formattedValue = parseFloat(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formattedValue;
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="card">
      <h4>Últimas Transações</h4>
      <div className="transactions-area">
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div className="transaction-area" key={transaction.id}>
              <div className="transaction-area__infos">
                <Image
                  src={transaction.type_id === 1 ? "/icons/icon-income.svg" : "/icons/icon-expense.svg"}
                  alt="icon-search"
                  width={25}
                  height={25}
                />
                <div className="transaction-area__description">
                  <p>{transaction.transaction_description}</p>
                  <span>{transaction.type_id === 1 ? "Entrada" : "Saída"}</span>
                </div>
              </div>
              <div
                className="transaction-area__value"
                style={{ color: transaction.type_id === 1 ? "green" : "red" }}
              >
                {transaction.type_id === 1 ? " " : "-"}
                {formatCurrency(transaction.transaction_value)}
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "#80818191", fontSize: "small", textAlign: "center" }}>
            Nenhuma transação encontrada.
          </p>
        )}
      </div>
    </div>
  );
};

export default LastTransactionsList;
