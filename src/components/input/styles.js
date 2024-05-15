import styled from "styled-components";
import MaskedInput from "react-text-mask";
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 5.5rem;
  margin: 0.4rem 0;
  gap: 0.5rem;
  position: relative;
  button{
    position: absolute;
    right: 0;
  }
  
`;
export const Icon = styled.img`
  height: 25px;
  position: absolute;
  bottom: 4rem;
  right: 8.125rem;
`;
export const Label = styled.label`
  color: #fff;
  font-size: 0.75rem;
  font-weight: bold;
  width: 100%;
  margin-bottom: 0.3rem;
`;

export const Input = styled.input`
  background: transparent;
  color: #fff;
  width: 100%;
  border-radius: 0.175rem;
  height: 2.8125rem;
  padding: 0.7rem;
  letter-spacing: 0.0625rem;
  border: ${props=> props.showError ? "1px solid #c60d00" : "1px solid #fff"};

    &::placeholder {
      color: #fff;
      font-weight: semi-bold;
    }

    outline-width: 0;
    &[type=number]::-webkit-inner-spin-button { 
    -webkit-appearance: none;
    }
`;

export const InputMask = styled(MaskedInput)`
  background: rgba(229, 61, 0, 0.15);
  color: #000;
  width: 100%;
  border-radius: 0.375rem;
  height: 2.5rem;
  padding: 0.7rem;
  letter-spacing: 0.0625rem;
  border: ${props=> props.showError ? "1px solid #c60d00" : "1px solid transparent"};

    &::placeholder {
      color: #454545;
      font-weight: semi-bold;
    }

    outline-width: 0;
    &[type=number]::-webkit-inner-spin-button { 
    -webkit-appearance: none;
    }
`;

export const Button = styled.div`
  background-color: transparent;
  border: none;
  position: absolute;
  bottom: 1.125rem;
  right: .6rem;

   svg {
    z-index: 1;
    height: 1.3125rem;
    right: ${props=> props.right};

}
`;

