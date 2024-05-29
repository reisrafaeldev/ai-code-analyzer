import React, { useEffect, useState } from "react";
import * as S from "./styles";
import * as P from "../../utils/config/prompt";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import Aside from "../../components/aside";
import { useLogin } from "../../contex/authContex";
import Text from "../../components/text";
import Button from "../../components/button";
import axios from "axios";
import Load from "../../components/load";
import CodeSnippet from "../../components/CodeSnippet";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/config/firebase";
import Swal from "sweetalert2";
import { options, optionsAc } from "./helpers";
import { fetchChatGPTResponse } from "../../utils/config/openai";
import Chart from "../../components/chat";
import InputComponent from "../../components/input";

const AnaliseEstatica = () => {
  // const apiUrl = process.env.REACT_APP_API_URL;
  const apiUrl = "https://api.openai.com/v1/completions";
  const bardApiUrlComplexidade = axios.create({
    baseURL: "http://127.0.0.1:1100",
  });
  const bardApiUrlAcoplamento = axios.create({
    baseURL: "http://127.0.0.1:1200",
  });
  const bardApiUrl = process.env.REACT_APP_API_URL;

  const nav = useNavigate();
  const api = axios.create({
    headers: { Authorization: "Bearer " + process.env.REACT_APP_GPT_KEY },
  });
  const bardApi = axios.create({
    baseURL: bardApiUrl,
  });
  let provider = sessionStorage.getItem("iaOption");
  // );
  const [response, setResponse] = useState("");
  const [fileContent, setFileContent] = useState(null);
  const { title, user } = useLogin();
  const [load, setLoad] = useState(false);
  const [fileName, setFileName] = useState();
  const [complexidade, setComplexidade] = useState();
  const [acoplamento, setAcoplamento] = useState();
  const [documentName, setDocumentName] = useState();

  const [tab, setTab] = useState([
    { id: 1, name: "Arquivo 1", code: "", selected: true },
  ]);
  const defaultData = "Os seguintes tópicos foram analisados: \n\n";
  const [chartData, setChartData] = useState({
    labels: ["Complexidade"],
    datasets: [
      {
        label: "Complexidade Ciclomática",
        data: [5, 50],
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
        data: [5, 50],
        backgroundColor: "#e53d00",
        borderColor: "#f30000",
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    console.log(complexidade);
    if (complexidade && complexidade.complexidade) {
      console.log(complexidade.complexidade);
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

  const handleSubmit = async () => {
    setLoad(true);
    handleAcoplamento();
    handleComplexidade();
    const code = tab.map((item) => item.code).join(" ");

    if (provider !== "gpt") {
      try {
        const response = await bardApi.post("/analisar_codigo", {
          prompt: P.ANALISE_PROMPT,
          code: JSON.stringify(code),
        });
        setResponse(response.data.response);
      } catch (error) {
        setLoad(false);
      }
    } else {
      try {
        const result = await fetchChatGPTResponse(
          P.ANALISE_PROMPT + JSON.stringify(code)
        );
        setResponse(result.choices[0].message.content);
        setLoad(false);
      } catch (error) {
        setLoad(false);
      }
    }
  };

  useEffect(() => {
    try {
      const ws = new WebSocket("ws://localhost:4000");
      ws.onopen = () => {};
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data).data;
        const fileName = JSON.parse(event.data).fileName;
        setFileContent(data);
      };

      return () => {
        ws.close();
      };
    } catch (error) {}
  }, []);
  const handleClick = async () => {
    setLoad(true);
    const code = tab.map((item) => item.code).join(" ");
    console.log(code);
    const parameters = {
      prompt: PROMPT + code,
      created: 1677652288,
      model: "gpt-3.5-turbo-0125",
      max_tokens: 56,
      temperature: 0.5,
    };

    try {
      const response = await api.post(apiUrl, parameters);
      setResponse(response.data.response);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error("Error sending file content:", error);
    }
  };

  const handleFileChange = (event, id) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        setTab((prevTabs) =>
          prevTabs.map((t) => ({
            ...t,
            code: t.id === id ? content : t.code,
          }))
        );
      };
      reader.readAsText(file);
    }
  };

  const saveData = async () => {
    if (documentName) {
      setLoad(true);

      try {
        const docRef = await addDoc(collection(db, "code_documentation"), {
          user_id: user,
          data: response,
          title: documentName,
        });
        setResponse("");
        setLoad(false);
        Swal.fire("Documentação Salva com sucesso!!");
      } catch (e) {
        setLoad(false);
        Swal.fire("Falha ao salvar Documentação!!");
      }
    } else {
      Swal.fire("Nomeie o documento para salvar!");
    }
  };

  const handleComplexidade = async () => {
    if (provider !== "gpt") {
      try {
        const newresponse = await bardApiUrlComplexidade.post(
          "/analisar_codigo",
          {
            prompt: P.COMPLEXIDADE_PROMPT,
            code: JSON.stringify(fileContent),
          }
        );

        console.log(newresponse.data.response);
        P.extrairComplexidade(newresponse.data.response, setComplexidade);
      } catch (error) {}
    } else {
      try {
        const result = await fetchChatGPTResponse(
          P.COMPLEXIDADE_PROMPT + JSON.stringify(fileContent)
        );
        P.extrairComplexidade(
          result.choices[0].message.content,
          setAcoplamento
        );
      } catch (error) {}
    }
  };
  const handleAcoplamento = async () => {
    if (provider !== "gpt") {
      try {
        const newresponse = await bardApiUrlAcoplamento.post(
          "/analisar_acoplamento",
          {
            prompt: P.ACOPLAMENTO_PROMPT,
            code: JSON.stringify(fileContent),
          }
        );
        P.extrairAcoplamento(newresponse.data.response, setAcoplamento);
      } catch (error) {}
    } else {
      try {
        const result = await fetchChatGPTResponse(
          P.ACOPLAMENTO_PROMPT + JSON.stringify(fileContent)
        );
        P.extrairAcoplamento(result.choices[0].message.content, setAcoplamento);
      } catch (error) {}
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
              Analise Estática
            </Text>
            <Button
              justify={"center"}
              variant={"primary"}
              children={"Analisar Código"}
              isSelected={false}
              width={"15rem"}
              height={"3rem"}
              onClick={handleSubmit}
            />
          </S.ContainerTitle>
          <S.Tab>
            {tab.map((item) => (
              <S.TabButton
                key={item.id}
                selected={item.selected}
                onClick={() =>
                  setTab((prevTabs) =>
                    prevTabs.map((t) => ({
                      ...t,
                      selected: t.id === item.id,
                    }))
                  )
                }
              >
                {item.name}
                <S.CloseIcon
                  onClick={() =>
                    tab.length > 1 &&
                    setTab((prevTabs) =>
                      prevTabs.filter((t) => t.id !== item.id)
                    )
                  }
                />
              </S.TabButton>
            ))}
            <S.AddButton
              onClick={() =>
                setTab((prevTabs) => [
                  ...prevTabs,
                  {
                    id: prevTabs.length + 1,
                    name: `Arquivo ${prevTabs.length + 1}`,
                    code: "",
                    selected: false,
                  },
                ])
              }
            >
              Adicionar
            </S.AddButton>
          </S.Tab>

          <S.Overflow>
            <S.ContainerResponse>
              {response ? (
                <>
                  <S.ContainerResponseHeader>
                    <Text
                      as={"h3"}
                      fontSize="1.5rem"
                      color="rgba(255, 255, 255, 0.8)"
                    >
                      Resultado
                    </Text>
                    <S.Left>
                      <InputComponent
                        type="email"
                        label="Nome do Documento"
                        onChangeText={(e) => setDocumentName(e.target.value)}
                        required
                      />
                      <Button
                        justify={"center"}
                        variant={"primary"}
                        children={"Salvar Documento"}
                        isSelected={false}
                        width={"15rem"}
                        onClick={saveData}
                        margin={"1.375rem 0 0 "}
                      />
                    </S.Left>
                  </S.ContainerResponseHeader>
                  <CodeSnippet fragment={defaultData + response} />

                  <Text
                    as={"h3"}
                    fontSize="1.5rem"
                    margin={"1rem"}
                    color="rgba(255, 255, 255, 0.8)"
                  >
                    Seu Código
                  </Text>
                </>
              ) : null}
            </S.ContainerResponse>
            {tab.map(
              (item) =>
                item.selected && (
                  <S.ContainerFile key={item.id}>
                    <S.ContainerFileButton>
                      <label for="arquivo">Selecinar arquivo</label>
                      <input
                        type="file"
                        name="arquivo"
                        id="arquivo"
                        onChange={(e) => handleFileChange(e, item.id)}
                      />
                    </S.ContainerFileButton>
                    <CodeSnippet fragment={item.code} />
                  </S.ContainerFile>
                )
            )}

            <S.ContainerResponse>
              {response ? (
                <></>
              ) : (
                <div>
                  <Text
                    as={"h2"}
                    fontSize="1rem"
                    color="rgba(255, 255, 255, 0.8)"
                  >
                    Analise seu código usando IA
                  </Text>
                </div>
              )}
            </S.ContainerResponse>
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

export default AnaliseEstatica;
