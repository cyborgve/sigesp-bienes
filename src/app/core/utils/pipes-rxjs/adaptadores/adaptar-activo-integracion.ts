import { ActivoIntegracion } from '@core/models/definiciones/activo-integracion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarActivoIntegracion = () => pipe(map(adaptar));
export const adaptarActivosIntegracion = () =>
  pipe(
    map((activosIntegracion: ActivoIntegracion[]) =>
      activosIntegracion.map(adaptar)
    )
  );

const adaptar = (activoIntegracion: any) =>
  <ActivoIntegracion>{
    empresaId: Number(activoIntegracion.empresaId),
    id: Number(activoIntegracion.id),
    activoId: Number(activoIntegracion.activoId),
    modCuentaContableDebe: activoIntegracion.modCuentaContableDebe,
    modCuentaContableHaber: activoIntegracion.modCuentaContableHaber,
    desCuentaContableDebe: activoIntegracion.desCuentaContableDebe,
    desCuentaContableHaber: activoIntegracion.desCuentaContableHaber,
    creado: activoIntegracion.creado,
    modificado: activoIntegracion.modificado,
  };
