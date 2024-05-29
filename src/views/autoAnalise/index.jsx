import React, { useEffect, useState } from "react";
import * as S from "./styles";
import * as P from "../../utils/config/prompt";
import * as H from "./helpers";
import Aside from "../../components/aside";
import Text from "../../components/text";
import axios from "axios";
import CodeSnippet from "../../components/CodeSnippet";
import { ThreeCircles } from "react-loader-spinner";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Chart from "../../components/chat";
import { fetchChatGPTResponse } from "../../utils/config/openai";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AutoAnalise = () => {
  const apiUrl = "https://api.openai.com/v1/completions";
  let provider = sessionStorage.getItem("iaOption");
  const bardApiUrl = process.env.REACT_APP_API_URL;
  const api = axios.create({
    headers: { Authorization: "Bearer " + process.env.REACT_APP_GPT_KEY },
  });
  const bardApi = axios.create({
    baseURL: bardApiUrl,
  });
  const bardApiUrlComplexidade = axios.create({
    baseURL: 'http://127.0.0.1:1100',
  });
  const bardApiUrlAcoplamento = axios.create({
    baseURL: 'http://127.0.0.1:1200',
  });
  const [fileContent, setFileContent] = useState(
    "Inicie o desenvolvimento para exibir seu código aqui!"
  );
  const [response, setResponse] = useState();
  const [complexidade, setComplexidade] = useState();
  const [acoplamento, setAcoplamento] = useState();
  const [load, setLoad] = useState(false);
  const [fileName, setFileName] = useState();
  const defaultData = "Os seguintes tópicos foram analisados: \n\n";
  const [chartData, setChartData] = useState({
    labels: ["Complexidade"], 
    datasets: [
      {
        label: "Complexidade Ciclomática",
        data: [25, 50], 
        backgroundColor: "#e53d00",
        borderColor: "#f30000",
        borderWidth: 1,
      },
    ],
  });
  const [chartDataAc, setChartDataAc] = useState({
    labels: ["Acoplamento"], 
    datasets: [
      {
        label: "Acoplamento",
        data: [25, 50], 
        backgroundColor: "#e53d00",
        borderColor: "#f30000",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (complexidade && complexidade.complexidade) {
      const value = parseInt(complexidade.complexidade);

      const newChartData = {
        labels: ["Complexidade"],
        datasets: [
          {
            label: "Nível de Complexidade",
            data: [value, 50],
            backgroundColor: "rgba(224, 49, 5, 0.452)",
            borderColor: "#e53d00",
            borderWidth: 1,
          },
        ],
      };
      setChartData(newChartData);
    }
  }, [complexidade]);

  useEffect(() => {
    if (acoplamento && acoplamento.acoplamento) {
      const value = parseInt(acoplamento.acoplamento); 

      const newChartData = {
        labels: ["Acoplamento"], 
        datasets: [
          {
            label: "Nível de Acoplamento",
            data: [value, 50], 
            backgroundColor: "rgba(224, 49, 5, 0.452)",
            borderColor: "#e53d00",
            borderWidth: 1,
          },
        ],
      };
      setChartDataAc(newChartData);
    }
  }, [acoplamento]);

  useEffect(() => {
    setInterval(() => {
      try {
        const ws = new WebSocket("ws://localhost:4000");
        ws.onopen = () => {};
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data).data;
          const fileName = JSON.parse(event.data).fileName;
          setFileName(H.getFileName(fileName));
          setFileContent(data);
        };
        return () => {
          ws.close();
        };
      } catch (error) {}
    }, 1000);
  }, []);

  useEffect(() => {
    if (
      fileContent &&
      fileContent !== "Inicie o desenvolvimento para exibir seu código aqui!"
    ) {
      handleClick();
    }
  }, [fileContent]);

  const handleClick = async () => {
    setLoad(true);
    handleAcoplamento();
    handleComplexidade();
    if (provider !== "gpt") {
      try {
        const response = await bardApi.post("/analisar_codigo", {
          prompt: P.ANALISE_PROMPT,
          code: JSON.stringify(fileContent),
        });
        setResponse(response.data.response);
        setLoad(false);
      } catch (error) {
        setLoad(false);
      }
    } else {
      try {
        const result = await fetchChatGPTResponse(
          P.ANALISE_PROMPT + JSON.stringify(fileContent)
        );
        setResponse(result.choices[0].message.content);
        setLoad(false);
      } catch (error) {
        setLoad(false);
      }
    }
  };

  const handleComplexidade = async () => {
    if (provider !== "gpt") {
      try {
        const newresponse = await bardApiUrlComplexidade.post("/analisar_complexidade", {
          prompt: P.COMPLEXIDADE_PROMPT,
          code: JSON.stringify(fileContent),
        });
        P.extrairComplexidade(newresponse.data.response, setComplexidade);
      } catch (error) {

      }
    } else {
      try {
        const result = await fetchChatGPTResponse(
          P.COMPLEXIDADE_PROMPT + JSON.stringify(fileContent)
        );
        P.extrairComplexidade(
          result.choices[0].message.content,
          setAcoplamento
        );
      } catch (error) {
      }
    }
  };
  const handleAcoplamento = async () => {
    if (provider !== "gpt") {
      try {
        const newresponse = await bardApiUrlAcoplamento.post("/analisar_acoplamento", {
          prompt: P.ACOPLAMENTO_PROMPT,
          code: JSON.stringify(fileContent),
        });
       
        P.extrairAcoplamento(newresponse.data.response, setAcoplamento);
      } catch (error) {
      }
    } else {
      try {
        const result = await fetchChatGPTResponse(
          P.ACOPLAMENTO_PROMPT + JSON.stringify(fileContent)
        );
        P.extrairAcoplamento(result.choices[0].message.content, setAcoplamento);
      } catch (error) {
      }
    }
  };

  return (
    <S.Container>
      <ThreeCircles
        visible={load}
        height="80"
        width="80"
        color="#E53D00"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="load-wrapper"
      />
      <S.Center>
        <Aside />
        <S.ContainerCenter>
          <S.ContainerTitle>
            <Text as={"h2"} fontSize="1.5rem" color="rgba(255, 255, 255, 0.8)">
              Autoanálise
            </Text>
          </S.ContainerTitle>

          <S.Overflow>
            {response ? (
              <>
                <Text
                  as={"h2"}
                  fontSize="1.5rem"
                  color="rgba(255, 255, 255, 0.8)"
                  margin={"0"}
                >
                  Resultado
                </Text>
                <CodeSnippet fragment={defaultData + response} />
                <Text
                  as={"h2"}
                  fontSize="1.5rem"
                  color="rgba(255, 255, 255, 0.8)"
                  margin={"0"}
                >
                  Seu Código
                </Text>
              </>
            ) : (
              <Text
                as={"h3"}
                fontSize="1rem"
                color="rgba(255, 255, 255, 0.8)"
                margin={"0"}
              >
                Analise seu código em tempo real usando IA
              </Text>
            )}
            <S.ContainerFile>
              <CodeSnippet fragment={fileContent} />
            </S.ContainerFile>
            <S.ContainerResponse></S.ContainerResponse>
          </S.Overflow>
        </S.ContainerCenter>
        <Chart
          chartData={chartData}
          chartDataAc={chartDataAc}
          fileName={fileName}
        />
      </S.Center>
    </S.Container>
  );
};

export default AutoAnalise;
