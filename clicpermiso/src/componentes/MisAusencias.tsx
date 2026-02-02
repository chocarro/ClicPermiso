import React, { useState } from 'react';

interface Ausencia {
  id: number;
  fecha: string;
  tipo: string;
  horas: number;
  estado: string;
}

const MisAusencias: React.FC = () => {
  const [ausencias] = useState<Ausencia[]>([
    { id: 1, fecha: "15/01/2026", tipo: "Diurno", horas: 6, estado: "Aceptada" },
    { id: 2, fecha: "20/01/2026", tipo: "Vespertino", horas: 4, estado: "Pendiente" },
    { id: 3, fecha: "01/02/2026", tipo: "Diurno", horas: 7, estado: "Rechazada" }
  ]);

  return (
    <div className="view-container">
      <h2>Historial de Mis Ausencias</h2>
      
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo / Turno</th>
            <th>Horas</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {ausencias.map((item) => (
            <tr key={item.id}>
              <td>{item.fecha}</td>
              <td>{item.tipo}</td>
              <td>{item.horas}</td>
              <td className={`status-${item.estado.toLowerCase()}`}>
                {item.estado}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MisAusencias;