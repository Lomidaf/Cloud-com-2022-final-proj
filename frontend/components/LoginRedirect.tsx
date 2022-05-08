import { Col, Row, Space, Spin } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginRedirect = () => {
  const route = useRouter();

  useEffect(() => {
    route.push('login')
  }, []);

  return (
    <Row justify="center">
      <Col span={24} style={{textAlign: "center"}}>
        <Spin
          tip="Please login first"
          size="large"
          style={{ padding: "50px 0 0 0", marginBottom: "20px" }}
        />
      </Col>
    </Row>
  );
};

export default LoginRedirect;
