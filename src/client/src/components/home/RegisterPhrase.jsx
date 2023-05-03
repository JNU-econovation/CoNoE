import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import routes from "../../routes.js";

const Container = styled.div`
  margin-top: 1rem;

  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.body};

  strong {
    font-weight: 500;
    color: ${({ theme }) => theme.color.main};
    cursor: pointer;
  }
`;

function RegisterPhrase() {
  const navigate = useNavigate();
  return (
    <Container>
      계정이 없으신가요?{" "}
      <strong onClick={() => navigate(routes.register)}>회원가입</strong>
    </Container>
  );
}

export default RegisterPhrase;
