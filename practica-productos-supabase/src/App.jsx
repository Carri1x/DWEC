import './App.css';
import useContextoSesion from './hooks/useContextoSesion.js';
import Rutas from './routes/Rutas';
import Header from './shared/Header.jsx';
import MensajeFlotante from './shared/MensajeFlotante.jsx';
import Menu from './shared/Menu.jsx';


function App() {

  const {sesionIniciada, mensajeSesion, eliminarMensajeSesion} = useContextoSesion();


  return (
    <>
      {
        mensajeSesion && <MensajeFlotante mensaje={mensajeSesion} funcion={eliminarMensajeSesion}/>
      }
      <Header />
      { sesionIniciada && <Menu /> }
      <Rutas />
    </>
  )
}

export default App;
