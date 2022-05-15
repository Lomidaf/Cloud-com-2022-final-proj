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
import {
  TagOutlined,
  UserOutlined,
  HeartOutlined,
  RiseOutlined,
  BankOutlined,
} from "@ant-design/icons";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthStore from "../../../../mobx/AuthStore";
import LoadingSpinner from "../../../../components/LoadingSpinner";

// const fundraisingSrc =
//   "https://static.lag.vn/upload/news/22/04/07/spy-x-family-anya-forger-la-ai-1_UMOI.jpg?w=800&encoder=wic&subsampling=444";
// const fundraisingTitle = "Hello Cloud Computing";
// const fundraisingType = "Emergency";
// const fundraisingDescription =
//   "This is a mock description for cloud computing 2022 final project. I have to write this really really really really long for this to be mock successfully. I like a new spy x family anime and i don't know why i write that. I think this is long enoght description for me to mock this fucking shit hole project. This is a mock description for cloud computing 2022 final project. I have to write this really really really really long for this to be mock successfully. I like a new spy x family anime and i don't know why i write that. I think this is long enoght description for me to mock this fucking shit hole project. This is a mock description for cloud computing 2022 final project. I have to write this really really really really long for this to be mock successfully. I like a new spy x family anime and i don't know why i write that. I think this is long enoght description for me to mock this fucking shit hole project. This is a mock description for cloud computing 2022 final project. I have to write this really really really really long for this to be mock successfully. I like a new spy x family anime and i don't know why i write that. I think this is long enoght description for me to mock this fucking shit hole project.";
// const ownerUsername = "DEE";
// const currentTotalDonation = 1000;
// const donationGoal = 20000;
// const totalDonation = 10;
// const newDonationCount = 3;
// const newDonationInfo = [
//   {
//     name: "Dee",
//     amount: "20",
//     date: "25/2/2022 13:50:00",
//   },
//   {
//     name: "Earth",
//     amount: "22",
//     date: "25/2/2022 13:51:00",
//   },
//   {
//     name: "Arm",
//     amount: "27",
//     date: "25/2/2022 13:52:00",
//   },
// ];

const FoundraisingPage: NextPage = () => {
  const router = useRouter();
  const [isDonationModalVisible, setIsDonationModalVisible] = useState(false);
  const [isRecentDonationModalVisible, setIsRecentDonationModalVisible] =
    useState(false);
  const { uid } = router.query;
  const [fundraising, setFundraising] = useState({});
  const [loading, setLoading] = useState(true);
  const [recentCount, setRecentCount] = useState(0);
  const [donationInfo, setDonationInfo] = useState([]);
  const [imagePreviewSrc, setImagePreviewSrc] = useState("");
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      (process.env.NEXT_BACKEND_URL || "http://localhost:8000") +
        `/api/fundraiser/${uid}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setFundraising(data["fundraiser"]);
        setRecentCount(data["recent"]["count"]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
      });

    AuthStore.getAuthHeader().then((header: any) => {
      fetch(
        (process.env.NEXT_BACKEND_URL || "http://localhost:8000") +
          `/api/fundraiser/${uid}/donation`,
        {
          method: "get",
          headers: header,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data[0]["donations"]);
          setDonationInfo(data[0]["donations"]);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(true);
        });
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
              <Image src={fundraising.image_path} />
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
              <Space
                direction="horizontal"
                style={{ marginTop: "15px", width: "100%" }}
              >
                <HeartOutlined style={{ color: "red" }} />
                <Typography.Text strong>
                  {fundraising.donation_count + " donations"}
                </Typography.Text>
              </Space>
              <Space
                direction="horizontal"
                style={{ marginTop: "15px", width: "100%" }}
              >
                <RiseOutlined style={{ color: "blue" }} />
                <Typography.Text strong>
                  {recentCount + " people recently donated"}
                </Typography.Text>
              </Space>
              {/* <Button
                style={{ marginTop: "20px", marginRight: "10px" }}
                onClick={() => setIsRecentDonationModalVisible(true)}
              >
                See recent donations
              </Button> */}
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
                      onClick={() => {
                        setImagePreviewSrc(donation.receipt?.path)
                        setImagePreviewVisible(true)
                      }}
                    >
                      <Typography.Text
                        // strong
                        // style={{width: "100px"}}
                      >{`Bank: ${donation.accountCompany}`}</Typography.Text>
                      <Typography.Text>{donation.accountName}</Typography.Text>
                      <Space style={{ width: "100%" }}>
                        <div style={{ width: "50px" }}>
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
          <Image
            style={{ display: 'none' }}
            src={imagePreviewSrc}
            preview={{
              visible: imagePreviewVisible,
              src: imagePreviewSrc,
              onVisibleChange: value => {
                setImagePreviewVisible(value);
              },
            }}
          />
          {/* <Modal
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
                      <Space style={{ width: "100%" }}>
                        <div style={{ width: "50px" }}>
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
          </Modal> */}
        </Row>
      )}
    </>
  );
};

export default FoundraisingPage;
