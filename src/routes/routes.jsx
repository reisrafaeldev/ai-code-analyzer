import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "../views/home";
import Register from "../views/register";
import Login from "../views/login";
import { LoginContexProvider } from "../contex/authContex";
import Desempenho from "../views/desempenho";
import Semantica from "../views/semantica";
import AnaliseEstatica from "../views/analiseEstatica";
import CodeGeneration from "../views/codeGeneration";
import Auth from "../utils/config/auth";
import RecoveryLogin from "../views/recovery";
import CodeDocumentation from "../views/codeDocumentation";
import MyData from "../views/myData";

const Rotas = () => {
  return (
    <BrowserRouter>
      <LoginContexProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={ <Auth><Home /></Auth>} />
            <Route path="/desempenho" element={<Auth><Desempenho /></Auth>} />
            <Route path="/semantica" element={<Auth><Semantica /></Auth>} />
            <Route path="/register" element={<Register />} />
            <Route path="/recovery" element={<RecoveryLogin />} />
            <Route path="/analise-estatica" element={<Auth><AnaliseEstatica /></Auth>} />
            <Route path="/code-documentation" element={<Auth><CodeDocumentation /></Auth>} />
            <Route path="/code-generation" element={<Auth><CodeGeneration /></Auth>} />
            <Route path="/data" element={<Auth><MyData /></Auth>} />
          </Routes>
      </LoginContexProvider>
    </BrowserRouter>
  );
};
export default Rotas;
