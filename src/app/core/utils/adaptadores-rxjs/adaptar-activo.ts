import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Activo } from '@core/models/definiciones/activo';

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
          catalogoCuentas: Number(activo.catalogoCuentas),
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
          detalle: activo.detalles,
          componentes: activo.componentes,
          depreciacion: activo.depreciacion,
          ubicacion: activo.ubicacion,
          creado: activo.creado,
          modificado: activo.modificado,
        }
    )
  );
