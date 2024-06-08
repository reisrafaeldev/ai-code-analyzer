import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 2rem 0;
  padding: 0 3rem;

  @media (max-width: 1200px) {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 2rem;
    > img {
      width: 45%;
    }
  }
`;
export const ContainerCenter = styled.div`
  flex: 1;
  margin: 1rem;
  border-radius: 0.2rem;
  background-color: #1a202c;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h2 {
    margin: 1rem 0 2rem;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  p {
    text-align: justify;
    line-height: 18px;
    max-width: 70%;
  }
  h3{
   position: absolute;
   bottom: 3rem;
  }
`;

export const Center = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
`;

export const ContainerTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
