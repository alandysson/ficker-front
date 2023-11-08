import { Col } from "antd";
import styles from "./transactiontab.module.scss";
import dayjs from "dayjs";
import Image from "next/image";
import { EditTransactionModal } from "@/components/ModalEditTransaction";
import { useState } from "react";
import { ITransaction } from "@/interfaces";

interface TransactionTabProps {
  data: ITransaction[];
  typeId: number;
  editModal: boolean;
  setEditModal: (value: boolean) => void;
}
export const TransactionTab = ({ data, typeId, editModal, setEditModal }: TransactionTabProps) => {
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction>({} as ITransaction);
  const [loading, setLoading] = useState<boolean>(false);

  const openEditModal = (transcation: ITransaction) => {
    setEditModal(true);
    setSelectedTransaction(transcation);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1);
  };

  const formatCurrency = (value: any) => {
    const formattedValue = parseFloat(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formattedValue;
  };

  const getPaymentMethodName = (id: number) => {
    switch (id) {
      case 1:
        return "Dinheiro";
      case 2:
        return "Pix";
      case 3:
        return "Cartão de Débito";
      default:
        return "Cartão de Crédito";
    }
  };

  if (loading) return <div>Carregando...</div>;

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
            {typeId === 2 && <th>Pagamento</th>}
          </tr>
        </thead>
        <tbody>
          <>
            <EditTransactionModal
              isModalOpen={editModal}
              setIsModalOpen={setEditModal}
              transaction={{ ...selectedTransaction, type_id: typeId }}
            />
            {data?.map((transaction) => (
              <tr key={transaction.id}>
                <td className={styles.tdEdit}>
                  <button
                    style={{ background: "none", border: "none" }}
                    onClick={() => openEditModal(transaction)}
                  >
                    <Image src="/edit.png" alt="Editar" width={20} height={20} />
                  </button>
                </td>
                <td className={styles.tdDescription}>{transaction.transaction_description}</td>
                <td className={styles.tdDate}>{dayjs(transaction.date).format("DD/MM/YYYY")}</td>
                <td className={styles.tdCategory}>{transaction.category_description}</td>
                <td className={styles.tdValue} style={{ color: transaction.type_id === 1 ? "green" : "red" }}>
                  {transaction.type_id === 1 ? " " : "-"}
                  {formatCurrency(transaction.transaction_value)}
                </td>
                {typeId === 2 && (
                  <td>
                    <div
                      style={{
                        backgroundColor: "#DBDEFF",
                        color: "#6C5DD3",
                        paddingInline: "20px",
                        borderRadius: "95px",
                        textAlign: "center",
                        fontSize: "small",
                      }}
                    >
                      {getPaymentMethodName(transaction.payment_method_id)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </Col>
  );
};
