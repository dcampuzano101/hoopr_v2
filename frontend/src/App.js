import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import StickyFooter from "./components/StickyFooter";
import { Container } from "@material-ui/core";

const App = () => {
  return (
    <Router>
      <header>
        <h1 contenteditable>Header.com</h1>
      </header>
      <div class="left-sidebar" contenteditable>
        .
      </div>
      <main contenteditable></main>
      <div class="right-sidebar" contenteditable>
        .
      </div>
      <footer contenteditable>Footer Content — Header.com 2020</footer>
    </Router>
  );
};

export default App;
