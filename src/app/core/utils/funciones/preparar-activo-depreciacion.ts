import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';

export const prepararActivoDepreciacion = (depreciacion: any) => {
  return <ActivoDepreciacion>{
    empresaId: Number(depreciacion.empresaId),
    id: Number(depreciacion.id),
    activoId: Number(depreciacion.activoId),
    depreciable: Number(depreciacion.depreciable),
    metodoDepreciacion: depreciacion.metodoDepreciacion,
    cuentaContableGasto: depreciacion.cuentaContableGasto,
    cuentaContableDepreciacion: depreciacion.cuentaContableDepreciacion,
    vidaUtil: Number(depreciacion.vidaUtil),
    unidadVidaUtil: depreciacion.unidadVidaUtil,
    valorRescate: Number(depreciacion.ValorRescate),
    monedaValorRescate: depreciacion.monedaValorRescate,
    creado: depreciacion.creado,
    modificado: depreciacion.modificado,
  };
};
