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
 width: 100%;
 margin: 1rem;
 border-radius: 0.2rem;
 background-color: #1A202C;
 box-sizing: border-box;
 padding: 1rem;
 overflow-y: auto;
 h2{
  margin: 1rem 0 2rem ;
 }
`;


export const Center = styled.div`
display: flex;
width: 100%;
flex: 1;
justify-content: flex-start;

`

export const Overflow = styled.div`
    display: flex;
    flex: 1;
    border-radius: 2px;
    overflow-y: auto;
    box-sizing: border-box;
    justify-content: space-between;
    height: 100%;
    max-height: calc(100vh - 13rem);
    position: relative;
    
    div{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      gap: 1rem;
      div{
        margin:auto;
        h2{
          text-align: center;
        }
      }

    }

    &::-webkit-scrollbar {
      width: 0.5rem;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 6.25rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #E53D00;
      border-radius: 6.25rem;
    }
`;
export const ContainerTitle = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
`