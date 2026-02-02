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
      newErrors.telefono = "Teléfono inválido";
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
    }
  };

  return (
    <div className="form-container">
      <h2>Solicitud para el día: {values.diaSolicitado || "___/___/____"}</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="diaSolicitado">Día Solicitado:</label>
          <input 
            type="text"
            id="diaSolicitado"
            name="diaSolicitado" 
            value={values.diaSolicitado} 
            onChange={handleChange} 
          />
          {errors.diaSolicitado && <span>{errors.diaSolicitado}</span>}
        </div>

        <div>
          <label htmlFor="telefono">Teléfono:</label>
          <input 
            type="text" 
            id="telefono"
            name="telefono" 
            value={values.telefono} 
            onChange={handleChange} 
          />
          {errors.telefono && <span>{errors.telefono}</span>}
        </div>

        <div>
          <label htmlFor="jornada">Jornada:</label>
          <select id="jornada" name="jornada" value={values.jornada} onChange={handleChange}>
            <option value="Completa">Completa</option>
            <option value="Parcial">Parcial</option>
          </select>
        </div>

        <div>
          <label htmlFor="turno">Turno:</label>
          <select id="turno" name="turno" value={values.turno} onChange={handleChange}>
            <option value="Diurno">Diurno</option>
            <option value="Vespertino">Vespertino</option>
          </select>
        </div>

        <div>
          <label htmlFor="horas">Número de horas:</label>
          <input 
            type="number" 
            id="horas"
            name="horas" 
            value={values.horas} 
            onChange={handleChange} 
          />
          {errors.horas && <span>{errors.horas}</span>}
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormSolicitud;