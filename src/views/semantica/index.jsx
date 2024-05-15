import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { calcularComplexidadeCiclomatica } from "../../utils/analise";
import Header from "../../components/header";
import Aside from "../../components/aside";
import { useLogin } from "../../contex/authContex";
import Text from "../../components/text";
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
import Button from "../../components/button";
import axios from "axios";
import Load from "../../components/load";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Semantica = () => {
  const nav = useNavigate();
  const api = axios.create({ baseURL: "https://teste-5-gnnmqk84r-reisrafaell.vercel.app" });

  const [fileContent, setFileContent] = useState(
    "Inicie o desenvolvimento para exibir seu código aqui!"
  );
  const [response, setResponse] = useState();
  const [complexidadeC, setComplexidade] = useState(0);
  const { title, setTitle } = useLogin();
  const [load, setLoad] = useState(false);
  const defaultData = "Foi realizada a análise de desempenho a seguir: \n\n";

  useEffect(() => {
    try {
      const ws = new WebSocket("ws://localhost:4000");
      ws.onopen = () => {
        console.log("WebSocket connection established");
      };
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data).data;
        const fileName = JSON.parse(event.data).fileName;
        console.log("extension", JSON.parse(event.data));
        setFileContent(data);
      };
      ws.onclose = (event) => {
        console.log("WebSocket connection closed:", event);
      };
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return () => {
        ws.close();
      };
    } catch (error) {
      console.error("Error initializing WebSocket:", error);
    }
  }, []);

  const customStyles = {
    backgroundColor: "rgba(254, 96, 0, 0.2)",
    border: "1px solid #000",
    width: "50%",
    fontSize: "16px",
    overflow: "auto",
    margin: "0",
  };
  const responseCustomStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "1px solid #000",
    width: "100%",
    fontSize: "16px",
    overflow: "auto",
    margin: "0",
    height: "100%",
  };

  const handleClick = async () => {
    setLoad(true);
    try {
      const response = await api.post("/analisar_codigo", {
        prompt:
          "Dado o código a seguir, faça uma análise semântica detalhada em termos de boas práticas de programação em React. Considere os seguintes aspectos:\n\n1. Estrutura e organização do componente React.\n2. Uso adequado de state e props.\n3. Gerenciamento de ciclo de vida, se aplicável.\n4. Uso de hooks e seu correto funcionamento.\n5. Clareza, legibilidade e eficiência do código.\n\nPor favor, forneça uma resposta em português detalhando qualquer melhoria possível ou possíveis problemas encontrados no código abaixo:",
        code: fileContent,
      });
      setResponse(response.data.response);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error("Erro ao enviar o conteúdo do arquivo:", error);
    }
  };
  

  return (
    <S.Container>
      <Load active={load}></Load>
      <S.Center>
        <Aside />
        <S.ContainerCenter>
          <S.ContainerTitle>
            <Text as={"h2"} fontSize="1.5rem" color="rgba(255, 255, 255, 0.8)">
              Análise Semântica
            </Text>
            <Button
              justify={"center"}
              variant={"primary"}
              children={"Analizar Código"}
              isSelected={false}
              width={"50%"}
              onClick={handleClick}
            />
          </S.ContainerTitle>
          <S.Overflow>
            <SyntaxHighlighter
              language="javascript"
              style={dark}
              customStyle={customStyles}
            >
              {fileContent}
            </SyntaxHighlighter>
            <div>
              {response ? (
                <SyntaxHighlighter
                  wrapLines={true}
                  wrapLongLines={true}
                  language="javascript"
                  style={dark}
                  customStyle={responseCustomStyles}
                >
                  {defaultData + response}
                </SyntaxHighlighter>
              ) : (
                <div>
                  <Text
                    as={"h2"}
                    fontSize="1rem"
                    color="rgba(255, 255, 255, 0.8)"
                  >
                    Analise a semântica do seu seu código usando IA
                  </Text>
                </div>
              )}
            </div>
          </S.Overflow>
        </S.ContainerCenter>
      </S.Center>
    </S.Container>
  );
};

export default Semantica;
