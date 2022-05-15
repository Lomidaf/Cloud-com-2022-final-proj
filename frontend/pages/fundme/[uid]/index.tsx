import {
  Col,
  Row,
  Image,
  Typography,
  Space,
  Divider,
  Card,
  Progress,
  Button,
} from "antd";
import { TagOutlined, UserOutlined, HeartOutlined, BankOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import AuthStore from "../../../mobx/AuthStore";

// const fundraisingSrc =
//   "https://static.lag.vn/upload/news/22/04/07/spy-x-family-anya-forger-la-ai-1_UMOI.jpg?w=800&encoder=wic&subsampling=444";
// const fundraisingTitle = "Hello Cloud Computing";
// const fundraisingType = "Emergency";
// const fundraisingDescription =
//   "This is a mock description for cloud computing 2022 final project. I have to write this really really really really long for this to be mock successfully. I like a new spy x family anime and i don't know why i write that. I think this is long enoght description for me to mock this fucking shit hole project. This is a mock description for cloud computing 2022 final project. I have to write this really really really really long for this to be mock successfully. I like a new spy x family anime and i don't know why i write that. I think this is long enoght description for me to mock this fucking shit hole project. This is a mock description for cloud computing 2022 final project. I have to write this really really really really long for this to be mock successfully. I like a new spy x family anime and i don't know why i write that. I think this is long enoght description for me to mock this fucking shit hole project. This is a mock description for cloud computing 2022 final project. I have to write this really really really really long for this to be mock successfully. I like a new spy x family anime and i don't know why i write that. I think this is long enoght description for me to mock this fucking shit hole project.";
// const ownerUsername = "DEE";
// const currentTotalDonation = 1000;
// const donationGoal = 20000;
const totalDonation = 10;

const FoundraisingPage: NextPage = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [fundraising, setFundraising] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000") +
        `/api/fundraiser/${uid}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFundraising(data["fundraiser"]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
      });
  }, []);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Row style={{ marginTop: "40px" }}>
          <Col span={16}>
            <Space direction="vertical" align="start" style={{ width: "100%" }}>
              <Typography.Title level={3}>
                {fundraising.fundraiser_title}
              </Typography.Title>
              <Image
                src={fundraising.image_path}
                fallback="https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg"
              />
            </Space>
            <Divider style={{ borderColor: "#8c8c8c" }} />
            <Typography.Text>
              <TagOutlined style={{ marginRight: "10px" }} />
              {fundraising.fundraiser_type}
            </Typography.Text>
            <Divider style={{ borderColor: "#8c8c8c" }} />
            <Typography.Paragraph
              ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
            >
              {fundraising.fundraiser_description}
            </Typography.Paragraph>
            <Divider style={{ borderColor: "#8c8c8c" }} />
            <Typography.Title level={3}>Organizer</Typography.Title>
            <Space>
              <UserOutlined style={{ fontSize: "32px" }} />
              <Col style={{ marginLeft: "20px" }}>
                <Typography.Paragraph
                  strong
                  style={{ marginTop: "12px", marginBottom: "0px" }}
                >
                  {fundraising.fundraiser_accountOwner}
                </Typography.Paragraph>
                <Typography.Paragraph>Organizer</Typography.Paragraph>
              </Col>
            </Space>
            <Divider style={{ borderColor: "#8c8c8c" }} />
            <Typography.Title level={3}>Donation account</Typography.Title>
            <Space>
              <BankOutlined style={{ fontSize: "32px" }} />
              <Col style={{ marginLeft: "20px" }}>
                <Typography.Paragraph
                  strong
                  style={{ marginTop: "12px", marginBottom: "0px" }}
                >
                  {fundraising.fundraiser_accountCompany}
                </Typography.Paragraph>
                <Typography.Paragraph
                  strong
                  style={{ marginTop: "0px", marginBottom: "0px" }}
                >
                  {fundraising.fundraiser_accountOwner}
                </Typography.Paragraph>
                <Typography.Paragraph>
                  {fundraising.fundraiser_bankAccount}
                </Typography.Paragraph>
              </Col>
            </Space>
            <Divider style={{ borderColor: "#8c8c8c" }} />
          </Col>
          <Col span={8}>
            <Card style={{ marginTop: "50px", marginLeft: "15px" }}>
              <Typography.Text strong style={{ fontSize: "20px" }}>
                {"฿" + fundraising.fundraiser_currentAmount}
              </Typography.Text>
              <Typography.Text style={{ marginLeft: "10px" }}>
                {"BATH raised of ฿" + fundraising.fundraiser_goal + " goal"}
              </Typography.Text>
              <Progress
                percent={Math.floor(
                  (fundraising.fundraiser_currentAmount /
                    fundraising.fundraiser_goal) *
                    100
                )}
                showInfo={false}
              />
              {AuthStore.user && (
                <Button
                  type="primary"
                  block
                  style={{
                    marginTop: "15px",
                    height: "50px",
                    fontSize: "20px",
                  }}
                  onClick={() => router.push(router.asPath + "/donate")}
                >
                  Donate
                </Button>
              )}
              <Space
                direction="horizontal"
                style={{ marginTop: "15px", width: "100%" }}
              >
                <HeartOutlined style={{ color: "red" }} />
                <Typography.Text strong>
                  {fundraising.donation_count + " donations"}
                </Typography.Text>
              </Space>
              {/* <Button style={{ marginTop: "10px" }}>See all donations</Button> */}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default FoundraisingPage;
