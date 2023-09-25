"use client";
import { request } from "@/service/api";
import styles from "../EnterTransaction/entertransaction.module.scss";
import { Modal, Col, DatePicker, Row, Select, Form, Button, Input, message } from "antd";
import type { DatePickerProps } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
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
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  useEffect(() => {
    getCategories();
    if (initialValues) {
      form.setFieldsValue(initialValues);
      if (initialValues.category_id === 0) {
        setShowDescriptionCategory(true);
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
        }}
      >
        <Col style={{ marginTop: 20 }}>
          <label>Descrição</label>
          <Form.Item
            name="description"
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
              onChange={onChange}
              className={styles.input}
              placeholder="dd/mm/aaaa"
              format={"DD/MM/YYYY"}
            />
          </Form.Item>
        </Col>
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
          <Form.Item name="value" rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}>
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
