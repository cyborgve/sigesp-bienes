import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Seguro } from '@core/models/definiciones/seguro';

export const adaptarSeguro = () => pipe(map(adaptar));
export const adaptarSeguros = () =>
  pipe(map((seguros: any[]) => seguros.map(adaptar)));

const adaptar = (seguro: any) =>
  <Seguro>{
    empresaId: Number(seguro.empresaId),
    id: Number(seguro.id),
    codigo: seguro.codigo,
    denominacion: seguro.denominacion,
    aseguradoraId: Number(seguro.aseguradoraId),
    tipoPolizaId: Number(seguro.tipoPolizaId),
    tipoCoberturaId: Number(seguro.tipoCoberturaId),
    numeroPoliza: seguro.numeroPoliza,
    montoAsegurado: Number(seguro.montoAsegurado),
    fechaInicioPoliza: seguro.fechaInicioPoliza,
    fechaFinPoliza: seguro.fechaFinPoliza,
    monedaId: seguro.monedaId,
    monedaSecundariaId: seguro.monedaSecundariaId,
    poseeRCV: Number(seguro.poseeRCV),
    descripcionCobertura: seguro.descripcionCobertura,
    coberturaAdicional: seguro.descripcionAdicional,
    creado: seguro.creado,
    modificado: seguro.modificado,
  };
