import { useNavigate } from "react-router-dom";
import person from "../../assets/logo.png";
import Text from "../../components/text";
import Button from "../../components/button";
import Image from "../../components/image";
import InputComponent from "../../components/input";
import * as S from "./recovery.styles";
import Anchor from "../../components/anchor";
import { useState } from "react";
import Load from "../../components/load";
import logoBrand from "../../assets/logo-marca.png";
import { auth } from "../../utils/config/firebase";
import Swal from "sweetalert2";

import {
  sendPasswordResetEmail,
} from "firebase/auth";
const RecoveryLogin = () => {
  const nav = useNavigate();
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email) {
      setLoad(true)
      await resetPassword(email);
    }else{
      Swal.fire("Preencha todos os campos!!");

    }
  };
  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
      .then((value) => {
        setLoad(false)
        Swal.fire("Enviado com sucesso! Verifique sua caixa de entrada!");
      })
      .catch((error) => {
        setLoad(false)
        Swal.fire("E-mail não cadastrado!");
      });
  };
  return (
    <S.Container>
      <Load active={load}></Load>
      <S.Center>
        <Image src={logoBrand} width={"20rem"} />
        <S.ContainerCenter onSubmit={handleSubmit}>
          <Anchor icon={true} href="/" color={"#fff"} margin="0.5rem 0">
            Voltar
          </Anchor>
          <Text fontSize={"1rem"} color={"#fff"} fontWeight="700">
            Recuperar Senha
          </Text>
          <InputComponent
            label={"Login"}
            type={"text"}
            placeholder={"Email"}
            onChangeText={(e) => setEmail(e.target.value)}
            showError={false}
          />
          <Button
            justify={"center"}
            variant={"primary"}
            width="100%"
            margin="1rem 0"
            type="submit"
          >
            Enviar
          </Button>
        </S.ContainerCenter>
      </S.Center>
    </S.Container>
  );
};
export default RecoveryLogin;
