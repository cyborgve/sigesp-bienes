import { ComponenteProceso } from '@core/models/auxiliares/componente-proceso';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';
export function convertirComponenteProceso(componente: ActivoComponente) {
  return <ComponenteProceso>{
    empresaId: 0,
    id: 0,
    codigo: componente.codigo,
    componente: componente.id,
    tipoComponente: componente.tipoComponenteId,
    denominacion: componente.denominacion,
    proceso: undefined,
    creado: componente.creado,
    modificado: componente.modificado,
  };
}
