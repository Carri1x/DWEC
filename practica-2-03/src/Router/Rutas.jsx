import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from '../pages/Inicio/Inicio.jsx';
import Contacto from '../pages/Contacto/Contacto.jsx';
import Peliculas from '../pages/Peliculas/Peliculas.jsx';
import AcercaDe from '../pages/AcercaDe/AcercaDe.jsx';
import Error from "../pages/Error/Error.jsx";


const Rutas = () => {
    return (
    <>
        <Routes>
            <Route path="/" element={<Inicio />}/>
            <Route path="/contacto" element={<Contacto />}/>
            <Route path="/peliculas" element={<Peliculas />}/>
            <Route path="/acerca-de" element={<AcercaDe />}/>
            <Route path="*" element={<Error />}/>
            <Route /> 
        </Routes>
    </>
    );
}

export default Rutas;