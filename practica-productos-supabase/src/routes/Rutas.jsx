import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import Inicio from "../pages/Inicio.jsx";
import ListadoProductos from '../components/ListadoProductos.jsx'
import PaginaInicialProductos from "../pages/PaginaInicialProductos.jsx";
import CrearProducto from "../components/CrearProducto.jsx";
import EditarProducto from "../components/EditarProducto.jsx";
import ListaCompraDetalles from "../components/ListaCompraDetalles.jsx";
import PaginaListasYProductos from "../pages/PaginaListasYProductos.jsx";

const Rutas = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Inicio />}/>
                <Route path="*" element={<Inicio />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register />} />
                <Route path="/sup" element={<PaginaInicialProductos />}>
                    <Route path="crear-producto" element={<CrearProducto/>} />
                    <Route path="editar-producto/:idProducto" element={<EditarProducto/>} />

                    <Route path="lyp" element={<PaginaListasYProductos/>}>
                        <Route path="listado-productos" element={<ListadoProductos />}/>
                        <Route path="lista-compra/:idLista" element={<ListaCompraDetalles/>}></Route>
                        <Route path="lista-compra/" element={<ListaCompraDetalles/>}></Route>
                    </Route>
                    
                </Route>
            </Routes>
        </>
    );
};

export default Rutas;