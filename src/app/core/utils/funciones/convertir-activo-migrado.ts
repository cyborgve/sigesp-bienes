import { ActivoMigrado } from '@core/models/auxiliares/activo-migrado';
import { Activo } from '@core/models/definiciones/activo';

export const convertirActivoMigrado = (activo: Activo) => {
  return <ActivoMigrado>{
    empresaId: activo.empresaId ? activo.empresaId : 0,
    id: activo.id ? activo.id : 0,
    proceso: 0,
    activo: activo.id,
    tipoActivo: activo.tipoActivo,
    codigo: activo.codigo,
    denominacion: activo.denominacion,
    creado: activo.creado,
    modificado: activo.modificado,
    generar: false,
  };
};
