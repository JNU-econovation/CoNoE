import styled from "styled-components";

const StyledLogo = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.logo};
  font-size: ${({ theme }) => theme.fontSize.logo};
  color: ${({ theme }) => theme.color.main};
`;

function Logo() {
  return <StyledLogo>Auttend</StyledLogo>;
}

export default Logo;
