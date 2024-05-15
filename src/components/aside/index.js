import React, { useState } from "react";
import * as S from "./styles";
import Button from "../button";
import { useLogin } from "../../contex/authContex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/config/firebase";
import Logo from "../../assets/logo-marca.png";
import Image from "../image";
import Select from "react-select";

const Aside = () => {
  const { setTitle } = useLogin();
  const nav = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Google Bard");
  console.log("selectedOption", selectedOption.value);

  const buttons = [
    { label: "Auto Análise", iconType: "analise", path: "/home" },
    {
      label: "Análise Estática",
      iconType: "desempenho",
      path: "/analise-estatica",
    },
    {
      label: "Meus Documentos",
      iconType: "complexidade",
      path: "/data",
    },
    {
      label: "Sobre",
      iconType: "erros",
      path: "/code-generation",
    },
  ];
  const [selectedButton, setSelectedButton] = useState("analise");
  const handleButtonClick = (iconType) => {
    setSelectedButton((prevSelectedButton) =>
      prevSelectedButton === iconType ? null : iconType
    );
  };

  useEffect(() => {
    setTitle("Análise");
    handleButtonClick("analise");
  }, []);

  useEffect(() => {
    const pathname = window.location.pathname;
    const button = buttons.find((button) => button.path === pathname);
    if (button) {
      setSelectedButton(button.iconType);
    } else {
      setSelectedButton(null);
    }
  }, [window.location.pathname]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      nav("/");
    } catch (error) {
      console.error("Erro ao fazer logout", error.message);
    }
  };
  const options = [
    { value: "gpt", label: "GPT", color: "#ff4b095f" },
    { value: "bard", label: "Google Bard", color: "#a6a6a65f" },
  ];

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isSelected ? "bold" : "normal",
      color: "#000",
      backgroundColor: state.data.color,
      width: "100%",

      fontSize: state.selectProps.myFontSize,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#000",
      fontSize: state.selectProps.myFontSize,
    }),
  };
  return (
    <S.Aside>
      <Image src={Logo} width={"11.875rem"} />
      <S.SelectContainer>
        <label>Selecione o Moldeo de IA</label>
        <Select
          defaultValue={selectedOption}
          onChange={(value) => (
            setSelectedOption(value), sessionStorage.setItem("iaOption", value.value)
          )}
          options={options}
          styles={styles}
          myFontSize="16px"
          placeholder="Modelo de IA"
          className="basic-single"
        />
      </S.SelectContainer>
      {buttons.map((button) => (
        <Button
          key={button.iconType}
          height={"2.5rem"}
          variant={"secondary"}
          children={button.label}
          iconType={button.iconType}
          isSelected={selectedButton === button.iconType}
          onClick={() => (
            handleButtonClick(button.iconType),
            setTitle(button.label),
            nav(button.path)
          )}
        />
      ))}

      <S.BottonContainer>
        <Button
          children={"Sair"}
          iconType={"sair"}
          isSelected
          onClick={handleLogout}
        />
      </S.BottonContainer>
    </S.Aside>
  );
};

export default Aside;
