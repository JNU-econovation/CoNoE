import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import Header from "./Header.jsx";
import PageTitle from "../PageTitle.jsx";
import Footer from "./Footer.jsx";

const Container = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;

  background: linear-gradient(115.4deg, #ffffff 5%, #c7d5e0 150%);

  .header {
    position: absolute;
    z-index: 1000;
  }
`;

const Main = styled.main`
  width: 100vw;
  min-height: calc(100vh - 200px);
  padding: 4rem 0;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ flexStart }) =>
    flexStart &&
    css`
      justify-content: flex-start;
    `}
`;

function Layout({ title, isLoggedIn, flexStart, children }) {
  return (
    <>
      <PageTitle title={title} />
      <Container>
        <Header className="header" isLoggedIn={isLoggedIn} />
        <Main flexStart={flexStart}>{children}</Main>
        <Footer />
      </Container>
    </>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  flexStart: PropTypes.bool,
  children: PropTypes.node,
};

Layout.defaultProps = {
  title: "",
  isLoggedIn: true,
  flexStart: false,
  children: null,
};

export default Layout;
