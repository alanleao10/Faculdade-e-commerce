import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { checkLoginFormData } from "../utils/checkLoginFormData";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Obtém dados do formulário
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    //Verifica se os dados do formulário são válidos
    if (!checkLoginFormData(data)) return;
    
    //Verifica se existe usuário com email e senha
    const users = await customFetch.get("/users");
    let userId: number = 0; // Inicialize userId com um valor padrão
    const userExists = users.data.some(
      (user: { id: number; email: string; password: string }) => {
        if (user.email === data.email) {
          userId = user.id;
        }
        return user.email === data.email && user.password === data.password;
      }
    );
    
    // se o usuário existir, mostra mensagem de sucesso
    if (userExists) {
      toast.success("You logged in successfully");
      localStorage.setItem("user", JSON.stringify({...data, id: userId}));
      store.dispatch(setLoginStatus(true));
      navigate("/user-profile");
      return;
    } else {
      toast.error("Please enter correct email and password");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      toast.success("You are already logged in");
      navigate("/user-profile");
    }
  }, [navigate]);

  return (
    <div className="max-w-screen-2xl mx-auto pt-24 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="max-w-5xl mx-auto flex flex-col gap-5 max-sm:gap-3 items-center justify-center max-sm:px-5"
      >
        <h2 className="text-5xl text-center mb-5 font-thin max-md:text-4xl max-sm:text-3xl max-[450px]:text-xl max-[450px]:font-normal">
          Bem vindo de volta
        </h2>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Seu e-mail</label>
            <input
              type="email"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder="Enter email address"
              name="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Sua Senha</label>
            <input
              type="password"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder="Enter password"
              name="password"
            />
          </div>
        </div>
        <Button type="submit" text="Login" mode="brown" />
        <Link
          to="/register"
          className="text-xl max-md:text-lg max-[450px]:text-sm"
        >
          Não tem uma conta?{" "}
          <span className="text-secondaryBrown">Crie agora</span>.
        </Link>
      </form>
    </div>
  );
};
export default Login;
