import styled from "styled-components";
import bg from "../../assets/backgrond.jpg"

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${bg});
  background-size: cover; 
  background-position: center; 
`;

export const ContainerCenter = styled.form`
  min-width: 20.875rem;
  background-color: rgb(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 1rem;
  margin: auto 0;
  gap: 0.5rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;
export const Center = styled.div`
display: flex;
flex-direction: column;
`;