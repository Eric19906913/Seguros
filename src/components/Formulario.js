import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {obtenerDiferenciaModelo, calcularMarca, calcularPlan} from '../helper';

//estilos con style components
const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #E1E1E1;
  -webkit-appearence: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838F;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color: .3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #26C6DA;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color:white;
  padding: 1rem;
  width:100%;
  text-align: center;
  margin-bottom: 2rem;
`;
//Fin de estilos


const Formulario = ({guardarResumen, guardarCargando}) =>{

  //state para obtener los datos del Formulario
  const [datos, guardarDatos] = useState({
    marca: '',
    modelo: '',
    plan: ''
  });

  const [error, guardarError] = useState(false);

  const {marca, modelo, plan} = datos;

  const obtenerInfo = e =>{
    guardarDatos({
      ...datos,
      [e.target.name] : e.target.value
    })
  }

  const cotizarSeguro = e =>{
    e.preventDefault();

    if(marca.trim() === '' || modelo.trim() === '' || plan.trim() === ''){
      guardarError(true);
      return;
    }
    //resetea el error
    guardarError(false);

    //Base del Seguro
    let costo = 2000;
    //obtener la diferencia de anios
    const diferencia = obtenerDiferenciaModelo(modelo);
    costo -= ((diferencia * 3) * costo) / 100; //resta el 3% por cada anio

    //americano 15%
    //asiatico 5%
    //europeo 30%
    costo = calcularMarca(marca) * costo;

    //calcular Plan
    //basico 20%
    //completo 50%
    const incrementoPlan = calcularPlan(plan);
    costo = parseFloat(incrementoPlan * costo).toFixed(2);

    guardarCargando(true);

    setTimeout(()=>{
      guardarCargando(false);

      guardarResumen({
        cotizacion: Number(costo),
        datos: datos
      });
    }, 3000)




  }

  return(
    <form
      onSubmit={cotizarSeguro}
    >
      {error ? <Error>Debe completar todos los campos</Error> : null }
      <Campo>
        <Label>Marca</Label>
        <Select
          name="marca"
          value={marca}
          onChange={obtenerInfo}
        >
          <option value="">--Seleccione--</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Modelo</Label>
        <Select
          name="modelo"
          value={modelo}
          onChange={obtenerInfo}
        >
          <option value="">--Seleccione--</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={obtenerInfo}
        /> Basico
        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={obtenerInfo}
        /> Completo
      </Campo>

      <Boton type="submit">Cotizar</Boton>
    </form>
  );

}

Formulario.propTypes = {
  guardarResumen: PropTypes.func.isRequired,
  guardarCargando: PropTypes.func.isRequired
}

export default Formulario;
