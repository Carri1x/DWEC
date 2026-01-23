import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import Inicio from "../pages/Inicio.jsx";
import ListadoProductos from '../components/ListadoProductos.jsx'

const Rutas = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Inicio />}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register />} />
                <Route path="/listado-productos" element={<ListadoProductos />}/>
                <Route path="*" element={<Inicio />} />
            </Routes>
        </>
    );
};

export default Rutas;