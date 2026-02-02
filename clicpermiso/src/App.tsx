import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './componentes/Layout'; 
import FormSolicitud from './componentes/FormSolicitud';
import MisAusencias from './componentes/MisAusencias';
import PerfilForm from './componentes/PerfilForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/sol-diurno" />} />
          
          {/* Ambas rutas usan el MISMO componente FormSolicitud */}
          <Route path="sol-diurno" element={<FormSolicitud />} />
          <Route path="sol-vespertino" element={<FormSolicitud />} />
          
          <Route path="perfil" element={<PerfilForm />} />
          <Route path="solicitados" element={<MisAusencias />} />
          <Route path="ausencias" element={<MisAusencias />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;