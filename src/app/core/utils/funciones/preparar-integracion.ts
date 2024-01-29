import { Integracion } from '@core/models/procesos/integracion';

export const prepararIntegracion = (integracion: any) =>
  <Integracion>{
    empresaId: Number(integracion.empresaId) || 0,
    id: Number(integracion.id) || 0,
    proceso: Number(integracion.proceso),
    procesoTipo: integracion.procesoTipo,
    procesoComprobante: integracion.procesoComprobante,
    activo: integracion.activo,
    aprobado: Number(integracion.aprobado),
    integrado: Number(integracion.integrado),
    registrado: Number(integracion.registrado),
    creado: integracion.creado,
    modificado: integracion.modificado,
  };
