"use client";
import { request } from "@/service/api";
import { Modal, Col, Row, Select, Form, Button, Input, message } from "antd";
import { useEffect } from "react";
import styles from "@/app/EnterTransaction/entertransaction.module.scss";

interface ModalNewCategoryProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const ModalNewCategory = ({
  isModalOpen,
  setIsModalOpen,
}: ModalNewCategoryProps) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      await request({
        method: "POST",
        endpoint: `categories`,
        data: {
          ...values
        },
      });
      message.success("Categoria adicionada com sucesso!");
      handleCancel();
    } catch (errorInfo) {
      message.error("Erro ao adicionar categoria!");
    }
  };

  useEffect(() => {
    form.resetFields();
  }, []);

  return (
    <Modal
      title="Nova Categoria"
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
        <Col>
          <label>Descrição</label>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
          >
            <Input className={styles.input} style={{ width: "95%" }} data-testid="description" />
          </Form.Item>
        </Col>
        <Col>
        <label>Tipo:</label>
        <Form.Item
            name="type_id"
            rules={[{ required: true, message: "Esse campo precisa ser preenchido!" }]}
        >
            <Select data-testid="type_id" className={styles.input} style={{ width: 150, height: 35 }} defaultValue={0}>
                <Select.Option key={0} value={0} disabled>Selecione o tipo de categoria</Select.Option>
                <Select.Option key={1} value={1}>Entrada</Select.Option>
                <Select.Option key={2} value={2}>Saída</Select.Option>
            </Select>
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
              Adicionar
            </Button>
          </div>
        </Row>
      </Form>
    </Modal>
  );
};
