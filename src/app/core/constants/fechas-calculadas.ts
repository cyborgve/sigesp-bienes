import moment from 'moment';

export const FECHAS_CALCULADAS: {
  HOY: [Date, undefined];
  AYER: [Date, undefined];
  'ESTA SEMANA': [Date, Date | undefined];
  'LA SEMANA PASADA': [Date, Date | undefined];
  'ESTE MES': [Date, Date | undefined];
  'EL MES PASADO': [Date, Date | undefined];
  'TODO EL AÑO': [Date, Date | undefined];
  'EL AÑO PASADO': [Date, Date | undefined];
  TODOS: [Date | undefined, Date | undefined];
  PERSONALIZADO: [Date | undefined, Date | undefined];
} = {
  HOY: [moment(new Date()).startOf('day').toDate(), undefined],
  AYER: [
    moment(new Date()).subtract(1, 'days').startOf('day').toDate(),
    undefined,
  ],
  'ESTA SEMANA': [
    moment(new Date()).startOf('week').toDate(),
    moment(new Date()).endOf('week').toDate(),
  ],
  'LA SEMANA PASADA': [
    moment(new Date()).subtract(1, 'week').startOf('week').toDate(),
    moment(new Date()).subtract(1, 'week').endOf('week').toDate(),
  ],
  'ESTE MES': [
    moment(new Date()).startOf('month').toDate(),
    moment(new Date()).endOf('month').toDate(),
  ],
  'EL MES PASADO': [
    moment(new Date()).subtract(1, 'month').startOf('month').toDate(),
    moment(new Date()).subtract(1, 'month').endOf('month').toDate(),
  ],
  'TODO EL AÑO': [
    moment(new Date()).startOf('year').toDate(),
    moment(new Date()).endOf('year').toDate(),
  ],
  'EL AÑO PASADO': [
    moment(new Date()).subtract(1, 'year').startOf('year').toDate(),
    moment(new Date()).subtract(1, 'year').endOf('year').toDate(),
  ],
  TODOS: [undefined, undefined],
  PERSONALIZADO: [undefined, undefined],
};
