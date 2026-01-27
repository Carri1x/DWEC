import ProveedorProductos from "../context/ProovedorProductos";
import { Outlet } from "react-router-dom";
import MenuProductos from "../shared/MenuProductos.jsx";

const PaginaProductos = () => {


  return (
    <>
      <MenuProductos />
        <ProveedorProductos>
            <Outlet/>
        </ProveedorProductos>
    </>
  );
};

export default PaginaProductos;
