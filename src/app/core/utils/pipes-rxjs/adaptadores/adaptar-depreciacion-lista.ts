import { DepreciacionLista } from '@core/models/auxiliares/depreciacion-lista';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { normalizarMetodoDepreciacion } from '@core/utils/funciones/normalizar-metodo-depreciacion';

export const adaptarDepreciacionLista = () => pipe(map(adaptar));
export const adaptarDepreciacionesLista = () =>
  pipe(map((depreciaciones: any[]) => depreciaciones.map(adaptar)));

const adaptar = (depreciacion: any) =>
  <DepreciacionLista>{
    empresa: depreciacion.empresa,
    id: Number(depreciacion.id),
    comprobante: String(depreciacion.comprobante).substring(5),
    activo: depreciacion.activo,
    serial: depreciacion.serial,
    identificador: depreciacion.identificador,
    fechaCompra: depreciacion.fechaCompra,
    fechaIncorporacion: depreciacion.fechaIncorporacion,
    metodo: normalizarMetodoDepreciacion(depreciacion.metodo),
    costo: depreciacion.costo,
    valorRescate: depreciacion.valorRescate,
    montoDepreciar: depreciacion.montoDepreciar,
    vidaUtil: depreciacion.vidaUtil,
    depreciacionMensual: depreciacion.depreciacionMensual,
    depreciacionAnual: depreciacion.depreciacionAnual,
    observaciones: depreciacion.observaciones,
    creado: depreciacion.creado,
    modificado: depreciacion.modificado,
  };
