import {Routes, Route} from 'react-router-dom';
import Inicio from '../pages/Inicio.jsx';
import InsertarDisco from '../components/InsertarDisco.jsx';
import ListaDiscos from '../pages/ListaDiscos.jsx';
import EditarDisco from '../pages/EditarDisco.jsx';


const Rutas = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/insertar-disco" element={<InsertarDisco/>}/>
                <Route path="/lista-discos" element={<ListaDiscos/>} />
                <Route path="/editar-disco/:id" element={<EditarDisco />} />
            </Routes>
        </>
    );
}

export default Rutas;