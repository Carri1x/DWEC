import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from '../pages/Inicio.jsx';
import Contacto from '../pages/Contacto.jsx';
import Peliculas from '../pages/Peliculas.jsx';
import AcercaDe from '../pages/AcercaDe.jsx';
import Error from "../pages/Error.jsx";
import Interpretes from "../pages/Interpretes.jsx";
import PeliculaDetalle from "../components/PeliculaDetalle.jsx";
import Galeria from "../pages/Galeria.jsx";
import FiltroCartelTitulo from "../components/Filtros/FiltroCartelTitulo.jsx";
import FiltroCartelInterprete from "../components/Filtros/FiltroCartelInterprete.jsx";
import FiltroCartelDirector from "../components/Filtros/FiltroCartelDirector.jsx";


const Rutas = () => {
    return (
    <>
        <Routes>
            <Route path="/" element={<Inicio />}/>
            <Route path="/contacto" element={<Contacto />}/>
            <Route path="/peliculas" element={<Peliculas />}/>
            <Route path="/acerca-de" element={<AcercaDe />}/>
            <Route path="/interpretes" element={<Interpretes />}/>
            <Route path={`/pelicula/:titulo`} element={<PeliculaDetalle />} />
            <Route path="/galeria/" element={<Galeria />}>
                <Route path="/galeria/titulo" element={<FiltroCartelTitulo />} />
                <Route path="/galeria/interprete" element={<FiltroCartelInterprete />}/> 
                <Route path="/galeria/director" element={<FiltroCartelDirector />}/> 
            </Route>
            <Route path="*" element={<Error />}/>
            <Route /> 
        </Routes>
    </>
    );
}

export default Rutas;