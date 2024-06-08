import React, { useEffect, useRef, useState } from "react";
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
import { aiAutoGeneration, aiComplexidadeAnalyser } from "../../utils/analise";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AutoAnalise = () => {
  const [fileContent, setFileContent] = useState(
    "Inicie o desenvolvimento para exibir seu código aqui!"
  );
  const [response, setResponse] = useState();
  const [complexidade, setComplexidade] = useState();
  const [load, setLoad] = useState(false);
  const [fileName, setFileName] = useState();
  const defaultData = "Os seguintes tópicos foram analisados: \n\n";
  const [chartData, setChartData] = useState({
    labels: ["Complexidade"],
    datasets: [
      {
        label: "Complexidade Ciclomática",
        data: [0, 50],
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
            label: "Complexidade Ciclomática",
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

  const wsRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
        wsRef.current = new WebSocket("ws://localhost:4000");
        wsRef.current.onopen = () => {};
        wsRef.current.onmessage = (event) => {
          const data = JSON.parse(event.data).data;
          const fileName = JSON.parse(event.data).fileName;
          setFileName(H.getFileName(fileName));
          setFileContent(data);
        };
      }
    }, 1000);

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      clearInterval(intervalId);
    };
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
    if (!load) {
      handleComplexidade();
      try {
        const response = await aiAutoGeneration(
          P.ANALISE_PROMPT,
          JSON.stringify(fileContent)
        );
        setResponse(response);
      } catch (error) {
        setLoad(false);
        console.error("Erro ao obter a resposta: ", error);
      }
    }
    setLoad(false);
  };

  const handleComplexidade = async () => {
    try {
      const response = await aiComplexidadeAnalyser(
        P.COMPLEXIDADE_PROMPT,
        JSON.stringify(fileContent)
      );
      P.extrairComplexidade(response, setComplexidade);
    } catch (error) {}
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
        <Aside
          chartData={chartData}
          fileName={fileName}
          isResponse={!!complexidade}
        />
        <S.ContainerCenter>
          <S.ContainerTitle>
            <Text as={"h2"} fontSize="1.5rem" color="rgba(255, 255, 255, 0.8)">
              Autoanálise
            </Text>
            <Text
              as={"h3"}
              fontSize="1rem"
              color="rgba(255, 255, 255, 0.8)"
              margin={"0"}
            >
              Analise seu código em tempo real usando IA
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
              <></>
            )}
            <S.ContainerFile>
              <CodeSnippet fragment={fileContent} />
            </S.ContainerFile>
          </S.Overflow>
        </S.ContainerCenter>
      </S.Center>
    </S.Container>
  );
};

export default AutoAnalise;
