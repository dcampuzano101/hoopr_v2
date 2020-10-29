import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";
import theme from "./theme.js";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./screens/MainScreen";
import Oauth from "./components/Oauth";

const Main = styled.div`
  background: ${theme.palette.primary.light};
  ${"" /* grid-column: 1 / 3; */}
  max-width: 1300px;
  display: grid;
  ${"" /* place-items: center; */}
  width: 100%;
  margin: 0 auto;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.34);
`;

const App = () => {
  return (
    <Router>
      <Header />
      <Main>
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/oauth/callback" component={Oauth} />
        <Route path="/" component={MainScreen} exact />
      </Main>
      <Footer />
    </Router>
  );
};

export default App;
