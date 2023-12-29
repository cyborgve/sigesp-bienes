import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Configuracion } from '@core/models/definiciones/configuracion';

export const adaptarConfiguracion = () => pipe(map(adaptar));
export const adaptarConfiguraciones = () =>
  pipe(map((configuraciones: any[]) => configuraciones.map(adaptar)));

const adaptar = (configuracion: any) => {
  let opcionesPaginacion: number[] = [];
  String(configuracion.opcionesPaginacion)
    .split(',')
    .map(numero => Number(numero))
    .forEach(opcion => opcionesPaginacion.push(opcion));
  return <Configuracion>{
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
    opcionesPaginacion: opcionesPaginacion,
    mostrarBotonesInicioFinal: Number(configuracion.mostrarBotonesInicioFinal),
    mostrarOpcionesPaginacion: Number(configuracion.mostrarOpcionesPaginacion),
    decorarFiltros: Number(configuracion.decorarFiltros),
    serialRotulacionAutogenerado: Number(configuracion.abrirImprimirProceso),
    prefijoSerialRotulacion: configuracion.prefijoSerialRotulacion,
    creado: configuracion.creado,
    modificado: configuracion.modificado,
  };
};
