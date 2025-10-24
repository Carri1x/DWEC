import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from '../pages/Inicio/Inicio.jsx';
import Contacto from '../pages/Contacto/Contacto.jsx';
import Peliculas from '../pages/Peliculas/Peliculas.jsx';
import AcercaDe from '../pages/AcercaDe/AcercaDe.jsx';
import Error from "../pages/Error/Error.jsx";
import Interpretes from "../pages/Interpretes.jsx";
import PeliculaDetalle from "../components/PeliculaDetalle.jsx";


const Rutas = () => {
    return (
    <>
        <Routes>
            <Route path="/" element={<Inicio />}/>
            <Route path="/contacto" element={<Contacto />}/>
            <Route path="/peliculas" element={<Peliculas />}/>
            <Route path="/acerca-de" element={<AcercaDe />}/>
            <Route path="/interpretes" element={<Interpretes />}/>
            <Route path={`/pelicula/:title`} element={<PeliculaDetalle />} />
            <Route path="*" element={<Error />}/>
            <Route /> 
        </Routes>
    </>
    );
}

export default Rutas;