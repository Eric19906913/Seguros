import React from 'react';
import PropTypes from 'prop-types';
import {primerMayuscula} from '../helper';
import styled from '@emotion/styled';

const ContenedorResumen = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838F;
  color: #FFF;
  margin-top: 1rem;
`;

const Resumen = ({datos}) => {

  const {marca, modelo, plan} = datos;

  if(marca === '' || modelo === '' || plan === ''){
    return null;
  }

  return(
    <ContenedorResumen>
      <h2>Resumen de Cotizacion</h2>
      <ul>
        <li>Marca: {primerMayuscula(marca)}</li>
        <li>Plan: {primerMayuscula(plan)}</li>
        <li>Modelo: {modelo}</li>
      </ul>
    </ContenedorResumen>
  );
}

Resumen.propTypes = {
  datos: PropTypes.object.isRequired
}

export default Resumen;
