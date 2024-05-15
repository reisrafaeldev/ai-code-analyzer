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

const Desempenho = () => {
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
        setFileContent(data);
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
          "Dado o código a seguir, faça uma análise detalhada de desempenho das funções e funcionalidades existentes. Considere os seguintes pontos ao avaliar o código:\n\n1. Eficiência no uso de recursos como CPU, memória e rede.\n2. Identificação de possíveis gargalos de desempenho.\n3. Uso otimizado de renderização e atualização de componentes.\n4. Análise de eventuais operações custosas e alternativas para melhorias.\n5. Estratégias de caching ou memoização aplicáveis.\n\nPor favor, forneça uma resposta detalhada em português, destacando oportunidades de melhoria no desempenho do código abaixo:",
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
              {title}
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
                    Analise o desempenho do seu seu código usando IA
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

export default Desempenho;
