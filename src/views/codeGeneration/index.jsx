import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { calcularComplexidadeCiclomatica } from "../../utils/analise";
import { FileUploader } from "react-drag-drop-files";
import Header from "../../components/header";
import Aside from "../../components/aside";
import { useLogin } from "../../contex/authContex";
import Select from "react-select";
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

const CodeGeneration = () => {
  const nav = useNavigate();
  const api = axios.create({ baseURL: "https://teste-5-gnnmqk84r-reisrafaell.vercel.app" });
  const [response, setResponse] = useState();
  const { title, setTitle } = useLogin();
  const [load, setLoad] = useState(false);
  const defaultData = "Foi realizada a análise de desempenho a seguir: \n\n";
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const fileTypes = ["JPEG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("javascript");
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
    const formData = new FormData();
    const prompt = `baseado na seguinte descrição : ${text}, forneça código da imagem utilizando a seguite linguagem  de programação: ${selectedOption.value}`;

    formData.append("image", selectedFile);
    formData.append("text", prompt);

    try {
      const response = await api.post("/gerar_imagem", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponse(response.data.response);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error("Erro ao enviar o conteúdo do arquivo:", error);
    }
  };

  const handleChange = (file) => {
    setFile(file);
    setSelectedFile(file[0]);
  };

  const options = [
    { value: "javascript", label: "Nenhuma das opções", color: "#ff4b095f" },
    { value: "javascript", label: "Node.js", color: "#a6a6a65f" },
    { value: "javascript", label: "JavaScript", color: "#ff4b095f" },
    { value: "java", label: "Java", color: "#a6a6a65f" },
    { value: "javascript", label: "React", color: "#ff4b095f" },
    { value: "python", label: "Python", color: "#a6a6a65f" },
    { value: "ruby", label: "Ruby", color: "#ff4b095f" },
    { value: "html", label: "HTML", color: "#a6a6a65f" },
    { value: "css", label: "CSS", color: "#ff4b095f" },
    { value: "angular", label: "Angular", color: "#a6a6a65f" },
    { value: "typescript", label: "TypeScript", color: "#ff4b095f" },
    { value: "php", label: "PHP", color: "#a6a6a65f" },
    { value: "csharp", label: "C#", color: "#ff4b095f" },
    { value: "swift", label: "Swift", color: "#a6a6a65f" },
    { value: "kotlin", label: "Kotlin", color: "#ff4b095f" },
    { value: "go", label: "Go", color: "#a6a6a65f" },
    { value: "rust", label: "Rust", color: "#ff4b095f" },
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
    <S.Container>
      <Load active={load}></Load>
      <S.Center>
        <Aside />
        <S.ContainerCenter>
          <S.ContainerTitle>
            <Text as={"h2"} fontSize="1.5rem" color="rgba(255, 255, 255, 0.8)">
              Code Generation
            </Text>
          </S.ContainerTitle>
          <S.Overflow>
            <S.LeftContainer>
              {/* <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
              /> */}
              <div>
                <FileUploader
                  multiple={true}
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                  label="Arraste e solte uma imagem aqui ou clique para selecionar"
                />
                <p style={{ marginTop: "1rem" }}>
                  {file
                    ? `Nome do arquivo: ${file[0].name}`
                    : "Nenhum arquivo selecionado"}
                </p>
              </div>
              <S.SelectContainer>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  styles={styles}
                  myFontSize="20px"
                  className="basic-single"
                />
              </S.SelectContainer>
              <S.TextArea
                placeholder={"Descreva a imagem"}
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                justify={"center"}
                variant={"primary"}
                children={"Gerar Código"}
                isSelected={false}
                width={"100%"}
                onClick={handleClick}
              />
            </S.LeftContainer>
            <S.RightContainer>
              {response ? (
                <SyntaxHighlighter
                  wrapLines={true}
                  wrapLongLines={true}
                  
                  language={
                    selectedOption.value
                  }
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
                    Insira uma imagem e uma descrição para gerar seu código
                    usando IA
                  </Text>
                </div>
              )}
            </S.RightContainer>
          </S.Overflow>
        </S.ContainerCenter>
      </S.Center>
    </S.Container>
  );
};

export default CodeGeneration;
