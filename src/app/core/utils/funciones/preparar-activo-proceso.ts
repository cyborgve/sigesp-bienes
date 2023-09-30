import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';

export const prepararActivoProceso = (activo: any) => {
  return <ActivoProceso>{
    empresaId: Number(activo.empresaId) | 0,
    id: Number(activo.id) | 0,
    proceso: Number(activo.proceso) | 0,
    activo: Number(activo.activo),
    tipoActivo: activo.tipoActivo,
    codigo: activo.codigo,
    denominacion: activo.denominacion,
    creado: activo.creado,
    modificado: activo.modificado,
  };
};
