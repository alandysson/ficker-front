"use client";
import Link from "next/link";
import Image from "next/image";
import CustomMenu from "@/components/CustomMenu";
import { Button, Col, Row, Typography, message } from "antd";
import styles from "./resume.module.scss";
import MyCategoriesList from "@/components/MyCategoriesList";
import LastTransactionsList from "@/components/LastTransactionsList";
import { useEffect, useState } from "react";
import { request } from "@/service/api";

interface BalanceProps {
  balance: number;
  planned_spending: number;
  real_spending: number;
}

const Resume = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const [balance, setBalance] = useState<BalanceProps>({} as BalanceProps);

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const monthName = monthNames[today.getMonth()];

  const dateRange = `${firstDayOfMonth.getDate()} de ${monthName} - ${lastDayOfMonth.getDate()} de ${monthName}`;

  const [showSaldo, setShowSaldo] = useState(true);
  const [iconShowSaldo, setIconShowSaldo] = useState(
    "/icons/icon-hide-saldo.svg"
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [gastoPlanejado, setGastoPlanejado] = useState("0");

  const handleClickShowSaldo = () => {
    setShowSaldo(!showSaldo);
    if (showSaldo) {
      setIconShowSaldo("/icons/icon-show-saldo.svg");
    } else {
      setIconShowSaldo("/icons/icon-hide-saldo.svg");
    }
  };

  const getBalance = async () => {
    try {
      const { data } = await request({
        endpoint: "balance",
      });
      setBalance(data.finances);
    } catch (error) {}
  };
  const handleClickEditGastoPlanejado = () => {
    setIsEditMode(true);
  };

  const handleBlur = () => {
    setIsEditMode(false);
    // Faça a requisição de atualização aqui com o novo valor (gastoPlanejado)
  };

  const handleKeyDown = async (e: any) => {
    if (e.keyCode === 13) {
      setIsEditMode(false);
      try {
        await request({
          endpoint: "spending/store",
          method: "POST",
          data: {
            planned_spending: gastoPlanejado,
          },
        });
      } catch (error) {
        message.error("Algo deu errado!");
      }
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
    getBalance();
  }, []);

  return (
    <div>
      <div style={{ background: "#fff", padding: 10, alignItems: "center" }}>
        <Link
          href={"/"}
          style={{ background: "#fff", padding: 10, alignItems: "center" }}
        >
          <Image src="/logo.png" alt="Logo" width={130} height={27} />
        </Link>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CustomMenu />
        <Col style={{ padding: "10px 30px" }} xl={20} lg={19} md={22} xs={24}>
          <Row align={"middle"} justify={"space-between"}>
            <div>
              <div>
                <h3>Olá</h3>
              </div>
            </div>
            <div>
              <span style={{ color: "#808191", fontSize: "small" }}>
                {dateRange}
              </span>
            </div>
          </Row>
          <Row justify={"space-between"}>
            <Col
              className={styles.balance}
              style={{ marginRight: 20, marginBottom: 10 }}
              xl={11}
              lg={11}
              md={12}
              xs={15}
            >
              <Row align={"middle"} justify={"space-between"}>
                <Col style={{ marginRight: 10 }}>
                  <p className={styles.balance_description}>Saldo</p>
                  <p className={styles.balance_title}>
                    {showSaldo ? formatCurrency(balance.balance) : "****"}
                  </p>
                </Col>
                <Col>
                  <Button type="text">
                    <Image
                      src={iconShowSaldo}
                      alt="Hide"
                      width={20}
                      height={20}
                      onClick={handleClickShowSaldo}
                    />
                  </Button>
                </Col>
              </Row>
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
                  <Row align={"middle"} justify={"space-between"}>
                    <Col style={{ marginRight: 10 }}>
                      <p className={styles.balance_description}>
                        Gasto Planejado
                      </p>
                      {isEditMode ? (
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={gastoPlanejado}
                          onChange={(e) => setGastoPlanejado(e.target.value)}
                          onBlur={handleBlur}
                          onKeyDown={handleKeyDown}
                          autoFocus
                          style={{
                            border: "none",
                            outline: "none",
                            background: "none",
                            boxShadow: "none",
                            width: "90%",
                            fontSize: "large",
                            padding: "15px",
                          }}
                        />
                      ) : (
                        <p className={styles.balance_title}>
                          {formatCurrency(balance.planned_spending)}
                        </p>
                      )}
                    </Col>
                    {!isEditMode ? (
                      <Col>
                        <Button type="text">
                          <Image
                            src="/edit.png"
                            alt="Editar"
                            width={20}
                            height={20}
                            onClick={handleClickEditGastoPlanejado}
                          />
                        </Button>
                      </Col>
                    ) : (
                      ""
                    )}
                  </Row>
                </Col>
                <Col className={styles.balance} xl={11} lg={11} md={10} xs={15}>
                  <p className={styles.balance_description}>Gasto Real</p>
                  <p className={styles.balance_title}>
                    {formatCurrency(balance.real_spending)}
                  </p>
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
