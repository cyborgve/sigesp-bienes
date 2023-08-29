import { map } from 'rxjs/operators';
import { Proveedor } from '@core/models/otros-modulos/proveedor';
import { pipe } from 'rxjs';

export const adaptarProveedores = () =>
  pipe(
    map((proveedores: any[]) =>
      proveedores.map(
        proveedor =>
          <Proveedor>{
            empresaId: Number(proveedor.id_empresa),
            id: Number(proveedor.id_proveedor),
            rif: proveedor.rifpro,
            denominacion: proveedor.nompro,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
