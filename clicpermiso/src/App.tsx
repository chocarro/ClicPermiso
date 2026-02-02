import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FormSolicitud from './componentes/FormSolicitud';
import MisAusencias from './componentes/MisAusencias';
import PerfilForm from './componentes/PerfilForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
     
          <Route path="sol-diurno" element={<FormSolicitud />} />
          <Route path="sol-vespertino" element={<FormSolicitud />} />
          
          <Route path="perfil" element={<PerfilForm />} />
          
          <Route path="solicitados" element={<MisAusencias />} />
          <Route path="ausencias" element={<MisAusencias />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;