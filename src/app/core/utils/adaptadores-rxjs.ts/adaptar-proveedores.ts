import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { MProveedor } from 'sigesp';
import { Proveedor } from '@core/models/otros-modulos/proveedor';
export const adaptarProveedores = () =>
  pipe(
    map((proveedores: MProveedor[]) =>
      proveedores.map(
        proveedor =>
          <Proveedor>{
            empresaId: undefined,
            id: proveedor.codigo,
            codigo: proveedor.codigo,
            denominacion: proveedor.nombre,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
