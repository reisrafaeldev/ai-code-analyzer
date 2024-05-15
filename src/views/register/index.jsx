import React, { useState, useEffect } from "react";
import * as S from "./index.styles";
import { useNavigate } from "react-router-dom";
import imageLogo from "../../assets/logo-marca.png";
import imagePerson from "../../assets/logo.png";
import Image from "../../components/image";
import Text from "../../components/text";
import Anchor from "../../components/anchor";
import InputComponent from "../../components/input";
import Button from "../../components/button";
import Load from "../../components/load";
import Swal from "sweetalert2";
import { auth } from "../../utils/config/firebase";

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const Register = () => {
  const nav = useNavigate();
  const [data, setData] = useState({ email: "", password: "", password_twu: "" });

  const [load, setLoad] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    return emailRegex.test(email);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email && data.password && data.password_twu) {
      if (data.password !== data.password_twu) {
        Swal.fire("As senhas não conferem!!");
        return;
      }
      if (!isEmailValid(data.email)) {
        Swal.fire("Por favor, insira um e-mail válido!");
        return;
      }
  
      setLoad(true);
      createUser();

    } else {
      Swal.fire("Preencha todos os campos!!");
    }

  };

  const createUser = async () => {

    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((value) => {
        setLoad(false);
        Swal.fire("Cadastro realizado com sucesso!!");
        setInterval(() => {
          nav("/");
        }, 2000);
      })
      .catch((error) => {
        setLoad(false);
        Swal.fire("Sistema indisponível. Tente mais tarde!!");
      });
  };

  return (
    <S.Container>
      <Load active={load}></Load>
      <S.Center>
        <Image src={imageLogo} width="20rem" />
        <S.ContainerCenter onSubmit={handleSubmit}>
          <Anchor icon={true} href="/" color={"#fff"} margin="0.5rem 0">
            Voltar
          </Anchor>
          <Text
            fontSize={"1rem"}
            color={"#fff"}
            fontWeight="700"
            margin="1rem 0 1rem"
          >
            Cadastro
          </Text>
          <InputComponent
            type="email"
            label="Email"
            onChangeText={(e) => setData({ ...data, email: e.target.value })}
            required
          />
          <InputComponent
            type="password"
            label="Senha"
            right={"-7.4rem"}
            onChangeText={(e) => setData({ ...data, password: e.target.value })}
          />
          <InputComponent
            type="password"
            label="Confirme a Senha"
            right={"-7.4rem"}
            onChangeText={(e) => setData({ ...data, password_twu: e.target.value })}
          />
          <Button
            justify={"center"}
            variant={"primary"}
            width="100%"
            margin="1rem 0"
            type="submit"
          >
            Cadastrar
          </Button>
        </S.ContainerCenter>
      </S.Center>

    </S.Container>
  );
};
export default Register;
