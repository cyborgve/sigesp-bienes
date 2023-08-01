import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { prepararActivoDetalle } from '../funciones/preparar-activo-detalle';
import { prepararActivoDepreciacion } from '../funciones/preparar-activo-depreciacion';
import { prepararActivoUbicacion } from '../funciones/preparar-activo-ubicacion';

export const adaptarActivo = () =>
  pipe(
    map(
      (activo: any) =>
        <Activo>{
          empresaId: Number(activo.empresaId),
          id: Number(activo.id),
          codigo: activo.codigo,
          tipoActivo: activo.tipoActivo,
          fechaRegistro: activo.fechaRegistro,
          catalogoCuentas: activo.catalogoCuentas,
          serialRotulacion: activo.serialRotulacion,
          denominacion: activo.denominacion,
          observaciones: activo.observaciones,
          fechaAdquisicion: activo.fechaAdquisicion,
          valorAdquisicion: Number(activo.valorAdquisicion),
          monedaId: activo.monedaId,
          modeloId: Number(activo.modeloId),
          anioFabricacion: activo.anioFabricacion,
          serialFabrica: activo.serialFabrica,
          colorId: Number(activo.colorId),
          rotulacionId: Number(activo.rotulacionId),
          categoriaId: Number(activo.categoriaId),
          detalle: prepararActivoDetalle(activo.detalles),
          componentes: adaptarComponentes(activo.componentes),
          depreciacion: prepararActivoDepreciacion(activo.depreciacion),
          ubicacion: prepararActivoUbicacion(activo.ubicacion),
          creado: activo.creado,
          modificado: activo.modificado,
        }
    )
  );

function adaptarComponentes(componentes: any[]): ActivoComponente[] {
  return componentes as ActivoComponente[];
}
