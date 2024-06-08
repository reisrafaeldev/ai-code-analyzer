import React, { useEffect } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import InputComponent from "../../components/input";
import logoBrand from "../../assets/logo-marca.png";
import Image from "../../components/image";
import Button from "../../components/button";
import Anchor from "../../components/anchor";
import Load from "../../components/load";
import { useState } from "react";
import { useLogin } from "../../contex/authContex";
import { auth } from "../../utils/config/firebase";

import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const { setUserAuth } = useLogin();
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    if (senha && email) {
      setLoad(true);
      loginUser(email, senha);
    } else {
      setLoad(false);
      Swal.fire("Preencha todos os campos!!");
    }
  };
const apiKey = process.env.REACT_APP_AI_KEY;

  const loginUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        setUser(value.user.uid);
        setUserAuth(value.user.uid);
        localStorage.setItem("user", value.user.uid);
        setLoad(false);
        nav("/auto-analise");
      })
      .catch((error) => {
        Swal.fire("Usuário ou senha inválidos!!");
        setEmail("");
        setSenha("");
        setLoad(false);
      });
  };
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
     nav("/auto-analise");
    }
  }, []);
  return (
    <S.Container>
      <Load active={load} />
      <S.Center>
        <Image src={logoBrand} width={"20rem"} />
        <S.ContainerLogin onSubmit={handleSubmit}>
          <InputComponent
            label={"Email"}
            type={"text"}
            placeholder={"Email"}
            onChangeText={(e) => setEmail(e.target.value)}
            showError={false}
          />
          <InputComponent
            label={"Senha"}
            type={"password"}
            placeholder={"Senha"}
            onChangeText={(e) => setSenha(e.target.value)}
            showError={false}
            right={"1.1rem"}
          />
          <div>
            <Anchor
              fontSize={"0.75rem"}
              color={"#fff"}
              fontWeight="600"
              margin="0.3rem 0 0.5rem"
              href={"/recovery"}
            >
              Esqueceu sua senha?
            </Anchor>
            <Anchor
              fontSize={"0.75rem"}
              color={"#fff"}
              fontWeight="600"
              margin="0 0 1rem"
              href={"/register"}
            >
              Não tem conta? Cadastre-se
            </Anchor>
          </div>
          <Button
            justify={"center"}
            variant={"primary"}
            width="100%"
            margin="1rem 0"
            background={"#fff"}
            type="submit"
          >
            Entrar
          </Button>
        </S.ContainerLogin>
      </S.Center>
    </S.Container>
  );
};
export default Login;
