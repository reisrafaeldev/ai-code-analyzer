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

const CodeDocumentation = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const nav = useNavigate();
  const api = axios.create({
    baseURL: apiUrl,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // const [fileContent, setFileContent] = useState(
  //   "Inicie o desenvolvimento para exibir seu código aqui!"
  // );
  const [response, setResponse] = useState("");
  const [fileContent, setFileContent] = useState(null);
  const { title, user } = useLogin();
  const [load, setLoad] = useState(false);
  const [tab, setTab] = useState([
    { id: 1, name: "Arquivo 1", code: "", selected: true },
  ]);
  const defaultData = "Os seguintes tópicos foram analisados: \n\n";
  console.log(user);
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
        console.log(data);
      };
      ws.onclose = (event) => {
      };
      ws.onerror = (error) => {
      };

      return () => {
        ws.close();
      };
    } catch (error) {
    }
  }, []);

  const handleClick = async () => {
    setLoad(true);
    const code = [];
    tab.map((item) => item.code && code.push(item.code));

    console.log("code", code.join(" "));
    try {
      const response = await api.post("/analisar_codigo", {
        prompt:
          "Considerando o trecho de código fornecido, elabore uma documentação detalhada que inclua: uma descrição geral do que o código faz; a explicação da lógica e estrutura subjacentes; detalhes sobre cada função, incluindo seus parâmetros, tipos de retorno e efeitos colaterais; exemplos de como usar as funções e componentes definidos no código; e potenciais casos de uso para este código. Destaque quaisquer padrões de design ou melhores práticas adotados. A documentação deve ser escrita de forma clara e concisa, em português, de modo a ser facilmente compreendida por outros desenvolvedores que possam trabalhar com este código no futuro.. Escreva a resposta em português",
        code: code.join(" "),
      });
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
        title: "teste"
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
              Documentação de Código
            </Text>
            <Button
              justify={"center"}
              variant={"primary"}
              children={"Documentar Código"}
              isSelected={false}
              width={"15rem"}
              onClick={handleClick}
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
                  <CodeSnippet fragment={defaultData + response} />
                  <Button
                    justify={"center"}
                    variant={"primary"}
                    children={"Salvar Documento"}
                    isSelected={false}
                    width={"15rem"}
                    onClick={handleSave}
                  />
                </>
              ) : (
                <div>
                  <Text
                    as={"h2"}
                    fontSize="1rem"
                    color="rgba(255, 255, 255, 0.8)"
                  >
                    Documente seu código usando IA
                  </Text>
                </div>
              )}
            </S.ContainerResponse>
          </S.Overflow>
        </S.ContainerCenter>
      </S.Center>
    </S.Container>
  );
};

export default CodeDocumentation;
