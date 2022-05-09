import { Card, Col, Progress, Row, Space, Typography } from "antd";
import { RiseOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const fundraisingItems = [
  {
    fundraisingSrc:
      "https://static.lag.vn/upload/news/22/04/07/spy-x-family-anya-forger-la-ai-1_UMOI.jpg?w=800&encoder=wic&subsampling=444",
    fundraisingTitle: "Anya 1",
    fundraisingDescription:
      "HELLO THE THIS IS TEMP DESCRIPTION FOR MOCKING DONT YOU CARE ABOUT THIS",
    fundraisingRaise: 100,
    fundraisingGoal: 180,
    fundraisingUid: "1",
    fundraisingRecentDonateCount: 0,
  },
  {
    fundraisingSrc:
      "https://static.lag.vn/upload/news/22/04/07/spy-x-family-anya-forger-la-ai-1_UMOI.jpg?w=800&encoder=wic&subsampling=444",
    fundraisingTitle: "Anya 2",
    fundraisingDescription:
      "HELLO THE THIS IS TEMP DESCRIPTION FOR MOCKING DONT YOU CARE ABOUT THIS",
    fundraisingRaise: 120,
    fundraisingGoal: 180,
    fundraisingUid: "2",
    fundraisingRecentDonateCount: 2,
  },
  {
    fundraisingSrc:
      "https://static.lag.vn/upload/news/22/04/07/spy-x-family-anya-forger-la-ai-1_UMOI.jpg?w=800&encoder=wic&subsampling=444",
    fundraisingTitle: "Anya 3",
    fundraisingDescription:
      "HELLO THE THIS IS TEMP DESCRIPTION FOR MOCKING DONT YOU CARE ABOUT THIS",
    fundraisingRaise: 100,
    fundraisingGoal: 400,
    fundraisingUid: "3",
    fundraisingRecentDonateCount: 3,
  },
  {
    fundraisingSrc:
      "https://static.lag.vn/upload/news/22/04/07/spy-x-family-anya-forger-la-ai-1_UMOI.jpg?w=800&encoder=wic&subsampling=444",
    fundraisingTitle: "Anya 4",
    fundraisingDescription:
      "HELLO THE THIS IS TEMP DESCRIPTION FOR MOCKING DONT YOU CARE ABOUT THIS",
    fundraisingRaise: 500,
    fundraisingGoal: 180,
    fundraisingUid: "4",
    fundraisingRecentDonateCount: 1,
  },
];

const FoundraisingOwnerPage: NextPage = () => {
  const router = useRouter();
  const rowSize = 3;
  return (
    <Row
      justify="center"
      style={{ padding: "50px 0 0 0", marginBottom: "20px" }}
    >
      <Col span={20}>
        <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
          Your Fundraising
        </Typography.Title>
        {Array.from(
          Array(Math.ceil(fundraisingItems.length / rowSize)).keys()
        ).map((chunkIndex) => {
          return (
            <Space>
              {fundraisingItems
                .slice(chunkIndex * rowSize, (chunkIndex + 1) * rowSize)
                .map((item) => {
                  return (
                    <Card
                      hoverable
                      style={{
                        width: "350px",
                        height: "410px",
                        marginLeft: "15px",
                        marginTop: chunkIndex == 0 ? "0px" : "30px",
                      }}
                      onClick={() =>
                        router.push(`owner/${item.fundraisingUid}`)
                      }
                      cover={
                        <img
                          alt="fundraising"
                          src={item.fundraisingSrc}
                          style={{
                            width: "350px",
                            height: "194.4px",
                          }}
                        />
                      }
                    >
                      <Card.Meta title={item.fundraisingTitle} />
                      <Typography.Paragraph
                        ellipsis={{
                          rows: 2,
                          expandable: false,
                          symbol: "more",
                        }}
                        style={{
                          color: "rgba(0, 0, 0, 0.45)",
                          marginTop: "10px",
                        }}
                      >
                        {item.fundraisingDescription}
                      </Typography.Paragraph>
                        <Space
                          direction="horizontal"
                          style={{
                            marginTop: "0px",
                            width: "100%",
                            height: "25px",
                          }}
                        >
                          {item.fundraisingRecentDonateCount > 0 && (<>
                          <RiseOutlined style={{ color: "blue" }} />
                          <Typography.Text strong>
                            {item.fundraisingRecentDonateCount +
                              " people recently donated"}
                          </Typography.Text>
                          </>
                          )}
                        </Space>
                      <Progress
                        percent={Math.floor(
                          (item.fundraisingRaise / item.fundraisingGoal) * 100
                        )}
                        showInfo={false}
                        style={{ marginTop: "10px" }}
                      />
                      <Typography.Text strong style={{ fontSize: "18px" }}>
                        {"฿" + item.fundraisingRaise + " raised"}
                      </Typography.Text>
                      <Typography.Text style={{ marginLeft: "0px" }}>
                        {" of ฿" + item.fundraisingGoal + " goal"}
                      </Typography.Text>
                    </Card>
                  );
                })}
            </Space>
          );
        })}
      </Col>
    </Row>
  );
};

export default FoundraisingOwnerPage;
