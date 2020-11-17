import React from "react";
import styled from "styled-components";

const FooterEl = styled.footer`
  padding: 2rem;
  margin-top: 1rem;
`;

const Copyright = styled.h3`
  font-size: 1.2em;
  text-align: center;
  color: black;
`;

const Footer = () => {
  return (
    <FooterEl>
      <Copyright>Copyright &copy; Hoopr 2020</Copyright>
    </FooterEl>
  );
};

export default Footer;
