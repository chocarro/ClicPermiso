import React, { useState } from 'react';

interface PerfilValues {
  nombre: string;
  apellidos: string;
  email: string;
  dni: string;
  relacionJuridica: string;
  aniosServicio: string;
}

const PerfilForm: React.FC = () => {
  const [values, setValues] = useState<PerfilValues>({
    nombre: '',
    apellidos: '',
    email: '',
    dni: '',
    relacionJuridica: 'Otro',
    aniosServicio: ''
  });

  const [errors, setErrors] = useState<Partial<PerfilValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validarDNI = (dni: string) => {
    const validChars = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    if (!nifRegex.test(dni)) return false;
    const numero = parseInt(dni.substring(0, 8), 10);
    const letra = dni.charAt(8).toUpperCase();
    return validChars.charAt(numero % 23) === letra;
  };

  const validarJS = (): boolean => {
    const newErrors: Partial<PerfilValues> = {};
    
    if (!/^[A-ZÁÉÍÓÚÑ][a-zñáéíóú]*$/.test(values.nombre)) {
      newErrors.nombre = "La primera letra debe ser mayúscula";
    }

    const apellidosArray = values.apellidos.trim().split(/\s+/);
    const regexApellido = /^[A-ZÁÉÍÓÚÑ][a-zñáéíóú]*$/;
    if (apellidosArray.length !== 2 || !regexApellido.test(apellidosArray[0]) || !regexApellido.test(apellidosArray[1])) {
      newErrors.apellidos = "Introduce dos apellidos con la primera letra en mayúscula";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Formato de email incorrecto";
    }

    if (!validarDNI(values.dni)) {
      newErrors.dni = "DNI no válido";
    }

    const anios = parseInt(values.aniosServicio);
    if (isNaN(anios) || anios < 0 || anios >= 50) {
      newErrors.aniosServicio = "Debe ser un número entre 0 y 49";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarJS()) {
      console.log(values);
      alert("Perfil actualizado correctamente");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Editar Perfil</h2>
      
      <form onSubmit={handleSubmit} noValidate>
        <div style={styles.group}>
          <label style={styles.label} htmlFor="nombre">Nombre:</label>
          <input 
            type="text" 
            id="nombre" 
            name="nombre" 
            value={values.nombre} 
            onChange={handleChange} 
            style={styles.input}
          />
          {errors.nombre && <span style={styles.error}>{errors.nombre}</span>}
        </div>

        <div style={styles.group}>
          <label style={styles.label} htmlFor="apellidos">Apellidos:</label>
          <input 
            type="text" 
            id="apellidos" 
            name="apellidos" 
            value={values.apellidos} 
            onChange={handleChange} 
            style={styles.input}
          />
          {errors.apellidos && <span style={styles.error}>{errors.apellidos}</span>}
        </div>

        <div style={styles.group}>
          <label style={styles.label} htmlFor="email">Correo Electrónico:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={values.email} 
            onChange={handleChange} 
            style={styles.input}
          />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>

        <div style={styles.group}>
          <label style={styles.label} htmlFor="dni">DNI:</label>
          <input 
            type="text" 
            id="dni" 
            name="dni" 
            value={values.dni} 
            onChange={handleChange} 
            style={styles.input}
          />
          {errors.dni && <span style={styles.error}>{errors.dni}</span>}
        </div>

        <div style={styles.group}>
          <label style={styles.label} htmlFor="relacionJuridica">Relación Jurídica:</label>
          <select 
            id="relacionJuridica" 
            name="relacionJuridica" 
            value={values.relacionJuridica} 
            onChange={handleChange} 
            style={styles.input}
          >
            <option value="Otro">Otro</option>
            <option value="Indefinido">Indefinido</option>
            <option value="Temporal">Temporal</option>
          </select>
        </div>

        <div style={styles.group}>
          <label style={styles.label} htmlFor="aniosServicio">Años de servicio:</label>
          <input 
            type="number" 
            id="aniosServicio" 
            name="aniosServicio" 
            value={values.aniosServicio} 
            onChange={handleChange} 
            style={styles.input}
          />
          {errors.aniosServicio && <span style={styles.error}>{errors.aniosServicio}</span>}
        </div>

        <button type="submit" style={styles.button}>Guardar Perfil</button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '20px',
    maxWidth: '550px',
    margin: '0 auto',
  },
  title: {
    color: '#1a237e',
    marginBottom: '25px',
    fontSize: '1.4rem',
    borderBottom: '2px solid #f0f2f5',
    paddingBottom: '10px'
  },
  group: {
    marginBottom: '18px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#555',
    marginBottom: '8px',
  },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '15px',
    outline: 'none',
  },
  error: {
    color: '#d32f2f',
    fontSize: '12px',
    marginTop: '5px',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#1a237e',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '10px',
  }
};

export default PerfilForm;