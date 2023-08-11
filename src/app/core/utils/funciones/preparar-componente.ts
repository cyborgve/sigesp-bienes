import { ActivoComponente } from '@core/models/definiciones/activo-componente';

export function prepararComponente(componente: any) {
  return <ActivoComponente>{
    empresaId: componente.empresaId,
    id: Number(componente.id),
    tipoComponenteId: Number(componente.tipoComponenteId),
    activoId: Number(componente.activoId),
    codigo: componente.codigo,
    denominacion: componente.denominacion,
    modeloId: Number(componente.modeloId),
    especificaciones: componente.especificaciones,
    creado: componente.creado,
    modificado: componente.modificado,
  };
}
