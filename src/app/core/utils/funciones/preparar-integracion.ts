import { Integracion } from '@core/models/procesos/integracion';

export const prepararIntegracion = (integracion: any) =>
  <Integracion>{
    empresaId: Number(integracion.empresaId) || 0,
    id: Number(integracion.id) || 0,
    proceso: Number(integracion.proceso),
    procesoTipo: integracion.procesoTipo,
    procesoComprobante: integracion.procesoComprobante,
    activo: integracion.activo,
    aprobado: transformarValor(integracion.aprobado),
    integrado: transformarValor(integracion.integrado),
    registrado: transformarValor(integracion.registrado),
    creado: integracion.creado,
    modificado: integracion.modificado,
  };

const transformarValor = (valor: any) => {
  if (typeof valor === 'number') return valor;
  if (typeof valor === 'boolean') return valor ? 1 : 0;
  if (typeof valor === 'string') return Number(valor);
  return 0;
};
