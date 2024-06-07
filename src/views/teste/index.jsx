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
import { fetchRepositoryFiles, line, options, optionsAc } from "./helpers";
import { fetchChatGPTResponse } from "../../utils/config/openai";
import Chart from "../../components/chat";
import InputComponent from "../../components/input";
import { aiGeneration } from "../../utils/analise";

const Teste = () => {
  const bardApiUrlComplexidade = axios.create({
    baseURL: "http://127.0.0.1:1100",
  });
  const bardApiUrlAcoplamento = axios.create({
    baseURL: "http://127.0.0.1:1200",
  });
  const bardApiUrl = process.env.REACT_APP_API_URL;
  const defaultData = "Os seguintes tópicos foram analisados: \n\n";

  let provider = sessionStorage.getItem("iaOption");
  // );
  const [response, setResponse] = useState("");
  const [fileContent, setFileContent] = useState([]);
  const { title, user } = useLogin();
  const [load, setLoad] = useState(false);
  const [fileName, setFileName] = useState();
  const [complexidade, setComplexidade] = useState();
  const [acoplamento, setAcoplamento] = useState();
  const [documentName, setDocumentName] = useState();
  const [count, setCount] = useState(0);
  const [data, setData] = useState({ link: "", token: "" });
  const [responseData, setResponseData] = useState([]);
  const [files, setFiles] = useState([]);
  const [emptyResponseCount, setEmptyResponseCount] = useState(0);
  console.log(responseData);
  useEffect(() => {
    if (responseData.length >=1) {
      const combinedContent = responseData
        .map(
          (item) => `Caminho do arquivo: ${item.name}\n\n ${item.content}${line}`
        )
        .join("\n\n");
      setResponse(combinedContent);
      console.log(combinedContent);
      setLoad(false);
      console.log("Carregamento concluído");
    }
  }, [responseData]);

  // const handleFileChange = (event, id) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       const content = e.target.result;
  //       setTab((prevTabs) =>
  //         prevTabs.map((t) => ({
  //           ...t,
  //           code: t.id === id ? content : t.code,
  //         }))
  //       );
  //     };
  //     reader.readAsText(file);
  //   }
  // };

  const saveData = async () => {
    if (documentName) {
      setLoad(true);

      try {
        const docRef = await addDoc(collection(db, "code_documentation"), {
          user_id: user,
          data: defaultData + response,
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
  console.log(response);
  console.log(responseData);
  console.log(responseData.length);

  const handleRepository = () => {
    if (data.link && data.token) {
      fetchRepositoryFiles(data).then((data) => {
        if (data) {
          setFiles(data);
        }
      });
    } else {
      Swal.fire("Preencha todos os campos para analisar!!");
    }
  };

  const handleAnalyser = async () => {
    setLoad(true);
    setCount(0); // Reinicia o contador de arquivos processados
    setEmptyResponseCount(0); // Reinicia o contador de respostas vazias
  
    if (files.length >= 1) {
      let newResponses = []; // Para armazenar as respostas válidas
  
      for (const file of files) {
        try {
          const response = await aiGeneration(P.DOCUMENTACAO_PROMPT, file.content);
          if (response.trim() !== "") {
            newResponses.push({ name: file.name, content: response });
            setResponseData(prev => [...prev, { name: file.name, content: response }]);
            setCount(prevCount => prevCount + 1); 
          } else {
            setEmptyResponseCount(prevCount => prevCount + 1); 
          }
        } catch (error) {
          console.error("Erro durante a análise do arquivo:", file.name, error);
        }
      }
  
      setLoad(false);
    } else {
      Swal.fire("Preencha todos os campos para analisar!!");
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
              Analise Estática - GitHub
            </Text>
            <Button
              justify={"center"}
              variant={"primary"}
              children={"Analisar Código"}
              isSelected={false}
              width={"15rem"}
              height={"3rem"}
              onClick={() => {}}
            />
          </S.ContainerTitle>

          <S.ContainerInput>
            <InputComponent
              type="email"
              label="Link do repositório"
              onChangeText={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  link: e.target.value.trim(),
                }))
              }
              required
            />
            <InputComponent
              type="password"
              label="GitHub Token"
              onChangeText={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  token: e.target.value.trim(),
                }))
              }
              required
            />
            <Button
              justify={"center"}
              variant={"primary"}
              children={"Salvar"}
              isSelected={false}
              width={"10%"}
              margin={"0 0 14px"}
              height={"3rem"}
              onClick={handleRepository}
            />
          </S.ContainerInput>
          {files.length >= 1 && (
            <>
              <Text as={"h2"} fontSize="1rem" color="rgba(255, 255, 255, 0.8)">
                Total de arquivos no repositório: {files.length}
              </Text>
              <Text as={"h2"} fontSize="1rem" color="rgba(15, 251, 94, 0.8)">
                Total de arquivos analisados: {count + emptyResponseCount}
              </Text>
              <Text as={"h2"} fontSize="1rem" color="rgba(243, 9, 9, 0.8)">
                Total de arquivos analisados com falha: {emptyResponseCount}
              </Text>
              <Button
                justify={"center"}
                variant={"primary"}
                children={"Iniciar Analise de Código"}
                isSelected={false}
                width={"100%"}
                height={"3rem"}
                onClick={handleAnalyser}
              />
            </>
          )}
          <S.Overflow>
            <S.ContainerResponse>
              {responseData.length >= 1 ? (
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

                  <Text
                    as={"h3"}
                    fontSize="1.5rem"
                    margin={"1rem"}
                    color="rgba(255, 255, 255, 0.8)"
                  >
                    Seu Código
                  </Text>
                  <CodeSnippet fragment={defaultData + response} />
                </>
              ) : null}
            </S.ContainerResponse>
          </S.Overflow>
        </S.ContainerCenter>
      </S.Center>
    </S.Container>
  );
};

export default Teste;
