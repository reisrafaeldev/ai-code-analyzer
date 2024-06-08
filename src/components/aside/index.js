import React, { useState } from "react";
import * as S from "./styles";
import * as H from "./helpers";

import Button from "../button";
import { useLogin } from "../../contex/authContex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/config/firebase";
import Logo from "../../assets/logo-marca.png";
import Image from "../image";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Text from "../text";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Aside = ({ chartData, fileName, isResponse }) => {
  const { setTitle } = useLogin();
  const nav = useNavigate();

  const buttons = [
    { label: "Autoanálise", iconType: "analise", path: "/auto-analise" },
    {
      label: "Análise Estática",
      iconType: "desempenho",
      path: "/analise-estatica",
    },
    {
      label: "Análise de Repositório",
      iconType: "repositorio",
      path: "/analise-repositorio",
    },
    {
      label: "Meus Documentos",
      iconType: "documentos",
      path: "/data",
    },
    {
      label: "Sobre",
      iconType: "erros",
      path: "/sobre",
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
      localStorage.removeItem("user");
      nav("/");
    } catch (error) {
    }
  };
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
      <S.Separator />
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
      {isResponse && (
        <>
          <S.Separator />
          <S.ContainerGrafics>
            <div>
              {fileName && (
                <Text
                  as={"h3"}
                  fontSize="14px"
                  color="rgba(255, 255, 255, 0.8)"
                  margin={"0"}
                >
                  Nome do arquivo: {fileName}
                </Text>
              )}
            </div>

            <div>
              <Bar data={chartData} options={H.options} height={200} />
            </div>
            {/* <div>
        <Bar data={chartDataAc} options={H.optionsAc} height={200} />
      </div> */}
          </S.ContainerGrafics>
        </>
      )}
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
