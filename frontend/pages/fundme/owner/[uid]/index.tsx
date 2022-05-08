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
  import { TagOutlined, UserOutlined, HeartOutlined } from "@ant-design/icons";
  import type { NextPage } from "next";
  import { useRouter } from "next/router";
  
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
  
  const FoundraisingPage: NextPage = () => {
    const router = useRouter();
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
            <Card style={{marginTop: "50px", marginLeft: "15px"}}>
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
              <Button
                type="primary"
                block
                style={{ marginTop: "15px", height: "50px", fontSize: "20px" }}
                onClick={() => router.push(router.asPath+"/donate")}
              >
                Donate
              </Button>
              <Space direction="horizontal" style={{ marginTop: "15px", width:"100%" }}>
                <HeartOutlined style={{ color: "red" }} />
                <Typography.Text strong>
                  {totalDonation + " donations"}
                </Typography.Text>
              </Space>
              <Button style={{marginTop:"10px"}}>
                See all donations
              </Button>
            </Card>
          </Col>
        </Row>
      </>
    );
  };
  
  export default FoundraisingPage;
  