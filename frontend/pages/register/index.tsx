import type { NextPage } from "next";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  Typography,
} from "antd";
import AuthStore from "../../mobx/AuthStore";
import { useState } from "react";
import { useRouter } from "next/router";
import { getRefinedFirebaseAuthErrorMessage } from "../../firebase/utils";

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      await AuthStore.signup(values.email, values.password);
      await AuthStore.updateUserProfile({
        name: values.name,
        gender: values.gender,
        birthDate: values.birthDate,
        intro: values.intro,
      });
      const payload = {
        email: values.email,
        name: values.name,
        gender: values.gender,
        birthDate: values.birthDate.toString(),
        intro: values.intro,
      };
      const result = await fetch(
        (process.env.NEXT_BACKEND_URL || "http://localhost:8000") +
          "/api/user/register",
        {
          method: "post",
          headers: await AuthStore.getAuthHeader(),
          body: JSON.stringify(payload),
        }
      );
      console.log(result);
      router.push("/");
    } catch (err: any) {
      console.log(getRefinedFirebaseAuthErrorMessage(err.message));
      setError(getRefinedFirebaseAuthErrorMessage(err.message));
    }
  };

  return (
    <Row justify="center">
      <Col span={16}>
        <Form
          name="complex-form"
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ padding: "50px 0 0 0", marginBottom: "20px" }}
        >
          <Form.Item
            name={"email"}
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select placeholder="select your gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="birthDate" label="Birth date">
            <DatePicker />
          </Form.Item>
          <Form.Item name={"intro"} label="Intro">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            {error && (
              <Typography.Text type="danger" style={{ paddingLeft: "10px" }}>
                {error}
              </Typography.Text>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default RegisterPage;
