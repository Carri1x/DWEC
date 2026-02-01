import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import Inicio from "../pages/Inicio.jsx";
import ListadoProductos from '../components/ListadoProductos.jsx'
import PaginaProductos from "../pages/PaginaProductos.jsx";
import CrearProducto from "../components/CrearProducto.jsx";
import EditarProducto from "../components/EditarProducto.jsx";

const Rutas = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Inicio />}/>
                <Route path="*" element={<Inicio />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register />} />
                <Route path="/sup" element={<PaginaProductos />}>
                    <Route path="listado-productos" element={<ListadoProductos />}/>
                    <Route path="crear-producto" element={<CrearProducto/>} />
                    <Route path="editar-producto/:idProducto" element={<EditarProducto/>} />
                </Route>
            </Routes>
        </>
    );
};

export default Rutas;