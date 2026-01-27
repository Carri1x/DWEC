import "./App.css";
import useContextoSesion from "./hooks/useContextoSesion.js";
import Rutas from "./routes/Rutas";
import Footer from "./shared/Footer.jsx";
import Header from "./shared/Header.jsx";
import MensajeFlotante from "./shared/MensajeFlotante.jsx";
import Menu from "./shared/Menu.jsx";

function App() {
  const { sesionIniciada, mensajeSesion, eliminarMensajeSesion } = useContextoSesion();

  return (
    <>
      {mensajeSesion && (
        <MensajeFlotante
          mensaje={mensajeSesion}
          funcion={eliminarMensajeSesion}
        />
      )}
      <Header />
      <Menu />
      <main className="rutas-container">
        <Rutas />
      </main>
      <Footer />
    </>
  );
}
export default App;
