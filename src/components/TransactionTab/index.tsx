import { Col } from "antd";
import styles from "./transactiontab.module.scss";
import dayjs from "dayjs";
import Image from "next/image";
import { EditTransactionModal } from "@/components/ModalEditTransaction";
import { useEffect, useState } from "react";
import { ITransaction } from "@/interfaces";

interface TransactionTabProps {
  data: ITransaction[];
  }
export const TransactionTab = ({ data }: TransactionTabProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const formatCurrency = (value: any) => {
    const formattedValue = parseFloat(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formattedValue;
  };

  useEffect(() => {}, [isEditModalOpen]);

  return (
    <Col xs={20} lg={24}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Editar</th>
            <th>Descrição</th>
            <th>Data</th>
            <th>Categoria</th>
            <th>Valor</th>
                      </tr>
        </thead>
        <tbody>
          <>
            {data?.map((transaction) => (
              <tr key={transaction.id}>
                <EditTransactionModal
                  isModalOpen={isEditModalOpen}
                  setIsModalOpen={setIsEditModalOpen}
                  transaction={transaction}
                />
                <td className={styles.tdEdit}>
                  <button style={{ background: "none", border: "none" }} onClick={openEditModal}>
                    <Image src="/edit.png" alt="Editar" width={20} height={20} />
                  </button>
                </td>
                <td className={styles.tdDescription}>{transaction.description}</td>
                <td className={styles.tdDate}>{dayjs(transaction.date).format("DD/MM/YYYY")}</td>
                <td className={styles.tdCategory}>{transaction.category_description}</td>
                <td className={styles.tdValue} style={{ color: transaction.type_id === 1 ? "green" : "red" }}>
                  {transaction.type_id === 1 ? " " : "-"}{formatCurrency(transaction.value)}
                </td>
                              </tr>
            ))}
          </>
        </tbody>
      </table>
    </Col>
  );
};
