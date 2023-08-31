"use client";
import { CardInformation } from "@/components/CardInformation";
import { TransactionTab } from "@/components/TransactionTab";
import { request } from "@/service/api";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import styles from "../../EnterTransaction/entertransaction.module.scss";
import { CardTransactionModal } from "./mcardtransaction";

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
  const [totalValue, setTotalValue] = useState<number>(0);
  const getCardData = async () => {
    try {
      const response = await request({
        method: "POST",
        endpoint: `invoice/card`,
      });
      if (response.data.data.total > 0) {
        setTotalValue(response.data.data.total);
      }
    } catch (error) {}
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getCardData();
  }, [isModalOpen]);

  return (
    <Col xl={24}>
      <CardTransactionModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Row>
        <Col xl={14} lg={20} md={20} xs={20}>
          <TransactionTab
            data={[
              {
                id: 1,
                user_id: 1,
                category_id: 1,
                card_id: 1,
                description: "Teste",
                date: new Date(),
                type: "Teste",
                value: 1,
                installments: 1,
                created_at: new Date(),
                updated_at: new Date(),
              },
            ]}
          />
        </Col>
        <Col xl={6} lg={12} md={20} xs={21}>
          <Col>
            <CardInformation card={card} totalValue={totalValue} />
          </Col>
          <Col xl={22} lg={22} md={20} xs={21}>
            <Row justify={"end"}>
              <button className={styles.button} onClick={openModal}>
                Nova transação
              </button>
            </Row>
          </Col>
        </Col>
      </Row>
    </Col>
  );
}

export default CardPage;
