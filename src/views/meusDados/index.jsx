import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import Aside from "../../components/aside";
import { useLogin } from "../../contex/authContex";
import Text from "../../components/text";
import CodeSnippet from "../../components/CodeSnippet";
import { ThreeCircles } from "react-loader-spinner";
import { db } from "../../utils/config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { CgCloseR } from "react-icons/cg";
import Swal from "sweetalert2";
const MeusDados = () => {
  const { title, user } = useLogin();
  const [data, setData] = useState([]);
  const [showCode, setShowCode] = useState();

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "code_documentation"));
    let newData = []; 
    querySnapshot.forEach((doc) => {
      const userId = doc.data().user_id;
      if (userId === user) {
        newData.push({
          data: doc.data().data,
          title: doc.data().title,
          id: doc.id,
        }); 
      }
    });
    setData(newData); 
  };
  useEffect(() => {
    fetchData();
  }, [user]);

  const generatePDF = (content) => {
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
      content,
      doc.internal.pageSize.getWidth() - 40
    );
    lines.forEach((line) => {
      yPosition = addText(line, yPosition);
    });

    doc.save("ai-code-analizer.pdf");
  };


  const removeFromFirestore = async (id) => {
    console.log(id)
    const docRef = doc(db, "code_documentation", id);

    try {

      await deleteDoc(docRef);
      fetchData()
      Swal.fire("Deletado com sucesso!!");

      console.log("Entire Document has been deleted successfully.");
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <S.Container>
      <ThreeCircles
        visible={false}
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
              Meus Documentos
            </Text>
          </S.ContainerTitle>

          <S.Overflow>
            <S.ListContainer>
              {data.map((item) => (
                <>
                  <S.Row>
                    <Text
                      as={"p"}
                      fontSize="1rem"
                      color="rgba(255, 255, 255, 0.8)"
                    >
                      {item.title}
                    </Text>
                    <div>
                      <S.Button onClick={() => generatePDF(item.data)}>
                        Baixar
                      </S.Button>
                      <S.Button onClick={() => setShowCode(item.data)}>
                        Exibir
                      </S.Button>
                      <S.Button onClick={() => removeFromFirestore(item.id)}>
                        Excluir
                      </S.Button>
                    </div>
                  </S.Row>
                </>
              ))}
            </S.ListContainer>
          </S.Overflow>
          {showCode && (
            <S.ModalContainer>
              <S.CloseButton onClick={() => setShowCode("")}>
                <CgCloseR size={25} color={"#E53D00"} />
              </S.CloseButton>
              <S.Overflow>
                <CodeSnippet fragment={showCode} />
              </S.Overflow>
            </S.ModalContainer>
          )}
        </S.ContainerCenter>
      </S.Center>
    </S.Container>
  );
};

export default MeusDados;
