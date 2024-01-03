import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';
import moment from 'moment';
import 'moment/locale/es';
import { convertirUnidadTiempo } from './convertir-unidad-tiempo';
import { UnidadDeTiempo } from '@core/types/unidades-tiempo';
import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';

interface DepreciacionCalculada {
  anual: number;
  mensual: number;
  detalles: DetalleDepreciacion[];
}

const calcularDepreciacion = (
  valorInicial: number,
  fechaInicial: Date,
  vidaUtil: number,
  unidadVidaUtil: UnidadDeTiempo,
  valorRescate: number,
  metodoDepreciacion: MetodoDepreciacion
) => {
  let depreciacion: DepreciacionCalculada;
  switch (metodoDepreciacion) {
    case 'LINEA RECTA':
      depreciacion = lineaRecta(
        valorInicial,
        fechaInicial,
        vidaUtil,
        unidadVidaUtil,
        valorRescate
      );
      break;
    case 'SALDO DECRECIENTE':
      depreciacion = saldoDecreciente(
        valorInicial,
        fechaInicial,
        vidaUtil,
        unidadVidaUtil,
        valorRescate
      );
      break;
    case 'SUMA DE DIGITOS':
      depreciacion = sumaDigitos(
        valorInicial,
        fechaInicial,
        vidaUtil,
        unidadVidaUtil,
        valorRescate
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
  valorRescate: number
) => {
  let fechaDepreciacion = fechaInicial;
  let aniosVidaUtil = convertirUnidadTiempo(vidaUtil, unidadVidaUtil, 'años');
  let mesesVidaUtil = convertirUnidadTiempo(vidaUtil, unidadVidaUtil, 'meses');
  let depreciacionAnual = (valorInicial - valorRescate) / aniosVidaUtil;
  let depreciacionMensual = (valorInicial - valorRescate) / mesesVidaUtil;
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
      fecha: fechaDepreciacion,
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
      fecha: fechaDepreciacion,
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

const sumaDigitos = (
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
    aniosVidaUtil / ((aniosVidaUtil * (aniosVidaUtil + 1)) / 2);
  let depreciacionAnual = (valorContable - valorRescate) * factorDepreciacion;
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
      fecha: fechaDepreciacion,
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
      depreciacionAnual = (valorContable - valorRescate) * factorDepreciacion;
      depreciacionMensual = depreciacionAnual / 12;
    }
  }
  return <DepreciacionCalculada>{
    anual: depreciacionAnual,
    mensual: depreciacionMensual,
    detalles: detalles,
  };
};

export { calcularDepreciacion };
