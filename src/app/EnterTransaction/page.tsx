"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./entertransaction.module.scss";
import { Col, Row } from "antd";
import CustomMenu from "@/components/CustomMenu";
import { useEffect, useState } from "react";
import { EnterTransactionModal } from "./modal";
import { request } from "@/service/api";
import { TransactionTab } from "@/components/TransactionTab";
import SearchField from "@/components/SearchField";
import { ITransaction } from "@/interfaces";

const EnterTransaction = () => {
  3;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);

  const getTransactions = async () => {
    try {
      const response = await request({
        method: "GET",
        endpoint: "transaction/type/1",
        loaderStateSetter: setLoading,
      });
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <div>
      <div style={{ background: "#fff", padding: 10, alignItems: "center" }}>
        <Link href={"/"} style={{ background: "#fff", padding: 10, alignItems: "center" }}>
          <Image src="/logo.png" alt="Logo" width={130} height={27} />
        </Link>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CustomMenu />
        <EnterTransactionModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <div style={{ width: "90vw" }}>
          <div className={styles.titleArea}>
            <div>
              <h3>Entradas</h3>
            </div>
            <div className={styles.buttonsArea}>
              <SearchField />
              <button className={styles.button} onClick={showModal}>
                Nova Transação
              </button>
            </div>
          </div>
          <TransactionTab data={transactions} />
        </div>
      </div>
    </div>
  );
};

export default EnterTransaction;
