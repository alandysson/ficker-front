import { Image } from "antd";
import "./styles.scss";
import { useEffect, useState } from "react";
import { ITransaction } from "@/interfaces";
import { request } from "@/service/api";

const LastTransactionsList = () => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
  
    const getTransactions = async () => {
      try {
        const response = await request({
          method: "GET",
          endpoint: "transactions/type/1"
        });
        setTransactions(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
        getTransactions();
    })

    return (
        <div className="card">
            <h4>Últimas Transações</h4>
            <div className="transactions-area">
                {transactions?.map((transaction) => (
                    <div className="transaction-area">
                        <div className="transaction-area__infos">
                            <Image src={transaction.type_id == 1 ? '/icons/icon-income.svg' : '/icons/icon-expense.svg'} alt="icon-search" width={25} height={25}></Image>
                            <div className="transaction-area__description">
                                <p>{transaction.description}</p>
                                <span>{transaction.type_id == 1 ? 'Entrada' : 'Saída'}</span>
                            </div>
                        </div>
                        <div className="transaction-area__value" style={{ color: transaction.type_id === 1 ? "green" : "red" }}>
                            {transaction.type_id === 1 ? " " : "-"}R${transaction.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LastTransactionsList;