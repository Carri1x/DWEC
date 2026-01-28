import "./App.css";
import useContextoSesion from "./hooks/useContextoSesion.js";
import Rutas from "./routes/Rutas";
import Footer from "./shared/Footer.jsx";
import Header from "./shared/Header.jsx";
import MensajeFlotante from "./shared/MensajeFlotante.jsx";
import Menu from "./shared/Menu.jsx";
import ProveedorProductos from "./context/ProovedorProductos";

function App() {
  const { mensajeSesion, eliminarMensajeSesion } = useContextoSesion();

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
        <ProveedorProductos>
          <Rutas />
        </ProveedorProductos>
      </main>
      <Footer />
    </>
  );
}
export default App;
