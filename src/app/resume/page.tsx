"use client";
import Link from "next/link";
import Image from "next/image";
import CustomMenu from "@/components/CustomMenu";
import { Button, Col, Row, Typography } from "antd";
import styles from "./resume.module.scss";
import MyCategoriesList from "@/components/MyCategoriesList";
import LastTransactionsList from "@/components/LastTransactionsList";

const Resume = () => {
  return (
    <div>
      <div style={{ background: "#fff", padding: 10, alignItems: "center" }}>
        <Link href={"/"} style={{ background: "#fff", padding: 10, alignItems: "center" }}>
          <Image src="/logo.png" alt="Logo" width={130} height={27} />
        </Link>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CustomMenu />
        <Col style={{ padding: "10px 30px" }} xl={20} lg={19} md={22} xs={24}>
          <div>
            <div>
              <h3>Olá</h3>
            </div>
          </div>
          <Row justify={"space-between"}>
            <Col className={styles.balance} xl={8} lg={9} md={9} xs={20} style={{ marginBottom: 10 }}>
              <p className={styles.balance_description}>Saldo</p>
              <p className={styles.balance_title}>R$ 0</p>
            </Col>
            <Col xl={9} lg={14} md={15} xs={24}>
              <Row>
                <Col
                  className={styles.balance}
                  style={{ marginRight: 20, marginBottom: 10 }}
                  xl={11}
                  lg={11}
                  md={12}
                  xs={15}
                >
                  <Row align={"middle"}>
                    <Col style={{ marginRight: 10 }}>
                      <p className={styles.balance_description}>Gasto Planejado</p>
                      <p className={styles.balance_title}>R$ 0</p>
                    </Col>
                    <Col>
                      <Button type="text">
                        <Image src="/edit.png" alt="Editar" width={20} height={20} />
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col className={styles.balance} xl={11} lg={11} md={10} xs={15}>
                  <p className={styles.balance_description}>Gasto Real</p>
                  <p className={styles.balance_title}>R$ 0</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify={"space-between"} style={{ marginTop: 60 }}>
            <Col xl={13} lg={10} md={10} xs={22} style={{ marginBottom: 20 }}>
              <MyCategoriesList />
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

export default Resume;
