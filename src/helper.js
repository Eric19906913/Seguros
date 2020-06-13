//funcion para calcular la diferencia entre el modelo y anio actual
export function obtenerDiferenciaModelo(modelo){
  return new Date().getFullYear() - modelo;
}
//funcion para cacular el incremento S/marca
export function calcularMarca(marca){
  let incremento;

  switch(marca){
    case "europeo":
      incremento = 1.30;
      break;
    case "americano":
      incremento = 1.15;
      break;
    case "asiatico":
      incremento = 1.05;
      break;
    default:
      break;
  }
  return incremento;
}

//calcula el tipo de Seguro
export function calcularPlan(plan){
  return (plan === 'basico') ? 1.20 : 1.50;
}

export function primerMayuscula(texto){
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
