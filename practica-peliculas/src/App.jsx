import './App.css'
import Rutas from './Router/Rutas.jsx';
import Header from './shared/Header.jsx';
import Nav from './shared/Nav.jsx';
import Footer from './shared/Footer.jsx';

function App() {

  return (
    <>
      <Header />
      <div className='contenedor-contenido-nav'>
        <Nav />
        <div className='contenedor-rutas'>
          {/*He tenido que poner este div para que el contenedor-contenido-nav 
          no afecte el flex que tiene en el contenido de mis rutas,
          una locura... */}
          <Rutas /> 
        </div>
      </div>
      <Footer />

    </>
  );
}

export default App;
