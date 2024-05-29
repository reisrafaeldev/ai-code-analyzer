import { Route, BrowserRouter, Routes } from "react-router-dom";
import AutoAnalise from "../views/autoAnalise";
import Register from "../views/register";
import Login from "../views/login";
import { LoginContexProvider } from "../contex/authContex";
import Desempenho from "../views/sobre";
import Semantica from "../views/semantica";
import AnaliseEstatica from "../views/analiseEstatica";
import Auth from "../utils/config/auth";
import RecoveryLogin from "../views/recovery";
import MeusDados from "../views/meusDados";
import Sobre from "../views/sobre";

const Rotas = () => {
  return (
    <BrowserRouter>
      <LoginContexProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/auto-analise"
            element={
              <Auth>
                <AutoAnalise />
              </Auth>
            }
          />
          <Route
            path="/desempenho"
            element={
              <Auth>
                <Desempenho />
              </Auth>
            }
          />
          <Route
            path="/semantica"
            element={
              <Auth>
                <Semantica />
              </Auth>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/recovery" element={<RecoveryLogin />} />
          <Route
            path="/analise-estatica"
            element={
              <Auth>
                <AnaliseEstatica />
              </Auth>
            }
          />
          <Route
            path="/data"
            element={
              <Auth>
                <MeusDados />
              </Auth>
            }
          />
          <Route
            path="/sobre"
            element={
              <Auth>
                <Sobre />
              </Auth>
            }
          />
        </Routes>
      </LoginContexProvider>
    </BrowserRouter>
  );
};
export default Rotas;
