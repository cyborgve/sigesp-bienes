import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Configuracion } from '@core/models/definiciones/configuracion';

export const adaptarConfiguracion = () => pipe(map(adaptar));
export const adaptarConfiguraciones = () =>
  pipe(map((configuraciones: any[]) => configuraciones.map(adaptar)));

const adaptar = (configuracion: any) =>
  <Configuracion>{
    empresaId: Number(configuracion.id),
    id: Number(configuracion.id),
    normativaActivos: configuracion.normativaActivos,
    afectacionDepreciacion: configuracion.afectacionDepreciacion,
    longitudCatalogoCuentas: Number(configuracion.longitudCatalogoCuentas),
    longitudCodigoInstitucional: Number(
      configuracion.longitudCodigoInstitucional
    ),
    formatoCatalogoCuentaGeneral: configuracion.formatoCatalogoCuentaGeneral,
    formatoCodigoInstitucional: configuracion.formatoCodigoInstitucional,
    generarAsientosContables: Number(configuracion.generarAsientosContables),
    fechaIncorporacionAutomatica: Number(
      configuracion.fechaIncorporacionAutomatica
    ),
    usarMascaraCodigoActivo: Number(configuracion.usarMascaraCodigoActivo),
    activarPaginacion: Number(configuracion.activarPaginacion),
    opcionesPaginacion: configuracion.opcionesPaginacion as number[],
    decorarFiltros: Number(configuracion.decorarFiltros),
    abrirImprimirProceso: Number(configuracion.abrirImprimirProceso),
    prefijoSerialRotulacion: configuracion.prefijoSerialRotulacion,
    creado: configuracion.creado,
    modificado: configuracion.modificado,
  };
