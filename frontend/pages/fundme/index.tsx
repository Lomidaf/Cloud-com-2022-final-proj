import { Card, Col, Progress, Row, Space, Typography } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthStore from "../../mobx/AuthStore";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useWindowSize } from "../../utils/react";

// const fundraisingSrc =
//   "https://static.lag.vn/upload/news/22/04/07/spy-x-family-anya-forger-la-ai-1_UMOI.jpg?w=800&encoder=wic&subsampling=444";
// const fundraisingItems = [
//   {
//     fundraisingSrc:
//       "https://static.lag.vn/upload/news/22/04/07/spy-x-family-anya-forger-la-ai-1_UMOI.jpg?w=800&encoder=wic&subsampling=444",
//     fundraisingTitle: "Anya 1",
//     fundraisingDescription:
//       "HELLO THE THIS IS TEMP DESCRIPTION FOR MOCKING DONT YOU CARE ABOUT THIS",
//     fundraisingRaise: 100,
//     fundraisingGoal: 180,
//     fundraisingUid: "1",
//   },
//   {
//     fundraisingSrc:
//       "https://static.lag.vn/upload/news/22/04/07/spy-x-family-anya-forger-la-ai-1_UMOI.jpg?w=800&encoder=wic&subsampling=444",
//     fundraisingTitle: "Anya 2",
//     fundraisingDescription:
//       "HELLO THE THIS IS TEMP DESCRIPTION FOR MOCKING DONT YOU CARE ABOUT THIS",
//     fundraisingRaise: 120,
//     fundraisingGoal: 180,
//     fundraisingUid: "2",
//   },
//   {
//     fundraisingSrc:
//       "https://static.lag.vn/upload/news/22/04/07/spy-x-family-anya-forger-la-ai-1_UMOI.jpg?w=800&encoder=wic&subsampling=444",
//     fundraisingTitle: "Anya 3",
//     fundraisingDescription:
//       "HELLO THE THIS IS TEMP DESCRIPTION FOR MOCKING DONT YOU CARE ABOUT THIS",
//     fundraisingRaise: 100,
//     fundraisingGoal: 400,
//     fundraisingUid: "3",
//   },
//   {
//     fundraisingSrc:
//       "https://static.lag.vn/upload/news/22/04/07/spy-x-family-anya-forger-la-ai-1_UMOI.jpg?w=800&encoder=wic&subsampling=444",
//     fundraisingTitle: "Anya 4",
//     fundraisingDescription:
//       "HELLO THE THIS IS TEMP DESCRIPTION FOR MOCKING DONT YOU CARE ABOUT THIS",
//     fundraisingRaise: 500,
//     fundraisingGoal: 180,
//     fundraisingUid: "4",
//   },
// ];

const FoundraisingPage: NextPage = () => {
  const router = useRouter();
  const size = useWindowSize();
  const [rowSize, setRowSize] = useState(3);
  const [fundraisingItems, setFundraisingItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      (process.env.NEXT_BACKEND_URL || "http://localhost:8000") +
        "/api/fundraiser",
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setFundraisingItems(data["fundraiser"]);
        setLoading(false);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    const newRowSize = Math.max(1,Math.floor(size.width/400))
    setRowSize(newRowSize)
  }, [size])

  return (
    <Row
      justify="center"
      style={{ padding: "50px 0 0 0", marginBottom: "20px" }}
    >
      <Col span={20}>
        <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
          Discover Fundraising
        </Typography.Title>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Space direction="vertical">
            {Array.from(
              Array(Math.ceil(fundraisingItems.length / rowSize)).keys()
              // Array(Math.ceil(fundraisingItems.length / Math.max(Math.floor(size.width/400),1))).keys()
            ).map((chunkIndex) => {
              return (
                <Space>
                  {fundraisingItems
                    .slice(chunkIndex * rowSize, (chunkIndex + 1) * rowSize)
                    .map((item) => {
                      return (
                        <Card
                          hoverable
                          key={item.fundraiser_id}
                          style={{
                            width: "350px",
                            height: "380px",
                            marginLeft: "15px",
                            marginTop: chunkIndex == 0 ? "0px" : "30px",
                          }}
                          onClick={() =>
                            router.push(`fundme/${item.fundraiser_id}`)
                          }
                          cover={
                            <img
                              alt="fundraising"
                              src={item.image_path}
                              style={{
                                width: "350px",
                                height: "194.4px",
                              }}
                            />
                          }
                        >
                          <Card.Meta title={item.fundraiser_title} />
                          <Typography.Paragraph
                            ellipsis={{
                              rows: 2,
                              expandable: false,
                              symbol: "more",
                            }}
                            style={{
                              height: "44px",
                              color: "rgba(0, 0, 0, 0.45)",
                              marginTop: "10px",
                            }}
                          >
                            {item.fundraiser_description}
                          </Typography.Paragraph>
                          <Progress
                            percent={Math.floor(
                              (item.fundraiser_currentAmount /
                                item.fundraiser_goal) *
                                100
                            )}
                            showInfo={false}
                            style={{ marginTop: "10px" }}
                          />
                          <Typography.Text strong style={{ fontSize: "18px" }}>
                            {"฿" + item.fundraiser_currentAmount + " raised"}
                          </Typography.Text>
                          <Typography.Text style={{ marginLeft: "0px" }}>
                            {" of ฿" + item.fundraiser_goal + " goal"}
                          </Typography.Text>
                        </Card>
                      );
                    })}
                </Space>
              );
            })}
          </Space>
        )}
      </Col>
    </Row>
  );
};

export default FoundraisingPage;
