import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import SolDiaDiurno from './pages/SolDiaDiurno';
import SolDiaVespertino from './pages/SolDiaVespertino';
import MiPerfil from './pages/MiPerfil';
import DiasSolicitados from './pages/DiasSolicitados';
import MisAusencias from './pages/MisAusencias';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/sol-diurno" />} />
          <Route path="sol-diurno" element={<SolDiaDiurno />} />
          <Route path="sol-vespertino" element={<SolDiaVespertino />} />
          <Route path="perfil" element={<MiPerfil />} />
          <Route path="solicitados" element={<DiasSolicitados />} />
          <Route path="ausencias" element={<MisAusencias />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}