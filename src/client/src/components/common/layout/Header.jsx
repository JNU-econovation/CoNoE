import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import Logo from "../Logo.jsx";
import routes from "../../../routes.js";

const Container = styled.header`
  width: 100%;
  height: 100px;
  padding: 25px 45px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.color.white};

  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.03);
`;

const MenuList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.div`
  margin-right: 60px;

  font-size: ${({ theme }) => theme.fontSize.subtitle};
  font-weight: 500;
  color: ${({ theme }) => theme.color.subtitle};

  cursor: pointer;
`;

const Welcome = styled.div`
  color: ${({ theme }) => theme.color.addition};

  strong {
    font-weight: 500;
    color: ${({ theme }) => theme.color.main};
    cursor: pointer;
  }

  strong:hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`;

function Header({ isLoggedIn }) {
  const navigate = useNavigate();
  return (
    <Container>
      <Logo />
      {isLoggedIn && (
        <MenuList>
          <Menu
            onClick={() => {
              navigate(routes.createRoom);
            }}
          >
            방 만들기
          </Menu>
          <Menu
            onClick={() => {
              navigate(routes.myRoom);
            }}
          >
            나의 방
          </Menu>
          <Welcome>
            환영합니다,{" "}
            <strong
              onClick={() => {
                navigate(routes.myPage);
              }}
            >
              경주원
            </strong>{" "}
            님!
          </Welcome>
        </MenuList>
      )}
    </Container>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
