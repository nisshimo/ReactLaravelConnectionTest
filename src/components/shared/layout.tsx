import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import * as H from "history";
import { Flex } from "./flex";
import {
  Breadcrumb,
  Button,
  Layout as AntdLayout,
  Menu,
  MenuProps,
} from "antd";
import {
  HomeOutlined,
  NotificationOutlined,
  UserOutlined,
  FireTwoTone,
  GoldOutlined,
} from "@ant-design/icons";
import { useQuery } from "utils/hooks";
import { GlobalStateContext } from "contexts/global_state_context";
import { ThemeContext } from "contexts/theme_context";

const { Header, Content, Sider } = AntdLayout;

type MenuItem = Required<MenuProps>["items"][number];

type LayoutProps = {
  children?: ReactNode;
  history: H.History;
};
const Layout = (props: LayoutProps): JSX.Element => {
  const globalState = useContext(GlobalStateContext);
  const theme = useContext(ThemeContext);
  const location = useLocation();
  const location2menuKey = (location: H.Location) => [
    location.pathname.split("/").slice(0, 2).join("/"),
  ];
  const items1: MenuItem[] = [
    {
      key: "/users",
      label: "ユーザー",
      icon: <UserOutlined />,
      onClick: () => {
        props.history.push("/users");
      },
    },
    {
      key: "/orders",
      label: "受注",
      icon: <HomeOutlined />,
      onClick: () => {
        props.history.push("/orders");
      },
    },
    {
      key: "/dispatch_cars",
      label: "配車",
      icon: <UserOutlined />,
      onClick: () => {
        props.history.push("/dispatch_cars");
      },
    },
    // {
    //   key: "/instructions",
    //   label: "運行指示",
    //   icon: <NotificationOutlined />,
    //   onClick: () => {
    //     props.history.push("/instructions");
    //   },
    // },
    // {
    //   key: "/manuals",
    //   label: "手順書",
    //   icon: <GoldOutlined />,
    //   onClick: () => {
    //     props.history.push("/manuals");
    //   },
    // },
  ];

  return (
    <AntdLayout style={{ width: "100vw", height: "100%" }}>
      <Sider
        theme="light"
        // collapsible
        onCollapse={() => globalState.setCollapsed(!globalState.collapsed)}
        width={200}
        className="site-layout-background"
        collapsed={globalState.collapsed}
        style={{ border: "1px solid", borderColor: theme.border }}
      >
        <Flex style={{ padding: 20 }} alignItems="center">
          <FireTwoTone
            twoToneColor="#f66"
            style={{
              marginLeft: globalState.collapsed ? 10 : 0,
              fontSize: 30,
              alignItems: "center",
              transition: "all 0.19s",
            }}
          />
          {!globalState.collapsed && (
            <div
              style={{
                marginLeft: 10,
                width: 200,
                fontWeight: 500,
              }}
            >
              Knewit
            </div>
          )}
        </Flex>
        <Menu
          selectedKeys={location2menuKey(location)}
          mode="inline"
          theme="light"
          // style={{ height: "100%", borderRight: 0 }}
          items={items1}
        />
      </Sider>
      <AntdLayout style={{ height: "100%" }}>
        <Flex flexDirection="column">
          <Content
            className="site-layout-background"
            style={{
              height: "100vh",
              width: globalState.collapsed
                ? globalState.dimension.width - 80
                : globalState.dimension.width - 200,
              overflowX: "scroll",
              transition: "all 0.2s",
              backgroundColor: theme.white,
            }}
          >
            {props.children}
          </Content>
        </Flex>
      </AntdLayout>
    </AntdLayout>
  );
};

export default withRouter(Layout);
