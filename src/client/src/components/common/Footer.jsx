import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 90px;
  padding: 20px 50px;
  background-color: ${({ theme }) => theme.color.white};

  color: ${({ theme }) => theme.color.inactive};
  font-size: 0.85rem;

  #link-list {
    margin-bottom: 5px;
  }

  #link-list > a {
    cursor: pointer;
  }
`;

function Footer() {
  return (
    <Container>
      <div id="link-list">
        <a
          onClick={() => {
            window.open("https://github.com/JNU-econovation/CoNoE", "_blank");
          }}
        >
          GitHub
        </a>{" "}
        |{" "}
        <a
          onClick={() => {
            window.open("mailto:joowoni99@gmail.com", "_blank");
          }}
        >
          Email
        </a>
      </div>
      <div id="copyright">Copyright © 2023 JNU CoNoE All rights reserved.</div>
    </Container>
  );
}

export default Footer;
