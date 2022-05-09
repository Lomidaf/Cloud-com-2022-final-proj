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
  Modal,
} from "antd";
import { TagOutlined, UserOutlined, HeartOutlined, RiseOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const fundraisingSrc =
  "https://static.lag.vn/upload/news/22/04/07/spy-x-family-anya-forger-la-ai-1_UMOI.jpg?w=800&encoder=wic&subsampling=444";
const fundraisingTitle = "Hello Cloud Computing";
const fundraisingType = "Emergency";
const fundraisingDescription =
  "This is a mock description for cloud computing 2022 final project. I have to write this really really really really long for this to be mock successfully. I like a new spy x family anime and i don't know why i write that. I think this is long enoght description for me to mock this fucking shit hole project. This is a mock description for cloud computing 2022 final project. I have to write this really really really really long for this to be mock successfully. I like a new spy x family anime and i don't know why i write that. I think this is long enoght description for me to mock this fucking shit hole project. This is a mock description for cloud computing 2022 final project. I have to write this really really really really long for this to be mock successfully. I like a new spy x family anime and i don't know why i write that. I think this is long enoght description for me to mock this fucking shit hole project. This is a mock description for cloud computing 2022 final project. I have to write this really really really really long for this to be mock successfully. I like a new spy x family anime and i don't know why i write that. I think this is long enoght description for me to mock this fucking shit hole project.";
const ownerUsername = "DEE";
const currentTotalDonation = 1000;
const donationGoal = 20000;
const totalDonation = 10;
const newDonationCount = 3;
const newDonationInfo = [
  {
    name: "Dee",
    amount: "20",
    date: "25/2/2022 13:50:00",
  },
  {
    name: "Earth",
    amount: "22",
    date: "25/2/2022 13:51:00",
  },
  {
    name: "Arm",
    amount: "27",
    date: "25/2/2022 13:52:00",
  },
]
const donationInfo = [
  {
    name: "Dee",
    amount: "20",
    date: "25/2/2022 13:50:00",
  },
  {
    name: "Earth",
    amount: "22",
    date: "25/2/2022 13:51:00",
  },
  {
    name: "Arm",
    amount: "27",
    date: "25/2/2022 13:52:00",
  },
  {
    name: "Dee2",
    amount: "2",
    date: "25/2/2022 13:53:00",
  },
  {
    name: "DeeDoo",
    amount: "10",
    date: "25/2/2022 13:55:00",
  },
  {
    name: "Dee",
    amount: "20",
    date: "25/2/2022 13:50:00",
  },
  {
    name: "Earth",
    amount: "22",
    date: "25/2/2022 13:51:00",
  },
  {
    name: "Arm",
    amount: "27",
    date: "25/2/2022 13:52:00",
  },
  {
    name: "Dee2",
    amount: "2",
    date: "25/2/2022 13:53:00",
  },
  {
    name: "DeeDoo",
    amount: "10",
    date: "25/2/2022 13:55:00",
  },
];

const FoundraisingPage: NextPage = () => {
  const router = useRouter();
  const [isDonationModalVisible, setIsDonationModalVisible] = useState(false);
  const [isRecentDonationModalVisible, setIsRecentDonationModalVisible] = useState(false);
  const { uid } = router.query;
  return (
    <>
      <Row style={{ marginTop: "40px" }}>
        <Col span={16}>
          <Space direction="vertical" align="start" style={{ width: "100%" }}>
            <Typography.Title level={3}>{fundraisingTitle}</Typography.Title>
            <Image src={fundraisingSrc} />
          </Space>
          <Divider style={{ borderColor: "#8c8c8c" }} />
          <Typography.Text>
            <TagOutlined style={{ marginRight: "10px" }} />
            {fundraisingType}
          </Typography.Text>
          <Divider style={{ borderColor: "#8c8c8c" }} />
          <Typography.Paragraph
            ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
          >
            {fundraisingDescription}
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
                {ownerUsername}
              </Typography.Paragraph>
              <Typography.Paragraph>Organizer</Typography.Paragraph>
            </Col>
          </Space>
          <Divider style={{ borderColor: "#8c8c8c" }} />
        </Col>
        <Col span={8}>
          <Card style={{ marginTop: "50px", marginLeft: "15px" }}>
            <Typography.Text strong style={{ fontSize: "20px" }}>
              {"฿" + currentTotalDonation}
            </Typography.Text>
            <Typography.Text style={{ marginLeft: "10px" }}>
              {"BATH raised of ฿" + donationGoal + " goal"}
            </Typography.Text>
            <Progress
              percent={Math.floor((currentTotalDonation / donationGoal) * 100)}
              showInfo={false}
            />
            <Space
              direction="horizontal"
              style={{ marginTop: "15px", width: "100%" }}
            >
              <HeartOutlined style={{ color: "red" }} />
              <Typography.Text strong>
                {totalDonation + " donations"}
              </Typography.Text>
            </Space>
            <Space
              direction="horizontal"
              style={{ marginTop: "15px", width: "100%" }}
            >
              <RiseOutlined  style={{ color: "blue" }} />
              <Typography.Text strong>
                {newDonationCount + " people recently donated"}
              </Typography.Text>
            </Space>
            <Button
              style={{ marginTop: "20px" , marginRight: "10px"}}
              onClick={() => setIsRecentDonationModalVisible(true)}
            >
              See recent donations
            </Button>
            <Button
              style={{ marginTop: "20px" }}
              onClick={() => setIsDonationModalVisible(true)}
            >
              See all donations
            </Button>
          </Card>

          <Button
            type="primary"
            // block
            style={{
              marginTop: "15px",
              marginLeft: "15px",
              width: "calc(100% - 15px)",
              height: "50px",
              fontSize: "20px",
            }}
            onClick={() => router.push(router.asPath + "/edit")}
          >
            Edit Foundraising
          </Button>
        </Col>
        <Modal
          title="Donations"
          visible={isDonationModalVisible}
          onOk={() => setIsDonationModalVisible(false)}
          onCancel={() => setIsDonationModalVisible(false)}
          footer={null}
          bodyStyle={{ overflow: "hidden", overflowY: "scroll" }}
        >
          <Space
            direction="vertical"
            size={0}
            style={{ maxHeight: "300px", width: "100%" }}
          >
            {donationInfo.map((donation) => {
              return (
                <>
                  <Space
                    direction="vertical"
                    style={{ width: "100%", margin: "0 10px 0 0px" }}
                    size={0}
                  >
                    <Typography.Text>{donation.name}</Typography.Text>
                    <Space style={{width: "100%"}}>
                      <div style={{width: "50px"}}>
                      <Typography.Text
                        strong
                        // style={{width: "100px"}}
                      >{`฿${donation.amount}`}</Typography.Text>
                      </div>
                      <Typography.Text>{`• ${donation.date}`}</Typography.Text>
                    </Space>
                    <Divider style={{ margin: "10px 0 10px 0" }} />
                  </Space>
                </>
              );
            })}
          </Space>
        </Modal>
        <Modal
          title="Recent Donations"
          visible={isRecentDonationModalVisible}
          onOk={() => setIsRecentDonationModalVisible(false)}
          onCancel={() => setIsRecentDonationModalVisible(false)}
          footer={null}
          bodyStyle={{ overflow: "hidden", overflowY: "scroll" }}
        >
          <Space
            direction="vertical"
            size={0}
            style={{ maxHeight: "300px", width: "100%" }}
          >
            {newDonationInfo.map((donation) => {
              return (
                <>
                  <Space
                    direction="vertical"
                    style={{ width: "100%", margin: "0 10px 0 0px" }}
                    size={0}
                  >
                    <Typography.Text>{donation.name}</Typography.Text>
                    <Space style={{width: "100%"}}>
                      <div style={{width: "50px"}}>
                      <Typography.Text
                        strong
                        // style={{width: "100px"}}
                      >{`฿${donation.amount}`}</Typography.Text>
                      </div>
                      <Typography.Text>{`• ${donation.date}`}</Typography.Text>
                    </Space>
                    <Divider style={{ margin: "10px 0 10px 0" }} />
                  </Space>
                </>
              );
            })}
          </Space>
        </Modal>
      </Row>
    </>
  );
};

export default FoundraisingPage;
