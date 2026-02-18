import "./Header.css";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import IconoUsuario from "./IconoUsuario.jsx";

const Header = () => {

  const navegar = useNavigate();

  const navegarInicio = () => {
    navegar("/");
  };

  

  return (
    <div className="contenedor-header">
      <div className="header-info" onClick={() => {
          navegarInicio();
        }}
      >
        <img src={logo} alt="Logo de la página" />
        <h1>productos supabase</h1>
      </div>

      <IconoUsuario />
    </div>
  );
};

export default Header;
