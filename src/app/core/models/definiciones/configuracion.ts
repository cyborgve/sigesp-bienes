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
  decorarFiltros: number;
  abrirImprimirProceso: number;
  prefijoSerialRotulacion: string;
}
