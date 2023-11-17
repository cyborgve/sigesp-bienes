import { Origen } from '@core/models/definiciones/origen';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarOrigen = () => pipe(map(adaptar));
export const adaptarOrigenes = () =>
  pipe(map((origenes: any[]) => origenes.map(adaptar)));

const adaptar = (origen: any) =>
  <Origen>{
    empresaId: Number(origen.empresaId),
    id: Number(origen.id),
    codigo: origen.codigo,
    denominacion: origen.denominacion,
    fechaOrigen: origen.fechaOrigen,
    fechaAdquisicion: origen.fechaAdquisicion,
    modoAdquisicion: origen.modoAdquisicion,
    numeroFormaAdquisicion: origen.numeroFormaAdquisicion,
    nombreFormaAdquisicion: origen.nombreFormaAdquisicion,
    fechaFactura: origen.fechaFactura,
    numeroFactura: origen.numeroFactura,
    proveedorId: origen.proveedorId,
    tomo: origen.tomo,
    folio: origen.folio,
    nombrePropietarioAnterior: origen.nombrePropietarioAnterior,
    nombreBenefactor: origen.nombreBenefactor,
    nombreBeneficiario: origen.nombreBeneficiario,
    observaciones: origen.observaciones,
    creado: origen.creado,
    modificado: origen.modificado,
  };
