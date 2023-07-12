import { Configuracion } from '@core/models/configuracion';

const booleanLogico = (booleano: boolean) => (booleano ? 1 : 0);
/**
 * @description Prepara la configuracion recibida del formulario para ser guardada o actualizada.
 * @param configuracion Contiguracion
 * @returns configuracion modificada para ser almacenada. */
function prepararConfiguracion(configuracion: Configuracion) {
  return {
    empresaId: configuracion.empresaId,
    id: configuracion.id,
    normativaActivos: configuracion.normativaActivos,
    afectacionDepreciacion: configuracion.afectacionDepreciacion,
    longitudCatalogoCuentas: configuracion.longitudCatalogoCuentas,
    longitudCodigoInstitucional: configuracion.longitudCodigoInstitucional,
    formatoCatalogoCuentaGeneral: configuracion.formatoCatalogoCuentaGeneral,
    formatoCodigoInstitucional: configuracion.formatoCodigoInstitucional,
    generarAsientosContables: booleanLogico(
      configuracion.generarAsientosContables
    ),
    fechaIncorporacionAutomatica: booleanLogico(
      configuracion.fechaIncorporacionAutomatica
    ),
    usarMascaraCodigoActivo: booleanLogico(
      configuracion.usarMascaraCodigoActivo
    ),
    activarPaginacion: booleanLogico(configuracion.activarPaginacion),
    opcionesPaginacion: configuracion.opcionesPaginacion,
    creado: configuracion.creado,
    modificado: configuracion.modificado,
  };
}
