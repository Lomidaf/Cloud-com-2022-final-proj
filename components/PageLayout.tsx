import { Menu, Layout } from "antd";
import type { ReactElement } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import AuthStore from "../mobx/AuthStore";
import { observer } from "mobx-react-lite";
import LoadingSpinner from "./LoadingSpinner";

const { Header, Content, Footer } = Layout;

type PageLayoutProps = {
  children: ReactElement;
};

const routeToKey: { [key: string]: string } = {
  "/login": "login",
  "/register": "register",
};

const PageLayout = ({ children }: PageLayoutProps) => {
  const router = useRouter();
  return (
    <Layout>
      <Header>
        <div
          style={{
            float: "left",
            width: "120px",
            height: "31px",
            margin: "16px 24px 16px 0",
            background: "blue",
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[routeToKey[router.asPath]]}
        >
          {!AuthStore.isLoading && (
            <Menu.Item key="discover">
              <span
                onClick={() => {
                  router.push("/fundme/");
                }}
              >
                Discover
              </span>
            </Menu.Item>
          )}
          {!AuthStore.isLoading &&
            (AuthStore.isLogin ? (
              <>
                <Menu.Item key="create fundme">
                  <span onClick={() => router.push("/fundme/create")}>
                    Create Fundme
                  </span>
                </Menu.Item>
                <Menu.Item key="my fundme" style={{ marginLeft: "auto" }}>
                  <span onClick={() => router.push("/fundme/owner")}>
                    My Fundme
                  </span>
                </Menu.Item>
                <Menu.Item
                  key="logout"
                  // style={{ marginLeft: "auto" }}
                >
                  <span onClick={() => AuthStore.logout()}>Logout</span>
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
