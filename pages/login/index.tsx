import type { NextPage } from "next";
import { Form, Input, Button, Checkbox, Row, Col, Typography } from "antd";
import { useRouter } from "next/router";
import AuthStore from "../../mobx/AuthStore";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const onFinish = async (values: any) => {
    try {
      await AuthStore.login(values.email, values.password);
      router.push("/");
    } catch (err: any) {
      if (err instanceof FirebaseError) setError("Invalid username or password");
      else setError("Something went wrong! Please try again later")
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed");
  };

  return (
    <Row justify="center">
      <Col span={9}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ padding: "75px 0 0 0", marginBottom: "20px" }}
        >
          <Form.Item
            label="Email "
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password "
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Row>
            <Col span={16}>
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 9 }}
              >
                <Checkbox name="remember">Remember me</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ float: "right" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Typography.Text type="danger">{error}</Typography.Text>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
