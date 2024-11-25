import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import customFetch from "../axios/custom";
import { checkUserProfileFormData } from "../utils/checkUserProfileFormData";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  const logout = () => {
    toast.error("Desconectado com sucesso");
    localStorage.removeItem("user");
    store.dispatch(setLoginStatus(false));
    navigate("/login");
  };

  const fetchUser = async (userId: number | string) => {
    const response = await customFetch(`/users/${userId}`);
    setUser(response.data);
  };

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Obtém dados do formulário
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    //Verifica se os dados do formulário são válidos
    if (!checkUserProfileFormData(data)) return;
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
    if (userId) {
      try {
        await customFetch.put(`/users/${userId}`, data);
      } catch (e) {
        toast.error("Falha na atualização do usuário");
        return;
      }
      toast.success("Usuário atualizado com sucesso");
    } else {
      toast.error("Faça login para visualizar esta página");
      navigate("/login");
    }
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
    if (!userId) {
      toast.error("Faça login para visualizar esta página");
      navigate("/login");
    } else {
      fetchUser(userId);
    }
  }, [navigate]);
  return (
    <div className="max-w-screen-lg mx-auto mt-24 px-5">
      <h1 className="text-3xl font-bold mb-8">Perfil de usuário</h1>
      <form className="flex flex-col gap-6" onSubmit={updateUser}>
        <div className="flex flex-col gap-1">
          <label htmlFor="firstname">Primeiro nome</label>
          <input
            type="text"
            className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
            placeholder="Enter first name"
            id="firstname"
            name="name"
            defaultValue={user?.name}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lastname">Sobrenome</label>
          <input
            type="text"
            className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
            placeholder="Enter last name"
            id="lastname"
            name="lastname"
            defaultValue={user?.lastname}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
            placeholder="Enter email address"
            id="email"
            name="email"
            defaultValue={user?.email}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
            placeholder="Enter password"
            id="password"
            name="password"
            defaultValue={user?.password}
          />
        </div>
        <Button type="submit" text="Update Profile" mode="brown" />
        <Link
          to="/order-history"
          className="bg-white text-black text-center text-xl border border-gray-400 font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base"
        >
          Histórico de pedidos
        </Link>
        <Button onClick={logout} text="Logout" mode="white" />
      </form>
    </div>
  );
};

export default UserProfile;