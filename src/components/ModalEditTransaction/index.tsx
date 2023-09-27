"use client";
import { request } from "@/service/api";
import { Modal, Col, DatePicker, Row, Select, Form, Button, Input, message } from "antd";
import type { DatePickerProps } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import styles from "@/app/EnterTransaction/entertransaction.module.scss";
import { ITransaction } from "@/interfaces";

interface EditTransactionModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  transaction: ITransaction;
}
interface Category {
  id: number;
  category_description: string;
  created_at: Date;
  updated_at: Date;
}

export const EditTransactionModal = ({
  isModalOpen,
  setIsModalOpen,
  transaction,
}: EditTransactionModalProps) => {
  const [showDescriptionCategory, setShowDescriptionCategory] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDelete = async () => {
    try {
      const response = await request({
        method: "DELETE",
        endpoint: `transactions/delete/${transaction.id}`,
      });
      message.success("Transação deletada com sucesso!");
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async (typeId: number) => {
    try {
      const response = await request({
        method: "GET",
        endpoint: `categories/type/${typeId}`,
      });
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      await request({
        method: "PUT",
        endpoint: `transactions/update/${transaction.id}`,
        data: {
          ...values,
          date: dayjs(values.date).format("YYYY-MM-DD"),
        },
      });
      message.success("Transação atualizada com sucesso!");
      handleCancel();
    } catch (errorInfo) {
      message.error("Erro ao editar transação!");
    }
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  useEffect(() => {
    getCategories(transaction.type_id);
    form.resetFields();
  }, []);

  return (
    <Modal
      title="Editar Transação"
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
        initialValues={{
          description: transaction.transaction_description,
          date: dayjs(transaction.date),
          category_id: transaction.category_id,
          installments: transaction.installments,
          value: transaction.transaction_value,
        }}
        onFinish={handleFinish}
        onFinishFailed={(errorInfo) => console.log(errorInfo)}
        onValuesChange={(changedValues) => {
          if (Object.keys(changedValues)[0] === "category_id") {
            setShowDescriptionCategory(changedValues.category_id === 0);
          }
        }}
      >
        <Col>
          <label>Descrição</label>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
          >
            <Input className={styles.input} style={{ width: "95%" }} data-testid="description" />
          </Form.Item>
        </Col>
        <Col style={{ marginTop: 20 }}>
          <label>Data:</label>
          <Form.Item name="date" rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}>
            <DatePicker
              data-testid="date"
              onChange={onChange}
              className={styles.input}
              placeholder="dd/mm/aaaa"
              format={"DD/MM/YYYY"}
              defaultValue={dayjs(transaction.date)}
            />
          </Form.Item>
        </Col>
        <Row style={{ marginTop: 20 }}>
          <Col>
            <label>Categoria:</label>
            <Form.Item
              name="category_id"
              rules={[
                {
                  required: true,
                  message: "Esse campo precisa ser preenchido!",
                },
              ]}
            >
              <Select
                data-testid="category_id"
                className={styles.input}
                style={{ width: 200, height: 35 }}
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
                rules={[
                  {
                    required: true,
                    message: "Esse campo precisa ser preenchido!",
                  },
                ]}
              >
                <Input className={styles.input} data-testid="category_description" />
              </Form.Item>
            </Col>
          ) : null}
        </Row>
        {transaction.installments ? (
          <Col>
            <label>Parcelas:</label>
            <Form.Item
              name="installments"
              rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
            >
              <Select data-testid="installments" className={styles.input} style={{ width: 150, height: 35 }}>
                {Array.from({ length: 12 }, (_, index) => (
                  <Select.Option key={index + 1} value={index + 1}>
                    {`${index + 1}x`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        ) : null}
        <Col style={{ marginBottom: 20 }} xl={15}>
          <label>Valor:</label>
          <Form.Item name="value" rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}>
            <Input className={styles.input} placeholder="R$" data-testid="value" />
          </Form.Item>
        </Col>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Button className={styles.modalButtonWhite} onClick={handleCancel}>
              Cancelar
            </Button>
            <Button htmlType="submit" className={styles.modalButtonPurple}>
              Salvar
            </Button>
          </div>
          <Button className={styles.secondaryLink} onClick={handleDelete}>
            <Image src="/icons/icon-delete.svg" alt="Excluir" width={20} height={20} />
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};
