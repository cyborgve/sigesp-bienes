import { ActivoProcesoRetorno } from '@core/models/auxiliares/activo-proceso-retorno';

export const prepararActivoProcesoRetorno = (activo: any) => {
  return <ActivoProcesoRetorno>{
    empresaId: Number(activo.empresaId) | 0,
    id: Number(activo.id) | 0,
    proceso: Number(activo.proceso) | 0,
    activo: Number(activo.activo),
    tipoActivo: activo.tipoActivo,
    codigo: activo.codigo,
    denominacion: activo.denominacion,
    documentoRelacionado: activo.documentoRelacionado,
    creado: activo.creado,
    modificado: activo.modificado,
  };
};
