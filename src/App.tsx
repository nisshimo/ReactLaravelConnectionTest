import { BrowserRouter, Route } from "react-router-dom";
import AppRoutes from "./routes/app";
import GlobalStateContainer from "containers/global_state_container";
import "./App.css";
import "./App.scss";
import ThemeContainer from "containers/theme_container";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import ReactDOM from "react-dom";

const App = (): JSX.Element => {
  return (
    <ThemeContainer>
      <GlobalStateContainer>
        <BrowserRouter>
          <Route component={AppRoutes} />
        </BrowserRouter>
      </GlobalStateContainer>
    </ThemeContainer>
  );
};

export default App;

if (document.getElementById("reactApp")) {
  ReactDOM.render(<App />, document.getElementById("reactApp"));
}
