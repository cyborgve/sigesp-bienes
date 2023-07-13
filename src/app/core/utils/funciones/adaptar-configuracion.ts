import { Configuracion } from '@core/models/configuracion';

const logicoBoolean = (numero: number) => numero === 1;

/**
 * @description Prepara la configracion para ser usada en el frontend.
 * @param configuracion configuracion recibida de la base de datos
 * @returns Configuracion
 * @returns configuracion modificada para ser almacenada. */
export function adaptarConfiguracion(configuracion: any): Configuracion {
  return {
    empresaId: configuracion.empresaId,
    id: configuracion.id,
    normativaActivos: configuracion.normativaActivos,
    afectacionDepreciacion: configuracion.afectacionDepreciacion,
    longitudCatalogoCuentas: configuracion.longitudCatalogoCuentas,
    longitudCodigoInstitucional: configuracion.longitudCodigoInstitucional,
    formatoCatalogoCuentaGeneral: configuracion.formatoCatalogoCuentaGeneral,
    formatoCodigoInstitucional: configuracion.formatoCodigoInstitucional,
    generarAsientosContables: logicoBoolean(
      configuracion.generarAsientosContables
    ),
    fechaIncorporacionAutomatica: logicoBoolean(
      configuracion.fechaIncorporacionAutomatica
    ),
    usarMascaraCodigoActivo: logicoBoolean(
      configuracion.usarMascaraCodigoActivo
    ),
    activarPaginacion: logicoBoolean(configuracion.activarPaginacion),
    opcionesPaginacion: configuracion.opcionesPaginacion,
    creado: configuracion.creado,
    modificado: configuracion.modificado,
  };
}