import React from "react";
import styled from "styled-components";
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

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Layout({ title, isLoggedIn, children }) {
  return (
    <>
      <PageTitle title={title} />
      <Container>
        <Header className="header" isLoggedIn={isLoggedIn} />
        <Main>{children}</Main>
        <Footer />
      </Container>
    </>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  children: PropTypes.node,
};

Layout.defaultProps = {
  title: "",
  isLoggedIn: true,
  children: null,
};

export default Layout;
