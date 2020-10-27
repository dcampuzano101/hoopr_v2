import React from "react";
import styled from "styled-components";
import theme from "../theme.js";

const { heading } = theme.text;

const HeaderEl = styled.header`
  padding: 1.5rem;
  ${"" /* grid-column: 1 / 6; */}
  background-color: ${theme.palette.primary.main};
  box-shadow: 0 8px 6px -5px rgba(0, 0, 0, 0.34);
  margin-bottom: 1rem;
`;

const Logo = styled.h1`
  font-size: ${heading.size};
  text-align: left;
  line-height: ${heading.lineHeight};
  text-transform: ${heading.transform};
  opacity: ${heading.opacity};
  letter-spacing: ${heading.spacing};
  color: ${heading.color};
  font-family: ${heading.font};
  font-weight: ${heading.weight};
`;

const Header = () => {
  return (
    <>
      <HeaderEl>
        <Logo>Hoopr</Logo>
      </HeaderEl>
    </>
  );
};

export default Header;
