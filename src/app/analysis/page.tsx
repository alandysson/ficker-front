"use client";
import CustomMenu from "@/components/CustomMenu";
import LastTransactionsList from "@/components/LastTransactionsList";
import MyCategoriesList from "@/components/MyCategoriesList";
import { Col, Row, Button, Progress } from "antd";
import Link from "next/link";
import Image from "next/image";
import styles from "../resume/resume.module.scss";
import { formatCurrency } from "../resume/page";
import ExpensesByCategoryChartContainer from "@/components/ExpensesByCategoryChartContainer";
import PlannedSpendingByRealSpendingChartContainer from "@/components/PlannedSpendingByRealSppendingChartContainer";

const Analysis = () => {
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
          <Row>
            <Col
              className={styles.balance}
              style={{ marginRight: 20, marginBottom: 10 }}
              xl={5}
              lg={6}
              md={12}
              xs={15}
            >
              <Col style={{ marginRight: 10 }}>
                <p className={styles.balance_description}>Transação Mais Cara</p>
                <p className={styles.balance_title}>{formatCurrency(132)}</p>
              </Col>
            </Col>
            <Col
              className={styles.balance}
              style={{ marginRight: 20, marginBottom: 10 }}
              xl={5}
              lg={6}
              md={12}
              xs={15}
            >
              <Col style={{ marginRight: 10 }}>
                <p className={styles.balance_description}>Transações de Entrada</p>
                <p className={styles.balance_title}>3</p>
              </Col>
            </Col>
            <Col
              className={styles.balance}
              style={{ marginRight: 20, marginBottom: 10 }}
              xl={5}
              lg={6}
              md={12}
              xs={15}
            >
              <Col style={{ marginRight: 10 }}>
                <p className={styles.balance_description}>Transações de Saída</p>
                <p className={styles.balance_title}>3</p>
              </Col>
            </Col>
            <Col
              className={styles.balance}
              style={{ marginRight: 20, marginBottom: 10 }}
              xl={5}
              lg={6}
              md={12}
              xs={15}
            >
              <Col style={{ marginRight: 10 }}>
                <p className={styles.balance_description}>Transações Totais</p>
                <p className={styles.balance_title}>2</p>
              </Col>
            </Col>
          </Row>
          <Row justify={"space-between"} style={{ marginTop: 10 }}>
            <Col xl={13} lg={10} md={10} xs={22} style={{ marginBottom: 20 }}>
              <ExpensesByCategoryChartContainer/>
            </Col>
            <Col xl={9} lg={10} md={13} xs={22}>
              <LastTransactionsList />
            </Col>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default Analysis;
