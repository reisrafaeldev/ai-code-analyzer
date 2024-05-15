import * as S from "./load.styles";

import { ThreeCircles } from "react-loader-spinner";

const Load = ({ active }) => {
  return (
    <S.Section active={active}>
      <ThreeCircles
        visible={true}
        height="80"
        width="80"
        color="#fff"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </S.Section>
  );
};

export default Load;
