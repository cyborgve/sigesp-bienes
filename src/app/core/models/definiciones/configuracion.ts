import { Basica } from '@core/models/auxiliares/basica';

export interface Configuracion extends Basica {
  normativaActivos: string;
  afectacionDepreciacion: string;
  longitudCatalogoCuentas: number;
  longitudCodigoInstitucional: number;
  formatoCatalogoCuentaGeneral: string;
  formatoCodigoInstitucional: string;
  generarAsientosContables: number;
  fechaIncorporacionAutomatica: number;
  usarMascaraCodigoActivo: number;
  activarPaginacion: number;
  opcionesPaginacion: number[];
  mostrarBotonesInicioFinal: number;
  mostrarOpcionesPaginacion: number;
  decorarFiltros: number;
  // TODO: Los cambios de este campo solo estaran en el front,
  // pendientes por modificar en el backend y la base de datos
  // abrirImprimirProceso: number;
  serialRotulacionAutogenerado: number;
  prefijoSerialRotulacion: string;
}
