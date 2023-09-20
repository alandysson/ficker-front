"use client";
import { CardInformation } from "@/components/CardInformation";
import { TransactionTab } from "@/components/TransactionTab";
import { request } from "@/service/api";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import styles from "../../EnterTransaction/entertransaction.module.scss";
import { CardTransactionModal } from "./mcardtransaction";
import { OutputModal } from "@/app/Outputs/modal";
import dayjs from "dayjs";
import { ITransaction } from "@/interfaces";

interface Card {
  best_day: number;
  created_at: Date;
  description: string;
  expiration: number;
  flag_id: number;
  id: number;
  updated_at: Date;
  user_id: number;
}

interface CardProps {
  card: Card;
}

function CardPage({ card }: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOutputModalOpen, setIsOutputModalOpen] = useState<boolean>(false);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [cardTranscations, setCardTransactions] = useState<ITransaction[]>([]);

  const getCardTotalValue = async () => {
    try {
      const response = await request({
        method: "GET",
        endpoint: `card/${card.id}/invoice`,
      });
      setTotalValue(response.data.data.invoice);
    } catch (error) {}
  };

  const getCardData = async () => {
    try {
      const response = await request({
        method: "GET",
        endpoint: `transactions/card/${card.id}`,
      });
      if (response.data.length > 0) {
        setCardTransactions(response.data);
      }
    } catch (error) {}
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openOutputModal = () => {
    setIsOutputModalOpen(true);
  };

  useEffect(() => {
    getCardData();
    getCardTotalValue();
  }, [isModalOpen]);

  return (
    <Col xl={24}>
      <CardTransactionModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} cardId={card.id} />
      <OutputModal
        isModalOpen={isOutputModalOpen}
        setIsModalOpen={setIsOutputModalOpen}
        initialValues={{
          description: "Pagamento " + card.description,
          value: totalValue,
          date: dayjs(new Date()),
          category_id: 0,
          category_description: "Pagamento Cartão de Crédito",
        }}
      />
      <Row>
        <Col xl={14} lg={20} md={20} xs={20}>
          <TransactionTab data={cardTranscations} />
        </Col>
        <Col xl={6} lg={12} md={20} xs={21}>
          <Col>
            <CardInformation card={card} totalValue={totalValue} />
          </Col>
          <Col xl={22} lg={22} md={20} xs={21}>
            <Row justify={"end"}>
              <button className={styles.button} onClick={openModal} style={{ marginRight: "10px" }}>
                Nova transação
              </button>
              <button className={styles.button} onClick={openOutputModal}>
                Pagar Fatura
              </button>
            </Row>
          </Col>
        </Col>
      </Row>
    </Col>
  );
}

export default CardPage;
