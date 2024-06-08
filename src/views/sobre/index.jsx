import React, { useEffect, useState } from "react";
import * as S from "./styles";
import Aside from "../../components/aside";
import Text from "../../components/text";
import { TEXT } from "./helpers";

const Sobre = () => {
  return (
    <S.Container>
      <S.Center>
        <Aside />
        <S.ContainerCenter>
          <S.ContainerTitle>
            <Text as={"h2"} fontSize="1.5rem" color="rgba(255, 255, 255, 0.8)">
              Sobre
            </Text>
          </S.ContainerTitle>
          <div dangerouslySetInnerHTML={{ __html: TEXT }} style={{ color: 'rgb(255, 255, 255)', fontSize: '1rem' }} />
          <Text as={"h3"} fontSize="1rem" color="rgba(255, 255, 255, 0.8)">
          © 2024   Desenvolvido por Rafael Reis de Oliveira
            </Text> 
        </S.ContainerCenter>
      
      </S.Center>
    </S.Container>
  );
};

export default Sobre;
