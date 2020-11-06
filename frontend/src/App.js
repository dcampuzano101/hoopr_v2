import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MaterialHeader from "./components/MaterialHeader";
import Footer from "./components/Footer";
import styled from "styled-components";
// import theme from "./theme.js";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileDashboard from "./components/profile/ProfileDashboard";
import MainScreen from "./screens/MainScreen";
import CartScreen from "./screens/CartScreen";
import AdminScreen from "./screens/AdminScreen";
import UserEditScreen from "./screens/UserEditScreen";
import RunEditScreen from "./screens/RunEditScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import Oauth from "./components/Oauth";

import { ThemeProvider } from "@material-ui/core";
import { muiTheme } from "./theme.js";
const Main = styled.div`
  ${"" /* background: #e1e2e1; */}
  max-width: 1300px;
  display: grid;
  width: 100%;
  margin: 0 auto;
  border-radius: 4px;
  ${"" /* border: 1px solid rgba(0, 0, 0, 0.34); */}
`;

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={muiTheme}>
        <MaterialHeader />
        <Main>
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={ProfileDashboard} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/users/:id/edit" component={UserEditScreen} />
          <Route path="/runs/:id/edit" component={RunEditScreen} />
          <Route path="/admin" component={AdminScreen} />
          <Route path="/checkout/:id?" component={CheckoutScreen} />

          <Route path="/oauth/callback" component={Oauth} />
          <Route path="/" component={MainScreen} exact />
          <Route path="/cart/:id?" component={CartScreen} />
        </Main>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
