import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import * as H from "history";
import { CookieManager } from "utils/cookie_manager";
import { GlobalStateContext } from "contexts/global_state_context";
import { Flex } from "components/shared/flex";
import Logo from "components/../../public/logo_h.png";
import Ornament1 from "components/../../public/ornament1.png";
import Ornament2 from "components/../../public/ornament2.png";
import { AuthorizationForm, useAuthorizationApi } from "api/authorization";
import { useForm } from "utils/hooks";
import { InputField } from "components/shared/input";
import { ThemeContext } from "contexts/theme_context";
import { Button, Divider, Image, Space } from "antd";
import { CustomInputField } from "specifics/input";
import { CustomButton } from "specifics/button";

type Props = {
  history: H.History;
};

const LoginPage = ({ history }: Props) => {
  const apiSet = useAuthorizationApi();
  const globalState = useContext(GlobalStateContext);
  const theme = useContext(ThemeContext);
  const form = useForm<AuthorizationForm>({ username: "", password: "" });
  const isHomeTest = !!process.env.REACT_APP_IS_HOME_TEST;

  useEffect(() => {
    globalState.setLoading(apiSet.loading);
  }, [apiSet.loading]);

  useEffect(() => {
    if (apiSet.response.token) {
      CookieManager.saveUserToken(apiSet.response.token);
      globalState.setLoading(false);
      history.push("/dashboards");
    }
  }, [apiSet.response.token]);

  useEffect(() => {
    globalState.setError(apiSet.apiError);
  }, [apiSet.apiError]);

  const handleClickLoginButton = () => {
    apiSet.execute(form);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      style={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          backgroundColor: theme.white,
          width: 448,
          padding: "32px 40px 32px 40px",
          zIndex: 1,
          boxShadow: "0 0.5mm 0.5mm rgba(0, 0, 0, 0.3)",
          borderRadius: 6,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Image
            preview={false}
            width={180}
            height={40}
            src="https://knewitjp.github.io/knewit_corporate/img/knewit_logo_wide_regular.png"
          />
        </div>

        <CustomInputField
          label="携帯電話番号"
          placeholder="080-1234-5678"
          attr="username"
          form={form}
        />
        <CustomInputField
          label="パスワード"
          placeholder="パスワード"
          attr="password"
          form={form}
          type="password"
          style={{ marginBottom: 0 }}
        />
        <CustomButton
          style={{
            marginTop: 24,
            width: "100%",
            backgroundColor: theme.primary,
            border: theme.primary,
          }}
          type="primary"
          onClick={() => {
            handleClickLoginButton();
          }}
        >
          ログイン
        </CustomButton>
        <CustomButton
          style={{
            marginTop: 24,
            width: "100%",
            color: theme.text,
            backgroundColor: theme.white,
            border: theme.primary,
          }}
          type="primary"
          onClick={() => {
            handleClickLoginButton();
          }}
        >
          パスワードを忘れた場合
        </CustomButton>

        <Divider plain>アカウントをお持ちでない方</Divider>
        <CustomButton
          style={{
            width: "100%",
            color: theme.primary,
            backgroundColor: theme.secondary,
            border: theme.secondary,
          }}
          type="primary"
          onClick={() => {
            handleClickLoginButton();
          }}
        >
          アカウント登録
        </CustomButton>
      </div>
    </Flex>
  );
};

export default withRouter(LoginPage);
