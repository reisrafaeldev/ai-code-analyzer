import { IoClose } from "react-icons/io5";
import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .load-wrapper {
    position: absolute;
    z-index: 1000;
    left: calc(50% + 80px);
  }
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
  background-color: #1a202c;
  box-sizing: border-box;
  padding: 1rem;
  overflow-y: auto;
  h2 {
    margin: 1rem 0 2rem;
  }
`;

export const Center = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  justify-content: flex-start;
`;

export const Overflow = styled.div`
  display: flex;
  flex: 1;
  border-radius: 2px;
  gap: 2rem;
  overflow-y: auto;
  box-sizing: border-box;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
  max-height: calc(100vh - 9rem);
  position: relative;
  padding-right: 0.5rem;
  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 6.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e53d00;
    border-radius: 6.25rem;
  }
`;
export const ContainerTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const TabButton = styled.button`
  display: flex;
  font-size: 1rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border-radius: 0.2rem;
  background-color: transparent;
  border: 0;
  height: 2rem;
  min-width: 5rem;
  background: ${(props) =>
    props.selected ? " #e53d00" : "rgba(255, 255, 255, 0.3)"};
  color: #fff;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
export const AddButton = styled.button`
  background-color: transparent;
  border: 0;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.2rem;
`;
export const Tab = styled.div`
  display: flex;
  gap: 0.3rem;
  width: 100%;
  border-bottom: 2px solid #e53d00;
  margin-bottom: 2rem;
  padding: 0.2rem;
`;

export const CloseIcon = styled(IoClose)`
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const ContainerFileButton = styled.div`
  width: fit-content;
  input[type="file"] {
    display: none;
  }

  label {
    padding: 0.6rem 0.625rem;
    width: 12.5rem;
    background-color: rgba(255, 255, 255, 0.3);
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    display: block;
    cursor: pointer;
    margin-bottom: 1rem;
  }
`;
export const PdfButton = styled.button`
  padding: 0.6rem 0.625rem;
  width: 12.5rem;
  background-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  text-transform: uppercase;
  border: 0;
  border-radius: 0.1875rem;
  text-align: center;
  display: block;
  cursor: pointer;
  margin-bottom: 1rem;
`;

export const Row = styled.tr`
  display: flex;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  height: 2rem;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem;
  border: 1px solid #e53d00;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
  div {
    display: flex;
    gap: 0.3rem;
  }
`;
export const ListContainer = styled.table`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  border-collapse: collapse;
  gap: 0.3rem;
  border: 1px solid #000;
`;
export const Button = styled.button`
  display: flex;
  background-color: #e53d00;
  border: 0;
  border-radius: 0.1rem;
  height: 100%;
  cursor: pointer;
`;

export const ModalContainer = styled.section`
  top: 0;
  left: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: flex-end;
  gap: 1rem;
  padding: 2rem 10rem;
`;

export const CloseButton = styled.div`
  cursor: pointer;
`;
