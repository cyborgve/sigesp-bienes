import { ActaPrestamoActivo } from '@core/models/procesos/acta-prestamo';
import { Activo } from '@core/models/definiciones/activo';

export function convertirActaPrestamoActivo(activo: Activo) {
  return <ActaPrestamoActivo>{
    empresaId: activo.empresaId,
    id: undefined,
    actaPrestamo: undefined,
    activo: activo.id,
    denominacion: activo.denominacion,
    tipoActivo: activo.tipoActivo,
    codigo: activo.codigo,
    creado: activo.creado,
    modificado: activo.modificado,
  };
}
