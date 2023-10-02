import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';
import moment from 'moment';
import { convertirUnidadTiempo } from './convertir-unidad-tiempo';
import { UnidadDeTiempo } from '@core/types/unidades-tiempo';
import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';

interface DepreciacionCalculada {
  anual: number;
  mensual: number;
  detalles: DetalleDepreciacion[];
}

export const calcularDepreciacion = (
  valorInicial: number,
  fechaInicial: Date,
  vidaUtil: number,
  unidadVidaUtil: UnidadDeTiempo,
  valorRestate: number,
  metodoDepreciacion: MetodoDepreciacion
) => {
  let depreciacion: DepreciacionCalculada;
  switch (metodoDepreciacion) {
    case 'DIGITOS DOBLES':
      depreciacion = digitosDobles(
        valorInicial,
        fechaInicial,
        vidaUtil,
        unidadVidaUtil,
        valorRestate
      );
      break;
    case 'LINEA RECTA':
      depreciacion = lineaRecta(
        valorInicial,
        fechaInicial,
        vidaUtil,
        unidadVidaUtil,
        valorRestate
      );
      break;
    case 'SALDO DECRECIENTE':
      depreciacion = saldoDecreciente(
        valorInicial,
        fechaInicial,
        vidaUtil,
        unidadVidaUtil,
        valorRestate
      );
      break;
    case 'SUMA DE DIGITOS':
      depreciacion = sumaDigitos(
        valorInicial,
        fechaInicial,
        vidaUtil,
        unidadVidaUtil,
        valorRestate
      );
      break;
    case 'UNIDADES DE PRODUCCION':
      depreciacion = unidadesProduccion(
        valorInicial,
        fechaInicial,
        vidaUtil,
        unidadVidaUtil,
        valorRestate
      );
      break;
  }
  return depreciacion;
};

const lineaRecta = (
  valorInicial: number,
  fechaInicial: Date,
  vidaUtil: number,
  unidadVidaUtil: UnidadDeTiempo,
  valorRestate: number
) => {
  let fechaDepreciacion = fechaInicial;
  let aniosVidaUtil = convertirUnidadTiempo(vidaUtil, unidadVidaUtil, 'años');
  let mesesVidaUtil = convertirUnidadTiempo(vidaUtil, unidadVidaUtil, 'meses');
  let depreciacionAnual = (valorInicial - valorRestate) / aniosVidaUtil;
  let depreciacionMensual = (valorInicial - valorRestate) / mesesVidaUtil;
  let detalles: DetalleDepreciacion[] = [];
  let depreciacionAcumulada = 0;
  for (let i = 0; i < mesesVidaUtil; i++) {
    fechaDepreciacion = moment(fechaDepreciacion).add(1, 'months').toDate();
    depreciacionAcumulada = depreciacionAcumulada + depreciacionMensual;
    let diasTranscurridos = moment(fechaDepreciacion).diff(
      fechaInicial,
      'days',
      false
    );
    let mesesTranscurridos = moment(fechaDepreciacion).diff(
      fechaInicial,
      'months',
      false
    );
    let aniosTranscurridos = moment(fechaDepreciacion).diff(
      fechaInicial,
      'years',
      false
    );
    let detalle: DetalleDepreciacion = {
      empresaId: 0,
      id: 0,
      proceso: 0,
      fechaDepreciacion: fechaDepreciacion.toString(),
      meses: mesesTranscurridos,
      dias: diasTranscurridos,
      depreciacionMensual: mesesTranscurridos < 1 ? 0 : depreciacionMensual,
      depreciacionAnual: depreciacionAnual,
      depreciacionAcumulada: depreciacionAcumulada,
      valorContable:
        aniosTranscurridos < 1
          ? valorInicial
          : valorInicial - depreciacionAcumulada,
      creado: new Date(),
      modificado: new Date(),
    };
    detalles.push(detalle);
  }
  return <DepreciacionCalculada>{
    anual: depreciacionAnual,
    mensual: depreciacionMensual,
    detalles: detalles,
  };
};

const saldoDecreciente = (
  valorInicial: number,
  fechaInicial: Date,
  vidaUtil: number,
  unidadVidaUtil: UnidadDeTiempo,
  valorRescate: number
) => {
  let fechaDepreciacion = fechaInicial;
  let aniosVidaUtil = convertirUnidadTiempo(vidaUtil, unidadVidaUtil, 'años');
  let mesesVidaUtil = convertirUnidadTiempo(vidaUtil, unidadVidaUtil, 'meses');
  let detalles: DetalleDepreciacion[] = [];
  let depreciacionAcumulada = 0;
  let valorContable = valorInicial - depreciacionAcumulada;
  let factorDepreciacion =
    1 - (valorRescate / valorInicial) ** (1 / aniosVidaUtil);
  let depreciacionAnual = valorContable * factorDepreciacion;
  let depreciacionMensual = depreciacionAnual / 12;
  for (let i = 0; i < mesesVidaUtil; i++) {
    fechaDepreciacion = moment(fechaDepreciacion).add(1, 'months').toDate();
    depreciacionAcumulada = depreciacionAcumulada + depreciacionMensual;
    let diasTranscurridos = moment(fechaDepreciacion).diff(
      fechaInicial,
      'days',
      false
    );
    let mesesTranscurridos = moment(fechaDepreciacion).diff(
      fechaInicial,
      'months',
      false
    );
    let aniosTranscurridos = moment(fechaDepreciacion).diff(
      fechaInicial,
      'years',
      false
    );
    let detalle: DetalleDepreciacion = {
      empresaId: 0,
      id: 0,
      proceso: 0,
      fechaDepreciacion: fechaDepreciacion.toString(),
      meses: mesesTranscurridos,
      dias: diasTranscurridos,
      depreciacionMensual: mesesTranscurridos < 1 ? 0 : depreciacionMensual,
      depreciacionAnual: depreciacionAnual,
      depreciacionAcumulada: depreciacionAcumulada,
      valorContable:
        aniosTranscurridos < 1
          ? valorInicial
          : valorInicial - depreciacionAcumulada,
      creado: new Date(),
      modificado: new Date(),
    };
    detalles.push(detalle);
    if (mesesTranscurridos % 12 === 0) {
      depreciacionAnual =
        (valorInicial - depreciacionAcumulada) * factorDepreciacion;
      depreciacionMensual = depreciacionAnual / 12;
    }
  }
  return <DepreciacionCalculada>{
    anual: depreciacionAnual,
    mensual: depreciacionMensual,
    detalles: detalles,
  };
};

const digitosDobles = (
  valorInicial: number,
  fechaInicial: Date,
  vidaUtil: number,
  unidadVidaUtil: UnidadDeTiempo,
  valorRestate: number
) => {
  let aniosVidaUtil = convertirUnidadTiempo(vidaUtil, unidadVidaUtil, 'años');
  let detalles: DetalleDepreciacion[] = [];
  let depreciacion = {
    anual: (2 / aniosVidaUtil) * (valorInicial - valorRestate),
    mensual: undefined,
    detalles: detalles,
  };
  depreciacion.mensual = depreciacion.anual / 12;
  return depreciacion;
};

const sumaDigitos = (
  valorInicial: number,
  fechaInicial: Date,
  vidaUtil: number,
  unidadVidaUtil: UnidadDeTiempo,
  valorRestate: number
) => {
  let fechaDepreciacion = fechaInicial;
  let aniosVidaUtil = convertirUnidadTiempo(vidaUtil, unidadVidaUtil, 'años');
  let mesesVidaUtil = convertirUnidadTiempo(vidaUtil, unidadVidaUtil, 'meses');
  let detalles: DetalleDepreciacion[] = [];
  let depreciacionAcumulada = 0;
  let valorContable = valorInicial - depreciacionAcumulada;
  let factorDepreciacion =
    aniosVidaUtil / ((aniosVidaUtil * (aniosVidaUtil + 1)) / 2);
  let depreciacionAnual = (valorContable - valorRestate) * factorDepreciacion;
  let depreciacionMensual = depreciacionAnual / 12;
  for (let i = 0; i < mesesVidaUtil; i++) {
    fechaDepreciacion = moment(fechaDepreciacion).add(1, 'months').toDate();
    depreciacionAcumulada += depreciacionMensual;
    let diasTranscurridos = moment(fechaDepreciacion).diff(
      fechaInicial,
      'days',
      false
    );
    let mesesTranscurridos = moment(fechaDepreciacion).diff(
      fechaInicial,
      'months',
      false
    );
    let aniosTranscurridos = moment(fechaDepreciacion).diff(
      fechaInicial,
      'years',
      false
    );
    let detalle: DetalleDepreciacion = {
      empresaId: 0,
      id: 0,
      proceso: 0,
      fechaDepreciacion: fechaDepreciacion.toString(),
      meses: mesesTranscurridos,
      dias: diasTranscurridos,
      depreciacionMensual: mesesTranscurridos < 1 ? 0 : depreciacionMensual,
      depreciacionAnual: depreciacionAnual,
      depreciacionAcumulada: depreciacionAcumulada,
      valorContable:
        aniosTranscurridos < 1
          ? valorInicial
          : valorInicial - depreciacionAcumulada,
      creado: new Date(),
      modificado: new Date(),
    };
    detalles.push(detalle);
    if (mesesTranscurridos % 12 === 0) {
      factorDepreciacion =
        (aniosVidaUtil - aniosTranscurridos) /
        ((aniosVidaUtil * (aniosVidaUtil + 1)) / 2);
      depreciacionAnual = (valorContable - valorRestate) * factorDepreciacion;
      depreciacionMensual = depreciacionAnual / 12;
    }
  }
  return <DepreciacionCalculada>{
    anual: depreciacionAnual,
    mensual: depreciacionMensual,
    detalles: detalles,
  };
};

const unidadesProduccion = (
  valorInicial: number,
  fechaInicial: Date,
  vidaUtil: number,
  unidadVidaUtil: UnidadDeTiempo,
  valorRestate: number
) => {
  let aniosVidaUtil = convertirUnidadTiempo(vidaUtil, unidadVidaUtil, 'años');
  let detalles: DetalleDepreciacion[] = [];
  let depreciacion = {
    anual: (1 / aniosVidaUtil) * (valorInicial - valorRestate),
    mensual: undefined,
    detalles: detalles,
  };
  depreciacion.mensual = depreciacion.anual / 12;
  return depreciacion;
};
