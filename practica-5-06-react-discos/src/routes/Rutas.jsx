import {Routes, Route} from 'react-router-dom';
import Inicio from '../pages/Inicio.jsx';
import InsertarDisco from '../components/InsertarDisco.jsx';
import ListaDiscos from '../pages/ListaDiscos.jsx';


const Rutas = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/insertar-disco" element={<InsertarDisco/>}/>
                <Route path="/lista-discos" element={<ListaDiscos/>} />
            </Routes>
        </>
    );
}

export default Rutas;