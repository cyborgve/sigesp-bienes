import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { Activo } from '@core/models/definiciones/activo';

export const convertirActivoProceso = (activo: Activo) => {
  return <ActivoProceso>{
    empresaId: activo.empresaId ? activo.empresaId : 0,
    id: activo.id ? activo.id : 0,
    proceso: 0,
    activo: activo.id,
    tipoActivo: activo.tipoActivo,
    codigo: activo.codigo,
    denominacion: activo.denominacion,
    creado: activo.creado,
    modificado: activo.modificado,
  };
};
