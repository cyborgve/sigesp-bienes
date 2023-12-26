import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';

export const adaptarCuentaContable = () => pipe(map(adaptar));
export const adaptarCuentasContables = () =>
  pipe(map((cuentasContables: any[]) => cuentasContables.map(adaptar)));

const adaptar = (cuentaContable: any) =>
  <CuentaContable>{
    empresaId: Number(cuentaContable.empresaId),
    id: cuentaContable.id,
    codigo: cuentaContable.id,
    denominacion: cuentaContable.denominacion,
    estatus: cuentaContable.estatus,
    nivel: Number(cuentaContable.nivel),
    referencia: cuentaContable.referencia,
    creado: cuentaContable.creado,
    modificado: cuentaContable.modificado,
  };
