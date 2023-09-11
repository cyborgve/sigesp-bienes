import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { Activo } from '@core/models/definiciones/activo';

export function convertirActivoProceso(activo: Activo): ActivoProceso {
  return <ActivoProceso>{
    empresaId: activo.empresaId ? activo.empresaId : undefined,
    id: activo.id ? activo.id : undefined,
    proceso: undefined,
    activo: activo.id,
    tipoActivo: activo.tipoActivo,
    codigo: activo.codigo,
    denominacion: activo.denominacion,
    creado: activo.creado,
    modificado: activo.modificado,
  };
}
