"use client";
import { request } from "@/service/api";
import styles from "../EnterTransaction/entertransaction.module.scss";
import { Modal, Col, DatePicker, Row, Select, Form, Button, Input, message } from "antd";
import type { DatePickerProps } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface EnterTransactionModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

interface Category {
  id: number;
  category_description: string;
  created_at: Date;
  updated_at: Date;
}

export const EnterTransactionModal = ({ isModalOpen, setIsModalOpen }: EnterTransactionModalProps) => {
  const [showDescriptionCategory, setShowDescriptionCategory] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log(dayjs(values.date).format("YYYY-MM-DD"));
      await request({
        method: "POST",
        endpoint: "transactions",
        data: {
          ...values,
          date: dayjs(values.date).format("YYYY-MM-DD"),
          type_id: 1,
          payment_method_id: null,
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

  const getCategories = async () => {
    await request({
      method: "GET",
      endpoint: "categories/1",
    })
      .then((response) => {
        if (response.data.data.category.length > 1) {
          return setCategories(response.data.data.category);
        }
        setCategories([response.data.data.category]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    form.resetFields();
    getCategories();
  }, []);

  return (
    <Modal
      title="Nova Entrada"
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
        onFinish={handleFinish}
        initialValues={{
          transaction_value: "",
        }}
        onFinishFailed={(errorInfo) => console.log(errorInfo)}
        onValuesChange={(changedValues) => {
          if (Object.keys(changedValues)[0] === "category_id") {
            setShowDescriptionCategory(changedValues.category_id === 0);
          }
          if (changedValues.transaction_value) {
            const result = changedValues.transaction_value.replace(/[^0-9]/g, "");
            form.setFieldsValue({ transaction_value: result });
          }
        }}
      >
        <Col style={{ marginTop: 20 }}>
          <label>Descrição</label>
          <Form.Item
            name="transaction_description"
            rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
          >
            <Input className={styles.input} style={{ width: "95%" }} data-test="input-description" />
          </Form.Item>
        </Col>
        <Col style={{ marginTop: 20 }}>
          <label>Data:</label>
          <Form.Item name="date" rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}>
            <DatePicker
              onChange={onChange}
              className={styles.input}
              placeholder="dd/mm/aaaa"
              format={"DD/MM/YYYY"}
              disabledDate={(current) => {
                return current && current > dayjs().endOf("day");
              }}
            />
          </Form.Item>
        </Col>
        <Row style={{ marginTop: 20 }}>
          <Col>
            <label>Categoria:</label>
            <Form.Item
              name="category_id"
              rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
            >
              <Select data-test="category" className={styles.input} style={{ width: 200, height: 40 }}>
                <Select.Option value={0} data-test="option-newCategory">
                  Nova
                </Select.Option>
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.category_description}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {showDescriptionCategory ? (
            <Col>
              <label>Descrição da Categoria:</label>
              <Form.Item
                name="category_description"
                rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
              >
                <Input className={styles.input} data-test="input-categoryDescription" />
              </Form.Item>
            </Col>
          ) : null}
        </Row>
        <Col style={{ marginBottom: 20 }} xl={15}>
          <label>Valor:</label>
          <Form.Item
            name="transaction_value"
            rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
          >
            <Input className={styles.input} placeholder="R$" data-test="input-value" />
          </Form.Item>
        </Col>
        <Row>
          <Button className={styles.modalButtonWhite} onClick={handleCancel} data-test="button-cancel">
            Cancelar
          </Button>
          <Button htmlType="submit" className={styles.modalButtonPurple} data-test="button-submit">
            Adicionar
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};
