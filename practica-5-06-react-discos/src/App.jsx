import './App.css';
import Header from './shared/Header.jsx';
import Rutas from './routes/Rutas.jsx';

function App() {

  return (
    <div className='contenedor-app'>
      <Header />
      <div className='contenedor-rutas'>
        <Rutas />
      </div>
    </div>
  )
}

export default App;
