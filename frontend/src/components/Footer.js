import React from "react";
import styled from "styled-components";
import theme from "../theme.js";

const { subText } = theme.text;

const FooterEl = styled.header`
  padding: 2rem;
  grid-column: 1 / 4;
  background-color: ${theme.palette.primary.main};
`;

const Copyright = styled.h3`
  font-size: 1.2em;
  text-align: center;
  color: black;
  font-family: ${subText.font};
`;

const Footer = () => {
  return (
    <FooterEl>
      <Copyright>Copyright &copy; Hoopr 2020</Copyright>
    </FooterEl>
  );
};

export default Footer;
