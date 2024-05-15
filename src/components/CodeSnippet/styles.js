import styled, { css } from "styled-components";

export const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 1.875rem;
  height: 1.25rem;
`;

export const Content = styled.div`
  width: 100%;
  border-radius: 0.25rem;
  border: 1px solid #000;
  margin-bottom: 2rem;

  &::-webkit-scrollbar {
    width: 0.875rem;
    background: #000;
    border-radius: 0.625rem;
    border: 0.3125rem solid #000;
  }

  &::-webkit-scrollbar-button {
    height: 0.25rem;
    z-index: 100;
  }

  &::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 0.375rem;
    border-right: 0.3125rem solid #000;
    border-left: 0.3125rem solid #000;
  }
`;
