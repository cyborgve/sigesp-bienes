import moment from 'moment';

export const fechasSonIguales = (fecha1: Date, fecha2: Date) => {
  let fechaA = moment(fecha1).startOf('day').milliseconds();
  let fechaB = moment(fecha2).startOf('day').milliseconds();
  return fechaA === fechaB;
};
