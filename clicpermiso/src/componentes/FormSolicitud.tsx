import React, { useState } from 'react';

interface FormValues {
  diaSolicitado: string;
  telefono: string;
  jornada: string;
  turno: string;
  horas: string;
}

const FormSolicitud: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    diaSolicitado: '',
    telefono: '',
    jornada: 'Completa',
    turno: 'Diurno',
    horas: ''
  });

  const [errors, setErrors] = useState<Partial<FormValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validarJS = (): boolean => {
    const newErrors: Partial<FormValues> = {};
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const telRegex = /^[6-9][0-9]{8}$/;
    const numHoras = parseInt(values.horas);

    if (!dateRegex.test(values.diaSolicitado)) {
      newErrors.diaSolicitado = "Formato dd/mm/yyyy requerido";
    }

    if (!telRegex.test(values.telefono)) {
      newErrors.telefono = "Debe empezar por 6-9 y tener 9 dígitos";
    }

    if (isNaN(numHoras) || numHoras <= 0 || numHoras >= 8) {
      newErrors.horas = "Número entre 1 y 7";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarJS()) {
      console.log(values);
      alert("Solicitud enviada con éxito");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        Solicitud para el día: {values.diaSolicitado || "___/___/____"}
      </h2>
      
      <form onSubmit={handleSubmit} noValidate>
        <div style={styles.group}>
          <label style={styles.label} htmlFor="diaSolicitado">Día Solicitado (dd/mm/yyyy):</label>
          <input 
            type="text"
            id="diaSolicitado"
            name="diaSolicitado" 
            placeholder="Ej: 25/05/2026"
            value={values.diaSolicitado} 
            onChange={handleChange} 
            style={styles.input}
          />
          {errors.diaSolicitado && <span style={styles.error}>{errors.diaSolicitado}</span>}
        </div>

        <div style={styles.group}>
          <label style={styles.label} htmlFor="telefono">Teléfono:</label>
          <input 
            type="text" 
            id="telefono"
            name="telefono" 
            value={values.telefono} 
            onChange={handleChange} 
            style={styles.input}
          />
          {errors.telefono && <span style={styles.error}>{errors.telefono}</span>}
        </div>

        <div style={styles.row}>
          <div style={{ ...styles.group, flex: 1 }}>
            <label style={styles.label} htmlFor="jornada">Jornada:</label>
            <select id="jornada" name="jornada" value={values.jornada} onChange={handleChange} style={styles.input}>
              <option value="Completa">Completa</option>
              <option value="Parcial">Parcial</option>
            </select>
          </div>

          <div style={{ ...styles.group, flex: 1 }}>
            <label style={styles.label} htmlFor="turno">Turno:</label>
            <select id="turno" name="turno" value={values.turno} onChange={handleChange} style={styles.input}>
              <option value="Diurno">Diurno</option>
              <option value="Vespertino">Vespertino</option>
            </select>
          </div>
        </div>

        <div style={styles.group}>
          <label style={styles.label} htmlFor="horas">Número de horas (1-7):</label>
          <input 
            type="number" 
            id="horas"
            name="horas" 
            value={values.horas} 
            onChange={handleChange} 
            style={styles.input}
          />
          {errors.horas && <span style={styles.error}>{errors.horas}</span>}
        </div>

        <button type="submit" style={styles.button}>Enviar Solicitud</button>
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
  row: {
    display: 'flex',
    gap: '15px',
    marginBottom: '18px',
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
    transition: 'background-color 0.2s',
  }
};

export default FormSolicitud;