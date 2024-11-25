import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { checkRegisterFormData } from "../utils/checkRegisterFormData";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    if (!checkRegisterFormData(data)) return;

   
    const users = await customFetch.get("/users");
    const userExists = users.data.some(
      (user: { email: string }) => user.email === data.email
    );
    if (userExists) {
      toast.error("User with this email already exists");
      return;
    }

    
    const response = await customFetch.post("/users", data);
    if (response.status === 201) {
      toast.success("User registered successfully");
      navigate("/login");
    } else {
      toast.error("An error occurred. Please try again");
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto pt-24 flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="max-w-5xl mx-auto flex flex-col gap-5 max-sm:gap-3 items-center justify-center max-sm:px-5"
      >
        <h2 className="text-5xl text-center mb-5 font-thin max-md:text-4xl max-sm:text-3xl max-[450px]:text-xl max-[450px]:font-normal">
        Bem-vindo! Cadastre-se aqui:
        </h2>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Seu nome</label>
            <input
              type="text"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder="Enter name"
              id="name"
              name="name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastname">Seu sobrenome</label>
            <input
              type="text"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder="Enter lastname"
              id="lastname"
              name="lastname"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Seu Email</label>
            <input
              type="email"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder="Enter email address"
              id="email"
              name="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Sua Senha</label>
            <input
              type="password"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder="Enter password"
              id="password"
              name="password"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirma sua Senha</label>
            <input
              type="password"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder="Confirm password"
              id="confirmPassword"
              name="confirmPassword"
            />
          </div>
        </div>
        <Button type="submit" text="Registrar" mode="brown" />
        <Link
          to="/login"
          className="text-xl max-md:text-lg max-[450px]:text-sm"
        >
          Já tem uma conta?{" "}
          <span className="text-secondaryBrown">Faça login agora</span>.
        </Link>
      </form>
    </div>
  );
};
export default Register;
