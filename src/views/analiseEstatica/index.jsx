import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import Aside from "../../components/aside";
import { useLogin } from "../../contex/authContex";
import Text from "../../components/text";
import Button from "../../components/button";
import axios from "axios";
import Load from "../../components/load";
import CodeSnippet from "../../components/CodeSnippet";
import { ThreeCircles } from "react-loader-spinner";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/config/firebase";
import Swal from "sweetalert2";
import { PROMPT, C_PROMPT, options, optionsAc } from "./helpers";

import { fetchChatGPTResponse } from "../../utils/config/openai";

import * as P from "../../utils/config/prompt";

import Chart from "../../components/chat";

const AnaliseEstatica = () => {
  // const apiUrl = process.env.REACT_APP_API_URL;
  const apiUrl = "https://api.openai.com/v1/completions";
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

  const [tab, setTab] = useState([
    { id: 1, name: "Arquivo 1", code: "", selected: true },
  ]);
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
  const handleSubmit = async () => {
    setLoad(true);
    setLoad(true);
    const code = tab.map((item) => item.code).join(" ");
    console.log(code)

    if (provider !== "gpt") {
      try {
        const response = await bardApi.post("/analisar_codigo", {
          prompt: P.ANALISE_PROMPT,
          code: JSON.stringify(code),
        });
        setResponse(response.data.response);
        handleComplexidade();
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
        handleComplexidade();
      } catch (error) {
        setLoad(false);
      }
    }
  };

  useEffect(() => {
    try {
      const ws = new WebSocket("ws://localhost:4000");
      ws.onopen = () => {
        // console.log("WebSocket connection established");
      };
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data).data;
        const fileName = JSON.parse(event.data).fileName;
        // console.log("extension", JSON.parse(event.data));
        setFileContent(data);
        // console.log(data);
      };

      return () => {
        ws.close();
      };
    } catch (error) {
      // console.error("Error initializing WebSocket:", error);
    }
  }, []);
  const handleClick = async () => {
    setLoad(true);
    const code = tab.map((item) => item.code).join(" ");
    console.log(code)
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
            code: t.id === id ? content : t.code, // Update code only for the selected tab
          }))
        );
      };

      reader.readAsText(file);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const addTitle = (title, y) => {
      doc.setFontSize(18);
      doc.text(title, 20, y);
      doc.setFontSize(12);
      return y + 20; // Ajuste conforme necessário
    };

    const addSeparator = (y) => {
      doc.setLineWidth(0.5);
      doc.line(20, y, doc.internal.pageSize.getWidth() - 20, y);
      return y + 10;
    };

    const addText = (text, y, maxLines = 20) => {
      const lineHeight = 10; // Ajuste conforme necessário
      const pageHeight = doc.internal.pageSize.getHeight();

      // Dividir o texto em linhas
      const lines = doc.splitTextToSize(
        text,
        doc.internal.pageSize.getWidth() - 40
      );

      // Calcular o espaço necessário para o texto
      const textHeight = lines.length * lineHeight;

      // Verificar se há espaço suficiente na página atual
      if (y + textHeight > pageHeight) {
        // Não há espaço suficiente, criar uma nova página
        doc.addPage();
        y = 10; // Definir posição inicial na nova página
      }

      // Adicionar texto à página
      doc.text(lines, 20, y);

      return y + textHeight;
    };

    let yPosition = 10; // Posição inicial na primeira página

    // Adicionar a imagem no topo do PDF
    const logoDataURL = "/pdf-logo.jpeg";
    doc.addImage(logoDataURL, "JPEG", 200, 10, 500, 500); // Ajuste conforme necessário

    // Adicionar título
    yPosition = addTitle("Relatório PDF", yPosition);

    yPosition = addSeparator(yPosition);

    // Adicionar conteúdo do response
    const lines = doc.splitTextToSize(
      defaultData + response,
      doc.internal.pageSize.getWidth() - 40
    );
    lines.forEach((line) => {
      yPosition = addText(line, yPosition);
    });

    doc.save("meu-pdf-com-multiplas-paginas.pdf");
  };
  const handleSave = () => {
    setLoad(true);
    saveData();
  };

  const saveData = async () => {
    try {
      const docRef = await addDoc(collection(db, "code_documentation"), {
        user_id: user,
        data: response,
        title: "teste",
      });
      setResponse("");
      setLoad(false);
      Swal.fire("Documentação Salva com sucesso!!");
    } catch (e) {
      setLoad(false);
      Swal.fire("Falha ao salvar Documentação!!");
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
                    <Button
                      justify={"center"}
                      variant={"primary"}
                      children={"Salvar Documento"}
                      isSelected={false}
                      width={"15rem"}
                      onClick={handleSave}
                    />
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
                <>
                  {/* <CodeSnippet fragment={defaultData + response} />
                  <Button
                    justify={"center"}
                    variant={"primary"}
                    children={"Salvar Documento"}
                    isSelected={false}
                    width={"15rem"}
                    onClick={handleSave}
                  /> */}
                </>
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
