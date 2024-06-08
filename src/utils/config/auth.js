import { useEffect } from "react";
import { useLogin } from "../../contex/authContex";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
  const { user } = useLogin();
  const nav = useNavigate();
  const userStorage = localStorage.getItem("user");
  useEffect(() => {
    if (!user || !userStorage) {
      nav("/");
    }
  }, [user, nav]);

  return <>{children}</>;
};

export default Auth;
