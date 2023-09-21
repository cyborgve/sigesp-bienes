import { Empresa } from '@core/models/otros-modulos/empresa';

export const seccionEmpresaReporte = (empresa: Empresa) => [
  {
    text: empresa.nombre + ' ' + empresa.rif,
    style: 'nombreEmpresa',
  },
  {
    text: empresa.direccion,
    style: 'datosEmpresa',
  },
  {
    text: `Teléfonos: ${empresa.telefono}  Fax: ${empresa.fax}`,
    style: 'datosEmpresa',
  },
  {
    text: `Correo electrónico: ${empresa.correoElectronico}`,
    style: 'datosEmpresa',
  },
];
