"use client";
import CustomMenu from "@/components/CustomMenu";
import LastTransactionsList from "@/components/LastTransactionsList";
import { Col, Row, Spin } from "antd";
import Link from "next/link";
import Image from "next/image";
import styles from "./analysis.module.scss";
import ExpensesByCategoryChartContainer from "@/components/ExpensesByCategoryChartContainer";
import PlannedSpendingByRealSpendingChartContainer from "@/components/PlannedSpendingByRealSppendingChartContainer";
import AnalysesByMonthChartContainer from "@/components/AnalysesByMonthChartContainer";
import { useEffect, useState } from "react";
import { request } from "@/service/api";

type TotalTransactions = {
  total: number;
  mostExpensive: number;
};

const Analysis = () => {
  const [transactions, setTransactions] = useState<TotalTransactions>({} as TotalTransactions);
  const [totalOutTransactions, setTotalOutTransactions] = useState<number>(0);
  const [totalEnterTransactions, setTotalEnterTransactions] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getOutTransactions = async () => {
    try {
      const response = await request({
        method: "GET",
        endpoint: "transaction/type/2",
      });
      setTotalOutTransactions(response.data.data.transactions.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getEnterTransactions = async () => {
    try {
      const response = await request({
        method: "GET",
        endpoint: "transaction/type/1",
      });
      setTotalEnterTransactions(response.data.data.transactions.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactions = async () => {
    try {
      const { data } = await request({
        method: "GET",
        endpoint: "transaction/all",
        loaderStateSetter: setLoading,
      });
      setTransactions({ total: data.total, mostExpensive: data.most_expensive });
    } catch (error) {
      console.log(error);
    }
  };

  const formatCurrency = (value: any) => {
    if (!value) {
      return null;
    }
    const formattedValue = parseFloat(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formattedValue;
  };

  useEffect(() => {
    getTransactions();
    getOutTransactions();
    getEnterTransactions();
  }, []);

  const Loading = () => {
    return (
      <Row justify={"center"}>
        <Spin />
      </Row>
    );
  };
  return (
    <div>
      <div style={{ background: "#fff", padding: 10, alignItems: "center" }}>
        <Link href={"/"} style={{ background: "#fff", padding: 10, alignItems: "center" }}>
          <Image src="/logo.png" alt="Logo" width={130} height={27} />
        </Link>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CustomMenu />
        <Col style={{ padding: "10px 30px" }} xl={20} lg={24} md={22} xs={24}>
          <Row align={"middle"} justify={"space-between"}>
            <div>
              <div>
                <h3>Análises</h3>
              </div>
            </div>
          </Row>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Row>
                <Col
                  className={styles.balance}
                  style={{ marginRight: 20, marginBottom: 10 }}
                  xl={5}
                  lg={5}
                  md={6}
                  xs={24}
                >
                  <Col style={{ marginRight: 10 }}>
                    <p className={styles.balance_description}>Transação Mais Cara</p>
                    <p className={styles.balance_title}>{formatCurrency(transactions?.mostExpensive)}</p>
                  </Col>
                </Col>
                <Col
                  className={styles.balance}
                  style={{ marginRight: 20, marginBottom: 10 }}
                  xl={5}
                  lg={5}
                  md={6}
                  xs={24}
                >
                  <Col style={{ marginRight: 10 }}>
                    <p className={styles.balance_description}>Transações de Entrada</p>
                    <p className={styles.balance_title}>{totalEnterTransactions}</p>
                  </Col>
                </Col>
                <Col
                  className={styles.balance}
                  style={{ marginRight: 20, marginBottom: 10 }}
                  xl={5}
                  lg={5}
                  md={6}
                  xs={24}
                >
                  <Col style={{ marginRight: 10 }}>
                    <p className={styles.balance_description}>Transações de Saída</p>
                    <p className={styles.balance_title}>{totalOutTransactions}</p>
                  </Col>
                </Col>
                <Col
                  className={styles.balance}
                  style={{ marginRight: 20, marginBottom: 10 }}
                  xl={5}
                  lg={5}
                  md={6}
                  xs={24}
                >
                  <Col style={{ marginRight: 10 }}>
                    <p className={styles.balance_description}>Transações Totais</p>
                    <p className={styles.balance_title}>{transactions.total}</p>
                  </Col>
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }} gutter={12}>
                <Col xl={10} lg={10} md={24} xs={24} style={{ marginBottom: 20 }}>
                  <PlannedSpendingByRealSpendingChartContainer />
                </Col>
                <Col xl={10} lg={12} md={24} xs={24}>
                  <AnalysesByMonthChartContainer />
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }} gutter={10}>
                <Col xl={8} lg={11} md={24} xs={24} style={{ marginBottom: 20 }}>
                  <ExpensesByCategoryChartContainer />
                </Col>
                <Col xl={12} lg={12} md={24} xs={24}>
                  <LastTransactionsList />
                </Col>
              </Row>
            </>
          )}
        </Col>
      </div>
    </div>
  );
};

export default Analysis;
