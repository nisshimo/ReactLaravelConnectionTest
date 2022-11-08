import { Card, Descriptions, List, Space } from "antd";
import { useFetchUserApi, useFetchUsersApi } from "api/user";
import { ContentBlock } from "components/shared/content_block";
import { GlobalStateContext } from "contexts/global_state_context";
import { User } from "entities/user";
import { useContext, useEffect, useState } from "react";
import { useParams, withRouter } from "react-router";
import { Props } from "routes/app";
import { useEffectSkipFirst } from "utils/hooks";

const UserPage = (props: Props) => {
  const userApi = useFetchUserApi();
  const globalState = useContext(GlobalStateContext);
  const params = useParams<{ id: string }>();
  useEffect(() => {
    userApi.execute(Number(params.id)); // list Api
  }, []);

  useEffectSkipFirst(() => {
    globalState.setLoading(userApi.loading);
    if (userApi.isSuccess()) {
      console.log(userApi.response);
    }
  }, [userApi.loading]);

  return (
    <ContentBlock
      title={"ユーザー詳細"}
      pageHeaderProps={{ onBack: () => props.history.push("/users") }}
    >
      <Descriptions
        bordered
        column={1}
        labelStyle={{ width: 200 }}
        style={{ width: 500 }}
      >
        <Descriptions.Item label="ID">
          {userApi.response.user.id}
        </Descriptions.Item>
        <Descriptions.Item label="User Name">
          {userApi.response.user.username}
        </Descriptions.Item>
      </Descriptions>
    </ContentBlock>
  );
};

export default withRouter(UserPage);
