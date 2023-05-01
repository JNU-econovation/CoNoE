import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import routes from "../../routes.js";

const StyledLogo = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.logo};
  font-size: ${({ theme }) => theme.fontSize.logo};
  color: ${({ theme }) => theme.color.main};
  cursor: pointer;
`;

function Logo() {
  const navigate = useNavigate();
  return (
    <StyledLogo
      onClick={() => {
        navigate(routes.home);
      }}
    >
      Auttend
    </StyledLogo>
  );
}

export default Logo;
