import "./App.css";
import Rutas from "./routes/Rutas";
import Footer from "./shared/Footer.jsx";
import Header from "./shared/Header.jsx";
import Menu from "./shared/Menu.jsx";
import ProveedorProductos from "./context/ProovedorProductos";
import ProveedorListaCompra from "./context/ProveedorListaCompra.jsx";
import useContextoSesion from "./hooks/useContextoSesion.js";
import Cargando from "./shared/Cargando.jsx";

function App() {

  const {cargando} = useContextoSesion();

  return (
    <>
    {cargando && <Cargando />}
      <Header />
      <Menu />
      <main className="rutas-container">
        <ProveedorProductos>
          <ProveedorListaCompra>
            <Rutas />
          </ProveedorListaCompra>
        </ProveedorProductos>
      </main>
      <Footer />
    </>
  );
}
export default App;
