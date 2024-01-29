import { Integracion } from '@core/models/procesos/integracion';

export const prepararIntegracion = (integracion: Integracion) => ({
  empresaId: Number(integracion.empresaId),
  id: Number(integracion.id),
  comprobante: integracion.procesoComprobante,
  tipoProceso: integracion.procesoTipo,
  activo: integracion.activo,
  aprobado: integracion.aprobado ? 1 : 0,
  integrado: integracion.integrado ? 1 : 0,
  creado: integracion.creado,
  modificado: integracion.modificado,
});
