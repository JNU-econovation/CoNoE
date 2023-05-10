import styled from "styled-components";

const StyledH3 = styled.h3`
  width: 100%;
  margin-bottom: 2rem;
  text-align: left;
  font-weight: 700;
  font-size: 2rem;
  color: ${({ theme }) => theme.color.body};
`;

export default StyledH3;
