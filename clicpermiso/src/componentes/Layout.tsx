import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav style={{ width: '250px', borderRight: '1px solid #eee', padding: '20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '150px' }} />
        </div>
        
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={itemStyle}><Link to="/sol-diurno">📅 Sol. día diurno</Link></li>
          <li style={itemStyle}><Link to="/sol-vespertino">📅 Sol. día vespertino</Link></li>
          <li style={itemStyle}><Link to="/perfil">👤 Mi Perfil</Link></li>
          <li style={itemStyle}><Link to="/solicitados">📋 Mis días Solicitados</Link></li>
          <li style={itemStyle}><Link to="/ausencias">✖️ Mis ausencias</Link></li>
        </ul>
      </nav>

      <main style={{ flex: 1, backgroundColor: '#f5f7fb', padding: '40px' }}>
        <header style={{ textAlign: 'right', marginBottom: '20px' }}>
          <span>Hola, Prof. Borja</span>
        </header>
        
        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const itemStyle = {
  marginBottom: '15px',
  fontSize: '14px'
};

export default Layout;