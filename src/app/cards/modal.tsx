"use client";
import { request } from "@/service/api";
import styles from "../EnterTransaction/entertransaction.module.scss";
import { Modal, Col, Row, Select, Form, Button, Input, message } from "antd";
import { useEffect, useState } from "react";

interface CardModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

interface Flag {
  id: number;
  flag_description: string;
  created_at: Date;
  updated_at: Date;
}

export const NewCardModal = ({ isModalOpen, setIsModalOpen }: CardModalProps) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      await request({
        method: "POST",
        endpoint: "cards",
        data: {
          ...values,
        },
      });
      message.success("Cartão cadastrado com sucesso!");
      handleCancel();
    } catch (errorInfo) {
      message.error("Erro ao cadastrar cartão!");
    }
  };

  useEffect(() => {
    form.resetFields();
  }, []);

  return (
    <Modal
      title="Novo Cartão de Crédito"
      open={isModalOpen}
      onCancel={handleCancel}
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
      cancelButtonProps={{
        style: {
          display: "none",
        },
      }}
    >
      <Form
        form={form}
        name="basic"
        data-testid="form"
        onFinish={handleFinish}
        onFinishFailed={(errorInfo) => console.log(errorInfo)}
      >
        <Col style={{ marginTop: 20 }}>
          <label>Bandeira:</label>
          <Form.Item
            name="flag_id"
            rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
          >
            <Select data-test="flag-id" className={styles.input} style={{ width: 200, height: 40 }}>
              <Select.Option value={1} data-test="card-mastercard">
                Mastercard
              </Select.Option>
              <Select.Option value={2} data-test="card-visa">
                Visa
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col style={{ marginTop: 20 }}>
          <label>Descrição</label>
          <Form.Item
            name="card_description"
            rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
          >
            <Input className={styles.input} style={{ width: "95%" }} data-test="card-description" />
          </Form.Item>
        </Col>
        <Col style={{ marginTop: 20 }}>
          <label>Dia de vencimento da fatura:</label>
          <Form.Item
            name="card_expiration"
            rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
          >
            <Select data-test="card-expiration" className={styles.input} style={{ width: 250, height: 40 }}>
              {/* Renderize as opções com os dias do mês */}
              {Array.from({ length: 31 }, (_, index) => (
                <Select.Option
                  key={index + 1}
                  value={index + 1}
                  data-test={`card-expiration-day-${index + 1}`}
                >
                  {index + 1}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col style={{ marginTop: 20 }}>
          <label>Dia de fechamento da fatura:</label>
          <Form.Item
            name="card_closure"
            rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
          >
            <Select className={styles.input} style={{ width: 250, height: 40 }} data-test="card-closure">
              {/* Renderize as opções com os dias do mês */}
              {Array.from({ length: 31 }, (_, index) => (
                <Select.Option
                  key={31 - index}
                  value={31 - index}
                  data-test={`card-closure-day-${31 - index}`}
                >
                  {31 - index}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Row>
          <Button className={styles.modalButtonWhite} onClick={handleCancel}>
            Cancelar
          </Button>
          <Button htmlType="submit" className={styles.modalButtonPurple} data-test="button-finish">
            Adicionar
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};
