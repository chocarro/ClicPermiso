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
    }
  };

  return (
    <div className="form-container">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={values.nombre} onChange={handleChange} />
          {errors.nombre && <span>{errors.nombre}</span>}
        </div>

        <div>
          <label htmlFor="apellidos">Apellidos:</label>
          <input type="text" id="apellidos" name="apellidos" value={values.apellidos} onChange={handleChange} />
          {errors.apellidos && <span>{errors.apellidos}</span>}
        </div>

        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" value={values.email} onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="dni">DNI:</label>
          <input type="text" id="dni" name="dni" value={values.dni} onChange={handleChange} />
          {errors.dni && <span>{errors.dni}</span>}
        </div>

        <div>
          <label htmlFor="relacionJuridica">Relación Jurídica:</label>
          <select id="relacionJuridica" name="relacionJuridica" value={values.relacionJuridica} onChange={handleChange}>
            <option value="Otro">Otro</option>
            <option value="Indefinido">Indefinido</option>
            <option value="Temporal">Temporal</option>
          </select>
        </div>

        <div>
          <label htmlFor="aniosServicio">Años de servicio:</label>
          <input type="number" id="aniosServicio" name="aniosServicio" value={values.aniosServicio} onChange={handleChange} />
          {errors.aniosServicio && <span>{errors.aniosServicio}</span>}
        </div>

        <button type="submit">Guardar Perfil</button>
      </form>
    </div>
  );
};

export default PerfilForm;