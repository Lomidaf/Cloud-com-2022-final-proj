import { Menu, Layout, Dropdown, Typography, Space } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import AuthStore from "../mobx/AuthStore";
import { observer } from "mobx-react-lite";
import LoadingSpinner from "./LoadingSpinner";
import moment from "moment";

const { Header, Content, Footer } = Layout;

type PageLayoutProps = {
  children: ReactElement;
};

const routeToKey: { [key: string]: string } = {
  "/login": "login",
  "/register": "register",
};

const donationNotification = [
  {
    fundrasingUid: "1",
    fundrasingName: "Anya",
    donator: "Dee",
    amount: "100",
  },
  {
    fundrasingUid: "2",
    fundrasingName: "Anya",
    donator: "Dee",
    amount: "100",
  },
  {
    fundrasingUid: "3",
    fundrasingName: "Anya",
    donator: "Dee",
    amount: "100",
  },
  {
    fundrasingUid: "4",
    fundrasingName: "Anya",
    donator: "Dee",
    amount: "100",
  },
  {
    fundrasingUid: "5",
    fundrasingName: "Anya",
    donator: "Dee",
    amount: "100",
  },
  {
    fundrasingUid: "6",
    fundrasingName: "Anya",
    donator: "Dee",
    amount: "100",
  },
];

const PageLayout = ({ children }: PageLayoutProps) => {
  const router = useRouter();
  const [notificationItems, setNotificationItems] = useState([]);

  useEffect(() => {
    AuthStore.user?.getIdToken().then((token) => {
      if (token) {
        fetch(
          (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000") +
            `/api/user/notification`,
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const notifications = data["notifications"].filter(
              (noti: any) => noti["isRead"] == false
            );
            for (let i = 0; i < notifications.length; i++) {
              moment.utc;
              notifications[i]["createdAt"] = moment(
                notifications[i]["createdAt"]
              )
                .utcOffset(+7)
                .format("dddd, MMMM Do YYYY, h:mm:ss a");
            }
            setNotificationItems(notifications);
            // console.log(notifications);
          })
          .catch((err) => {
            console.log(err);
            console.log("ERROR FETCH NOTIFICATION");
          });
      }
    });
  }, [AuthStore.user]);

  const notificationMenu = (
    <Menu style={{ maxHeight: "200px", overflowY: "scroll" }}>
      {notificationItems.map((item) => {
        return (
          <Menu.Item key={item.id}>
            <Space direction="vertical">
              {/* <Typography.Text>{item.fundrasingName}</Typography.Text> */}
              <Space direction="horizontal" size={0}>
                <Typography.Text
                  strong
                >{`${item.description} Received`}</Typography.Text>
                {/* <Typography.Text strong>{` ฿${item.amount}`}</Typography.Text> */}
              </Space>
              <Typography.Text style={{ marginRight: "5px" }}>
                {`at ${item.createdAt}`}
              </Typography.Text>
            </Space>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const readNotification = () => {
    AuthStore.user?.getIdToken().then((token) => {
      fetch(
        (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000") +
          `/api/notification/read-all`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json)
        .then((data) => {
          console.log("Read All notification");
        })
        .catch((err) => {
          console.log("Read notification fail");
        });
    });
  };

  return (
    <Layout>
      <Header>
        {/* <div
          style={{
            float: "left",
            width: "120px",
            height: "31px",
            margin: "16px 24px 16px 0",
            background: "blue",
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        /> */}
        <img
          style={{
            float: "left",
            width: "120px",
            height: "50px",
            margin: "6px 24px 6px 0",
            background: "blue",
            cursor: "pointer",
          }}
          src="/logo.png"
          onClick={() => router.push("/")}
          // onClick={() =>
          //   AuthStore.user?.getIdToken().then((token) => console.log(token))
          // }
        />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[routeToKey[router.asPath]]}
        >
          {!AuthStore.isLoading && (
            <Menu.Item
              key="discover"
              onClick={() => {
                router.push("/fundme/");
              }}
            >
              <span>Discover</span>
            </Menu.Item>
          )}
          {!AuthStore.isLoading &&
            (AuthStore.isLogin ? (
              <>
                <Menu.Item
                  key="create fundme"
                  onClick={() => router.push("/fundme/create")}
                >
                  <span>Create Fundme</span>
                </Menu.Item>
                <Menu.Item key="notification" style={{ marginLeft: "auto" }}>
                  <Dropdown
                    disabled={notificationItems.length <= 0}
                    overlay={notificationMenu}
                    arrow={{ pointAtCenter: true }}
                    placement="bottomLeft"
                    trigger={["click"]}
                    onClick={() => readNotification()}
                    // arrow
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <BellOutlined
                        style={{ fontSize: "16px", height: "100%" }}
                      />
                    </a>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item
                  key="my fundme"
                  onClick={() => router.push("/fundme/owner")}
                >
                  <span>My Fundme</span>
                </Menu.Item>
                <Menu.Item
                  key="logout"
                  // style={{ marginLeft: "auto" }}
                  onClick={() => {
                    AuthStore.logout();
                    router.push("/");
                  }}
                >
                  <span>Logout</span>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="register" style={{ marginLeft: "auto" }}>
                  <span onClick={() => router.push("/register")}>Register</span>
                </Menu.Item>
                <Menu.Item key="login">
                  <span onClick={() => router.push("/login")}>Login</span>
                </Menu.Item>
              </>
            ))}
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        {AuthStore.isLoading ? <LoadingSpinner /> : children}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        This is Final cloud computer term-project@2022
      </Footer>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(observer(PageLayout)), {
  ssr: false,
});
