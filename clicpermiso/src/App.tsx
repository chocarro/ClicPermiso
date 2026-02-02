import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout'; // Asegúrate de tener este archivo para el Sidebar
import FormSolicitud from './componentes/FormSolicitud';
import MisAusencias from './componentes/MisAusencias';
import PerfilForm from './componentes/PerfilForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
     

          {/* Rutas para los formularios de solicitud */}
          <Route path="sol-diurno" element={<FormSolicitud />} />
          <Route path="sol-vespertino" element={<FormSolicitud />} />
          
          {/* Ruta para el perfil */}
          <Route path="perfil" element={<PerfilForm />} />
          
          {/* Rutas para las ausencias y días solicitados */}
          <Route path="solicitados" element={<MisAusencias />} />
          <Route path="ausencias" element={<MisAusencias />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;