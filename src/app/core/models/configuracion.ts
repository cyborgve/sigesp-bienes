import { Basica } from './auxiliares/basica';

export interface Configuracion extends Basica {
  generarAsientosContables: boolean;
  fechaIncorporacionAutomatica: boolean;
  afectacionDepreciacion: string;
  normativaActivos: string;
  separadorMascaraCodigo: string;
  longitudMaximaCatalogoCuenta: number;
  longitudMaximaCodigoInstituc: number;
  formatoCatalogoCuentaGeneral: string;
  formatoCodigoInstitucional: string;
  activarPaginacion: boolean;
  opcionesPaginacion: number[];
}
