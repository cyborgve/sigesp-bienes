import { Basica } from './auxiliares/basica';

export interface Configuracion extends Basica {
  normativaActivos: string;
  afectacionDepreciacion: string;
  longitudCatalogoCuentas: number;
  longitudCodigoInstitucional: number;
  formatoCatalogoCuentaGeneral: string;
  formatoCodigoInstitucional: string;
  generarAsientosContables: boolean;
  fechaIncorporacionAutomatica: boolean;
  usarMascaraCodigoActivo: boolean;
  activarPaginacion: boolean;
  opcionesPaginacion: number[];
}
