import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  display: flex;
  height: 5rem;
  align-items: center;
  background: #1A202C;
  justify-content: space-between;
  padding: 1rem;
`;

export const NavegationBar = styled.nav`
  margin-right: 4rem;
  ul {
    display: flex;
    gap: 1.5rem;
  }
  a {
    color: #ff7100;
    text-decoration: none;
    transition: 0.2s;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    &:hover {
      color: rgba(255, 255, 255, 0.5);
      opacity: 0.6;
    }
  }
`;
