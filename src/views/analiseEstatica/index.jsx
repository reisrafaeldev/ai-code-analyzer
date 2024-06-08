import React, { useEffect, useState } from "react";
import * as S from "./styles";
import * as P from "../../utils/config/prompt";
import Aside from "../../components/aside";
import { useLogin } from "../../contex/authContex";
import Text from "../../components/text";
import Button from "../../components/button";
import Load from "../../components/load";
import CodeSnippet from "../../components/CodeSnippet";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/config/firebase";
import Swal from "sweetalert2";
import InputComponent from "../../components/input";
import { aiAutoGeneration, aiComplexidadeAnalyser } from "../../utils/analise";

const AnaliseEstatica = () => {
  const { user } = useLogin();
  const [response, setResponse] = useState("");
  const [fileContent, setFileContent] = useState(null);
  const [load, setLoad] = useState(false);
  const [fileName, setFileName] = useState();
  const [complexidade, setComplexidade] = useState();
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

  const handleSubmit = async () => {
    setLoad(true);
    const code = tab.map((item) => item.code).join(" ");
    handleComplexidade(code);

    try {
      const response = await aiAutoGeneration(
        P.ANALISE_PROMPT,
        JSON.stringify(code)
      );
      setLoad(false);
      setResponse(response);
      handelResultChange(response);
    } catch (error) {
      setLoad(false);
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

  const handleComplexidade = async (code) => {
    try {
      const response = await aiComplexidadeAnalyser(
        P.COMPLEXIDADE_PROMPT,
        code
      );
      P.extrairComplexidade(response, setComplexidade);
    } catch (error) {}
  };
  useEffect(() => {}, []);

  const handelResultChange = (code) => {
    // Primeiro, criar um novo array onde todos os itens estão com selected: false
    const updatedTabs = tab.map((item) => ({
      ...item,
      selected: false,
    }));

    // Adicionar a nova aba "Resultado da Análise" no início do array com selected: true
    const newTab = {
      id: updatedTabs.length + 1, // Você pode querer um sistema de identificação melhor
      name: "Resultado da Análise",
      code: code,
      selected: true,
    };

    // Definindo a nova aba como a primeira do array e atualizando o estado
    setTab([newTab, ...updatedTabs]);
  };
  return (
    <S.Container>
      <Load active={load}></Load>
      <S.Center>
        <Aside
          chartData={chartData}
          fileName={fileName}
          isResponse={!!complexidade}
        />
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
          {response
            ? tab.map(
                (item, key) =>
                  item.selected &&
                  item.name === "Resultado da Análise" && (
                    <>
                      <S.ContainerResponseHeader key={key}>
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
                            onChangeText={(e) =>
                              setDocumentName(e.target.value)
                            }
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
                      <S.Overflow>
                        <CodeSnippet fragment={defaultData + response} key={key} />
                      </S.Overflow>
                    </>
                  )
              )
            : null}

          {tab.map((item ,key) =>
            item.selected && item.name !== "Resultado da Análise" ? (
              <S.Overflow key={key}>
                <S.ContainerFile >
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
                  <Text
                    as={"h2"}
                    fontSize="1rem"
                    color="rgba(255, 255, 255, 0.8)"
                  >
                    Analise seu código usando IA
                  </Text>
                </S.ContainerFile>
              </S.Overflow>
            ) : null
          )}
        </S.ContainerCenter>
      </S.Center>
    </S.Container>
  );
};

export default AnaliseEstatica;
