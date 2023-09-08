import { Col } from "antd";
import styles from "./transactiontab.module.scss";
import dayjs from "dayjs";
import Image from "next/image";
import { EditTransactionModal } from "@/components/ModalEditTransaction";
import { useEffect, useState } from "react";

export interface Transaction {
  id: number;
  user_id: number;
  category_id: number;
  card_id: number;
  description: string;
  date: Date;
  type_id: number;
  value: number;
  installments: number;
  created_at: Date;
  updated_at: Date;
}

interface TransactionTabProps {
  data: Transaction[];
}
export const TransactionTab = ({ data }: TransactionTabProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  useEffect(() => {
  }, [isEditModalOpen]);
  
  return (
    <Col xs={20} lg={22}>
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
                <EditTransactionModal isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} transactionId={transaction.id} />
                <td className={styles.tdEdit}>
                  <button style={{ background: "none", border: "none" }} onClick={openEditModal}>
                    <Image src="/edit.png" alt="Editar" width={20} height={20} />
                  </button>
                </td>
                <td className={styles.tdDescription}>{transaction.description}</td>
                <td className={styles.tdDate}>{dayjs(transaction.date).format("DD/MM/YYYY")}</td>
                <td className={styles.tdCategory}>Outros</td>
                <td className={styles.tdValue} style={{ color: transaction.type_id === 1 ? 'green' : 'red' }}>
                  -R${transaction.value}
                </td>
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </Col>
  );
};
