import styled, { css } from "styled-components";

const buttonStyles = css`

`;

export const Button = styled.button`
  width: ${(props) => props.width || "100%"};
  margin: ${(props) => props.margin};
  height: ${(props) => props.height || "3.0625rem"};
  font-size: 0.8125rem;
  font-weight: bold;
  justify-content: ${(props) => (props.justify ? props.justify : "start")};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 0;
  cursor: pointer;
  border-radius: 0.25rem;
  font-weight: normal;
  color: #e53d00;
  transition: 0.2s;
  background: ${(props) =>
    props.variant === "primary" ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  color: ${(props) =>
    !props.isSelected ? "rgba(255, 255, 255, 1)" : "#E53D00"};

  ${(props) => props.variant === "secondary" && buttonStyles}
  svg {
    color: ${(props) =>
      !props.isSelected ? "rgba(255, 255, 255, 0.5)" : "#E53D00"} !important;
  }
  &:hover {
    svg {
      color: rgba(255, 255, 255, 0.5) !important;
    }

    p {
      color: rgba(255, 255, 255, 0.5) !important;
    }
  }

  svg {
    transition: color 0.2s !important;
  }

  p {
    transition: color 0.2s !important;
  }
`;
