import { Configuracion } from '@core/models/definiciones/configuracion';

export const ConfiguracionPorDefecto = () =>
  <Configuracion>{
    empresaId: 0,
    id: 0,
    normativaActivos: 'CGR',
    afectacionDepreciacion: 'C',
    longitudCatalogoCuentas: 8,
    longitudCodigoInstitucional: 8,
    formatoCatalogoCuentaGeneral: '####-####',
    formatoCodigoInstitucional: '####-####',
    generarAsientosContables: 1,
    fechaIncorporacionAutomatica: 1,
    usarMascaraCodigoActivo: 0,
    activarPaginacion: 1,
    opcionesPaginacion: [6, 15, 40, 100],
    mostrarBotonesInicioFinal: 1,
    mostrarOpcionesPaginacion: 1,
    decorarFiltros: 0,
    serialRotulacionAutogenerado: 1,
    prefijoSerialRotulacion: 'SBN',
    creado: new Date(),
    modificado: new Date(),
  };
