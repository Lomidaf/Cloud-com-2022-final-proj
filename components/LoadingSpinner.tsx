import { Col, Row, Spin } from "antd";

const LoadingSpinner = () => {
  return (
    <Row justify="center">
      <Col span={24} style={{ textAlign: "center" }}>
        <Spin
          tip="Loading ..."
          size="large"
          style={{ padding: "50px 0 0 0", marginBottom: "20px" }}
        />
      </Col>
    </Row>
  );
};

export default LoadingSpinner;
