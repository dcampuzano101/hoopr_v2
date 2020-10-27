import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";
import theme from "./theme.js";

const Main = styled.div`
  background: ${theme.palette.primary.light};
  grid-column: 1 / 3;
  max-width: 1300px;
  display: grid;
  place-items: center;
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
        {/* <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} /> */}
      </Main>
      <Footer />
    </Router>
  );
};

export default App;
