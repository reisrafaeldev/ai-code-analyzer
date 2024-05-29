import React, { useEffect, useState } from "react";
import * as S from "./styles";
import Aside from "../../components/aside";
import Text from "../../components/text";

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
        </S.ContainerCenter>
      </S.Center>
    </S.Container>
  );
};

export default Sobre;
