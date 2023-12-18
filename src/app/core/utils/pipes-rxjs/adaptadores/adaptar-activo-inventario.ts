import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActivoListaInventario } from '@core/models/auxiliares/activo-lista-inventario';
import { normalizarTipoActivo } from '@core/utils/funciones/normalizar-tipo-activo';

export const adaptarActivoInventario = () => pipe(map(adaptar));
export const adaptarActivosInventario = () =>
  pipe(map((inventario: any[]) => inventario.map(adaptar)));

const adaptar = (activo: any) =>
  <ActivoListaInventario>{
    codigo: String(activo.codigo).substring(5),
    tipo: normalizarTipoActivo(activo.tipo),
    denominacion: activo.denominacion,
    identificador: activo.identificador,
    estado: activo.estado,
    marcaModelo: activo.marcaModelo,
    serial: activo.serial,
    condicion: activo.condicion,
    precio: activo.precio,
    creado: activo.creado,
    modificado: activo.modificado,
  };
