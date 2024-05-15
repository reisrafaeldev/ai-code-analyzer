import styled from "styled-components";
import bg from "../../assets/backgrond.jpg"

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  overflow-y: hidden;
  background-image: url(${bg});
  background-size: cover; 
  background-position: center; 

`;

export const ContainerLogin = styled.form`
  width: 21.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(0, 0, 0, 0.2);
  border-radius: 0.75rem;
  margin-top: 1.75rem;
  align-items: center;
  padding: 1.5rem;
  a {
    width: 100%;
    text-align: end;
    font-weight: bold;
  }

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const Center = styled.div``;
