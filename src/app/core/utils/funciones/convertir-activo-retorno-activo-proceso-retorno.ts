import { ActivoListaRetorno } from '@core/models/auxiliares/activo-lista-retorno';
import { ActivoProcesoRetorno } from '@core/models/auxiliares/activo-proceso-retorno';

export const convertirActivoRetornoEnActivoProcesoRetorno = (
  activoRetorno: ActivoListaRetorno
) =>
  <ActivoProcesoRetorno>{
    empresaId: activoRetorno.empresaId,
    id: activoRetorno.id,
    proceso: 0,
    activo: activoRetorno.activo,
    codigo: activoRetorno.codigo,
    tipoActivo: activoRetorno.tipoActivo,
    denominacion: activoRetorno.denominacion,
    documentoRelacionado: `${activoRetorno.tipoProceso}-${activoRetorno.proceso}`,
    creado: activoRetorno.creado,
    modificado: activoRetorno.modificado,
  };
