import { Basica } from './basica';

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
}
