"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "../EnterTransaction/entertransaction.module.scss";
import { Col, Row, Spin } from "antd";
import CustomMenu from "@/components/CustomMenu";
import { useEffect, useState } from "react";
import { OutputModal } from "./modal";
import { request } from "@/service/api";
import dayjs from "dayjs";
import { TransactionTab } from "@/components/TransactionTab";
import SearchField from "@/components/SearchField";

interface Transaction {
  id: number;
  user_id: number;
  category_id: number;
  card_id: number;
  description: string;
  date: Date;
  type: string;
  value: number;
  installments: number;
  created_at: Date;
  updated_at: Date;
}

const Outputs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const getTransactions = async () => {
    try {
      const response = await request({
        method: "GET",
        endpoint: "transactions/type/2",
        loaderStateSetter: setLoading,
      });
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [isModalOpen]);

  return (
    <div>
      <div style={{ background: "#fff", padding: 10, alignItems: "center" }}>
        <Link href={"/"} style={{ background: "#fff", padding: 10, alignItems: "center" }}>
          <Image src="/logo.png" alt="Logo" width={130} height={27} />
        </Link>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CustomMenu />
        <OutputModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <div style={{ width: "90vw"}} >
          <div className={styles.titleArea}>
            <div>
              <h3>Saídas</h3>
            </div>
            <div className={styles.buttonsArea}>
              <SearchField/>
              <button className={styles.button} onClick={showModal} >
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

export default Outputs;
