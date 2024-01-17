import { Id } from '@core/types/id';
import { ActivoProcesoReasignacion } from '@core/models/auxiliares/activo-proceso-reasignacion';
import { Activo } from '@core/models/definiciones/activo';

export const convertirActivoProcesoReasignacion = (
  activo: Activo,
  { responsableAnterior, responsableUsoAnterior }
) => {
  return <ActivoProcesoReasignacion>{
    empresaId: activo.empresaId ? activo.empresaId : 0,
    id: activo.id ? activo.id : 0,
    proceso: 0,
    activo: activo.id,
    tipoActivo: activo.tipoActivo,
    codigo: activo.codigo,
    denominacion: activo.denominacion,
    responsableAnterior: responsableAnterior,
    responsableUsoAnterior: responsableUsoAnterior,
    creado: activo.creado,
    modificado: activo.modificado,
  };
};
