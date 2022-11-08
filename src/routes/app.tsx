import React from "react";
import { Route, Switch } from "react-router-dom";
import UserAuth from "../containers/user_auth";
import LoginPage from "components/login/login_page";
import Error404Page from "../components/shared/error_404";
import MasterDataContainer from "containers/master_data_container";
import Layout from "components/shared/layout";
import UsersPage from "components/users/users_page";
import UserPage from "components/users/user_page";
import * as H from "history";

export type Props = {
  history: H.History;
};

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      {/* <Route exact path={AppRouteHelper.root()}>
        <LoginPage />
      </Route> */}
      {/* <Route exact path={AppRouteHelper.login()}>
        <LoginPage />
      </Route> */}
      <Route path={"/"}>
        {/* <UserAuth> */}
        <MasterDataContainer>
          <Layout>
            <Switch>
              <Route exact path={AppRouteHelper.root()}>
                <UsersPage />
              </Route>
              <Route exact path={AppRouteHelper.users()}>
                <UsersPage />
              </Route>
              <Route exact path={AppRouteHelper.user()}>
                <UserPage />
              </Route>

              <Route>
                <Error404Page />
              </Route>
            </Switch>
          </Layout>
        </MasterDataContainer>
        {/* </UserAuth> */}
      </Route>
    </Switch>
  );
};

export default AppRoutes;

/**
 * ルート定義
 */
export class AppRouteHelper {
  static basePath = (path: string): string => `/${path}`;

  public static root = (): string => "/";
  // ログイン
  public static login = (): string => AppRouteHelper.basePath("login");
  public static users = (): string => AppRouteHelper.basePath("users");
  public static user = (): string => AppRouteHelper.basePath("users/:id");

  public static dashboards = (): string =>
    AppRouteHelper.basePath("dashboards");
}
