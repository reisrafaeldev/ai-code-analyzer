import * as S from "./styles";
import Image from "../image";
import Logo from "../../assets/logo-marca.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <S.Container>
      <Image src={Logo} width={"190px"} />
      <S.NavegationBar>
        <ul>
          <li>
            <Link to="/sobre">Métricas</Link>
          </li>
          <li>
            <Link to="/contato">Relatórios</Link>
          </li>
          <li>
            <Link to="/contato">Configurações</Link>
          </li>
          <li>
            <Link to="/contato">Sobre</Link>
          </li>
        </ul>
      </S.NavegationBar>
    </S.Container>
  );
};

export default Header;
