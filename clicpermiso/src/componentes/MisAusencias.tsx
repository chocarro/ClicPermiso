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

  // Función para asignar color según el estado
  const getStatusStyle = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'aceptada': return { color: '#2e7d32', backgroundColor: '#e8f5e9' };
      case 'pendiente': return { color: '#f57c00', backgroundColor: '#fff3e0' };
      case 'rechazada': return { color: '#d32f2f', backgroundColor: '#ffebee' };
      default: return {};
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Historial de Mis Ausencias</h2>
      
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Fecha</th>
            <th style={styles.th}>Tipo / Turno</th>
            <th style={styles.th}>Horas</th>
            <th style={styles.th}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {ausencias.map((item) => (
            <tr key={item.id} style={styles.row}>
              <td style={styles.td}>{item.fecha}</td>
              <td style={styles.td}>{item.tipo}</td>
              <td style={styles.td}>{item.horas} h</td>
              <td style={styles.td}>
                <span style={{ ...styles.badge, ...getStatusStyle(item.estado) }}>
                  {item.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Objeto de estilos
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '15px',
  },
  title: {
    color: '#1a237e',
    marginBottom: '20px',
    fontSize: '1.5rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  headerRow: {
    borderBottom: '2px solid #eee',
  },
  th: {
    padding: '12px',
    color: '#666',
    fontWeight: '600',
  },
  row: {
    borderBottom: '1px solid #f5f5f5',
  },
  td: {
    padding: '15px 12px',
    fontSize: '14px',
    color: '#333',
  },
  badge: {
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block',
  }
};

export default MisAusencias;