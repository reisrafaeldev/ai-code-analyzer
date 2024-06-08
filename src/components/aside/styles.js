import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  display: flex;
  height: 5rem;
  align-items: center;
  background: #1a202c;
  justify-content: flex-start;
  padding: 1rem;
`;

export const Img = styled.img`
  object-fit: contain;
  width: ${(props) => props.width};
`;

export const Image = styled.img``;

export const Aside = styled.aside`
  height: 100%;
  width: 13.625rem;
  background: #1a202c;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
`;
export const SelectContainer = styled.div`
  width: 100%;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  label {
    color: #fff;
    font-size: 0.75rem;
  }
`;
export const BottonContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

export const Separator = styled.hr`
  background-color: #e53d00;
  border: none;
  height: 2px;
`;
export const ContainerGrafics = styled.div`
  display: flex;
  width: 12.625rem;
  align-items: center;
  flex-direction: column;
  padding-right: 1rem;
  justify-content: flex-start;
  gap: 1rem;
  flex: 1;
  margin-top: 1rem;

  div {
    width: 100%;
    border-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
