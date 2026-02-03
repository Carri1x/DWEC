import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import ProveedorSesion from './context/ProveedorSesion.jsx';
import ProveedorMensajes from './context/ProveedorMensajes.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProveedorMensajes>
        <ProveedorSesion>
          <App />
        </ProveedorSesion>
      </ProveedorMensajes>
    </BrowserRouter>
  </StrictMode>,
)
