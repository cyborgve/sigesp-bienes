import { map } from 'rxjs/operators';
import { Proveedor } from '@core/models/otros-modulos/proveedor';
import { pipe } from 'rxjs';

export const adaptarProveedor = () => pipe(map(adaptar));
export const adaptarProveedores = () =>
  pipe(map((proveedores: any[]) => proveedores.map(adaptar)));

const adaptar = proveedor =>
  <Proveedor>{
    empresaId: Number(proveedor.empresaId),
    id: Number(proveedor.id),
    rif: proveedor.rif,
    denominacion: proveedor.nombre,
    creado: proveedor.creado,
    modificado: proveedor.modificado,
  };
