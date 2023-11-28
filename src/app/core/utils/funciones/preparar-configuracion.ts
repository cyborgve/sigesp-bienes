import { Configuracion } from '@core/models/definiciones/configuracion';

const booleanLogico = (booleano: boolean) => (booleano ? 1 : 0);
/**
 * @description Prepara la configuracion recibida del formulario para ser guardada o actualizada.
 * @param configuracion Contiguracion
 * @returns configuracion modificada para ser almacenada. */
export const prepararConfiguracion = (configuracion: any) => {
  return <Configuracion>{
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
    decorarFiltros: booleanLogico(configuracion.decorarFiltros),
    abrirImprimirProceso: booleanLogico(configuracion.abrirImprimirProceso),
    prefijoSerialRotulacion: String(
      configuracion.prefijoSerialRotulacion
    ).substring(0, 3),
    creado: configuracion.creado ? configuracion.creado : new Date(),
    modificado: new Date(),
  };
};
