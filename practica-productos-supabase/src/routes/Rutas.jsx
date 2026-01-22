import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import Inicio from "../pages/Inicio.jsx";
import { Routes, Route } from "react-router-dom";

const Rutas = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Inicio />}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
};

export default Rutas;