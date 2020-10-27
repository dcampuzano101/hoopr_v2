import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="main"></div>
      <Footer />
    </Router>
  );
};

export default App;
