import { useEffect } from "react";
import { useLogin } from "../../contex/authContex";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
  const { user } = useLogin();
  const nav = useNavigate();
  const userStorage = localStorage.getItem("user");

  useEffect(() => {
    // Use useEffect para chamar navigate apenas depois que o componente foi renderizado.
    if (!user && !userStorage) {
      nav("/");
    }
  }, [user, nav]);

  // Renderize o conteúdo normalmente, mesmo que o usuário não esteja autenticado.
  return <>{children}</>;
};

export default Auth;
