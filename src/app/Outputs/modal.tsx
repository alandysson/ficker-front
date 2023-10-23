"use client";
import { request } from "@/service/api";
import styles from "../EnterTransaction/entertransaction.module.scss";
import { Modal, Col, DatePicker, Row, Select, Form, Button, Input, message } from "antd";
import type { DatePickerProps } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Card } from "@/interfaces";

interface OutputModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  initialValues?: Record<string, any>;
}

interface Category {
  id: number;
  category_description: string;
  created_at: Date;
  updated_at: Date;
}

export const OutputModal = ({ isModalOpen, setIsModalOpen, initialValues }: OutputModalProps) => {
  const [showDescriptionCategory, setShowDescriptionCategory] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [cards, setCards] = useState<Card[]>([]);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setShowDescriptionCategory(false);
    setShowCards(false);
  };

  const getPaymentMethods = async () => {
    try {
      const response = await request({
        endpoint: "payment/methods",
      });
      setPaymentMethods(response.data.data.payment_methods);
    } catch (error) {}
  };
  const getCategories = async () => {
    try {
      const response = await request({
        method: "GET",
        endpoint: "categories/type/2",
      });
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log(dayjs(values.date).format("YYYY-MM-DD"));
      await request({
        method: "POST",
        endpoint: "transaction/store",
        data: {
          ...values,
          date: dayjs(values.date).format("YYYY-MM-DD"),
          type_id: 2,
        },
      });
      message.success("Transação adicionada com sucesso!");
      handleCancel();
    } catch (errorInfo) {
      message.error("Erro ao adicionar transação!");
    }
  };

  const getCards = async () => {
    try {
      const response = await request({
        method: "GET",
        endpoint: "cards",
      });
      setCards(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getCards();
    getPaymentMethods();
    if (initialValues) {
      form.setFieldsValue(initialValues);
      if (initialValues.category_id === 0) {
        setShowDescriptionCategory(true);
      }
      if (initialValues.payment_method_id === 3) {
        setShowCards(true);
      }
    }
  }, [initialValues]);

  return (
    <Modal
      title="Nova Saída"
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
        onValuesChange={(changedValues) => {
          if (Object.keys(changedValues)[0] === "category_id") {
            setShowDescriptionCategory(changedValues.category_id === 0);
          }
          if (Object.keys(changedValues)[0] === "payment_method_id") {
            setShowCards(changedValues.payment_method_id === 4);
          }
        }}
      >
        <Col style={{ marginTop: 20 }}>
          <label>Descrição</label>
          <Form.Item
            name="transaction_description"
            rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
          >
            <Input className={styles.input} style={{ width: "95%" }} data-testid="description" />
          </Form.Item>
        </Col>
        <Col>
          <label>Data:</label>
          <Form.Item name="date" rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}>
            <DatePicker
              data-testid="date"
              className={styles.input}
              placeholder="dd/mm/aaaa"
              format={"DD/MM/YYYY"}
              disabledDate={(current) => {
                return current && current > dayjs().endOf("day");
              }}
            />
          </Form.Item>
        </Col>
        <Row>
          <Col>
            <label>Forma de Pagamento:</label>
            <Form.Item
              name="payment_method_id"
              rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
            >
              <Select
                data-testid="payment_method_id"
                className={styles.input}
                style={{ width: 200, height: 40 }}
                options={paymentMethods?.map((paymentMethod) => ({
                  value: paymentMethod.id,
                  label: paymentMethod.description,
                }))}
              />
            </Form.Item>
          </Col>
          {showCards ? (
            <>
              <Col>
                <label>Cartões:</label>
                <Form.Item
                  name="card_id"
                  rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
                >
                  <Select
                    data-testid="card_id"
                    className={styles.input}
                    style={{ width: 200, height: 40 }}
                    options={cards.map((card) => ({
                      value: card.id,
                      label: card.card_description,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col>
                <label>Parcelas:</label>
                <Form.Item
                  name="installments"
                  rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
                >
                  <Select
                    data-testid="installments"
                    className={styles.input}
                    style={{ width: 150, height: 35 }}
                  >
                    {Array.from({ length: 12 }, (_, index) => (
                      <Select.Option key={index + 1} value={index + 1}>
                        {`${index + 1}x`}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </>
          ) : null}
        </Row>
        <Row>
          <Col>
            <label>Categoria:</label>
            <Form.Item
              name="category_id"
              rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
            >
              <Select
                data-testid="category_id"
                className={styles.input}
                style={{ width: 200, height: 40 }}
                options={[
                  { value: 0, label: "Nova" },
                  ...categories.map((category) => ({
                    value: category.id,
                    label: category.category_description,
                  })),
                ]}
              />
            </Form.Item>
          </Col>
          {showDescriptionCategory ? (
            <Col>
              <label>Descrição da Categoria:</label>
              <Form.Item
                name="category_description"
                rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
              >
                <Input className={styles.input} data-testid="category_description" />
              </Form.Item>
            </Col>
          ) : null}
        </Row>
        <Col xl={15}>
          <label>Valor:</label>
          <Form.Item
            name="transaction_value"
            rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
          >
            <Input className={styles.input} placeholder="R$" data-testid="value" />
          </Form.Item>
        </Col>
        <Row>
          <Button className={styles.modalButtonWhite} onClick={handleCancel}>
            Cancelar
          </Button>
          <Button htmlType="submit" className={styles.modalButtonPurple}>
            Adicionar
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};
