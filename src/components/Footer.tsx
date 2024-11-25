import SocialMediaFooter from "./SocialMediaFooter";
import { HiChevronDown } from "react-icons/hi2";


const Footer = () => {
  return (
    <>
      <SocialMediaFooter />
      <footer className="max-w-screen-2xl mx-auto border-b-8 border-secondaryBrown px-5 max-[400px]:px-3">
        <div className="flex justify-center gap-24 text-center mt-12 max-[800px]:flex-col max-[800px]:gap-10">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold max-sm:text-xl">Atendimento ao Cliente</h3>
            <p className="text-lg max-sm:text-base">Serviço pós-venda</p>
            <p className="text-lg max-sm:text-base">Seguro Gratuito</p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold max-sm:text-xl">Nossa Marca</h3>
            <p className="text-lg max-sm:text-base">A Empresa</p>
            <p className="text-lg max-sm:text-base">A Excelência</p>
            <p className="text-lg max-sm:text-base"></p>
            <p className="text-lg max-sm:text-base"></p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold max-sm:text-xl">Roupas de luxo</h3>
            <p className="text-lg max-sm:text-base">Edição Especial</p>
            <p className="text-lg max-sm:text-base">Edição de verão</p>
            <p className="text-lg max-sm:text-base">Coleção Única</p>
          </div>
        </div>
        <div className="flex flex-col gap-8 my-20">
          <p className="flex justify-center items-center text-2xl gap-2 max-sm:text-xl"> <HiChevronDown /></p>
          <h2 className="text-6xl font-light text-center max-sm:text-5xl">FASHION</h2>
          <p className="text-base text-center max-sm:text-sm">Alunos BCC UNAMA</p>
          <ul className="flex justify-center items-center gap-7 text-base max-sm:text-sm max-[350px]:flex-col max-[350px]:gap-5">
            <li>Política de Cookies</li>
            <li>política de Privacidade</li>
            <li>Notas Legais</li>
          </ul>
        </div>
      </footer>
    </>
  );
};
export default Footer;
