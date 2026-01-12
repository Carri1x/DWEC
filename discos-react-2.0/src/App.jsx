import './App.css';
import Header from './shared/Header.jsx';
import Rutas from './routes/Rutas.jsx';
import ProveedorDiscos from './context/ProveedorDiscos.jsx';

function App() {

  return (
    <>
      <Header />
        <div>
          <ProveedorDiscos>
            <Rutas />
          </ProveedorDiscos>
        </div>
    </>
  )
}

export default App
