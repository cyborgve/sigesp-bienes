import { Empresa } from '@core/models/otros-modulos/empresa';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarEmpresa = () => pipe(map(adaptar));
export const adaptarEmpresas = () =>
  pipe(map((empresas: any[]) => empresas.map(adaptar)));

const adaptar = (empresa: any) =>
  <Empresa>{
    id: Number(empresa.id),
    rif: empresa.rif,
    nombre: empresa.nombre,
    nombreAbreviado: empresa.nombreAbreviado,
    direccion: empresa.direccion,
    telefono: empresa.telefono,
    fax: empresa.fax,
    correoElectronico: empresa.correoElectronico,
    paginaWeb: empresa.paginaWeb,
  };
