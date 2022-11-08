import { Card, List, PageHeader, Space } from "antd";
import { useFetchUsersApi } from "api/user";
import { ContentBlock } from "components/shared/content_block";
import { GlobalStateContext } from "contexts/global_state_context";
import { User } from "entities/user";
import { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Props } from "routes/app";
import { useEffectSkipFirst } from "utils/hooks";

const UsersPage = (props: Props) => {
  const usersApi = useFetchUsersApi();
  const globalState = useContext(GlobalStateContext);
  useEffect(() => {
    usersApi.execute(); // list Api
  }, []);

  useEffectSkipFirst(() => {
    globalState.setLoading(usersApi.loading);
    if (usersApi.isSuccess()) {
      console.log(usersApi.response);
    }
  }, [usersApi.loading]);

  return (
    <>
      <ContentBlock title={"ユーザー一覧"}>
        <List
          dataSource={usersApi.response.results}
          renderItem={(item) => {
            return (
              <div onClick={() => props.history.push(`/users/${item.id}`)}>
                {UserListView(item)}
              </div>
            );
          }}
        />
      </ContentBlock>
    </>
  );
};

export default withRouter(UsersPage);

const UserListView = (user: User) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <Card
      style={{
        backgroundColor: isHover ? "#fafafa" : "#fff",
      }}
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Space>
          <div>#{user.id}</div>
          <div>{user.username}</div>
        </Space>
      </div>
    </Card>
  );
};
