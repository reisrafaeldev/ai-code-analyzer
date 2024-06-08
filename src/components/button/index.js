import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { DiGoogleAnalytics } from "react-icons/di";
import { RiGitRepositoryCommitsFill } from "react-icons/ri";
import { IoMdDocument } from "react-icons/io";

import {
  MdOutlineNearbyError,
  MdOutlineAutoGraph,
  MdDesignServices,
} from "react-icons/md";
import { TbFileAnalytics } from "react-icons/tb";
import { BsArrowRightSquare } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { ThreeCircles } from "react-loader-spinner";

const Button = ({
  type,
  href,
  width,
  load=false,
  height,
  margin,
  justify,
  variant,
  onClick,
  children,
  iconType,
  background,
  isSelected,
}) => {
  const nav = useNavigate();

  const handleIcons = (type) => {
    switch (type) {
      case "analise":
        return <DiGoogleAnalytics size={30} color={"#E53D00"} />;

      case "desempenho":
        return <VscGraph size={27} color={"#E53D00"} />;

      case "erros":
        return <MdOutlineNearbyError size={30} color={"#E53D00"} />;

      case "analiseSemantica":
        return <TbFileAnalytics size={30} color={"#E53D00"} />;

      case "design":
        return <MdDesignServices size={30} color={"#E53D00"} />;

      case "documentos":
        return <IoMdDocument size={30} color={"#E53D00"} />;

      case "repositorio":
        return <RiGitRepositoryCommitsFill size={30} color={"#E53D00"} />;

      case "sair":
        return <BsArrowRightSquare size={25} color={"#E53D00"} />;

      default:
        return <DiGoogleAnalytics size={30} color={"#E53D00"} />;
    }
  };

  switch (variant) {
    case "primary":
      return (
        <S.LoadContainer>
          <S.Button
            justify={justify}
            type={type}
            width={width}
            height={height}
            margin={margin}
            background={background}
            onClick={onClick}
            variant={variant}
          >
            {children}
          </S.Button>
          <S.Load
            visible={load}
            height="25"
            width="25"
            color="#fff"
            ariaLabel="loading"
            wrapperStyle={{}}
            wrapperClass="loading"
            
          />
        </S.LoadContainer>
      );

    case "secondary":
      return (
        <S.Button
          isSelected={isSelected}
          type={type}
          width={width}
          height={height}
          justify={justify}
          margin={margin}
          background={background}
          onClick={onClick}
          variant={variant}
        >
          {handleIcons(iconType)}
          <p>{children}</p>
        </S.Button>
      );
    default:
      return (
        <S.Button
          isSelected={isSelected}
          type={type}
          height={height}
          width={width}
          justify={justify}
          margin={margin}
          background={background}
          onClick={onClick}
          variant={variant}
        >
          {handleIcons(iconType)}
          <p>{children}</p>
        </S.Button>
      );
  }
};

export default Button;
