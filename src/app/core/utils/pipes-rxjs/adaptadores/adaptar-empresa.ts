import { Empresa } from '@core/models/otros-modulos/empresa';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarEmpresa = () => pipe(map(adaptar));
export const adaptarEmpresas = () =>
  pipe(map((empresas: any[]) => empresas.map(adaptar)));

const adaptar = (empresa: any) =>
  <Empresa>{
    id: Number(empresa.id_empresa),
    rif: empresa.rifemp,
    nombre: empresa.nomemp,
    nombreAbreviado: empresa.titemp,
    direccion: empresa.diremp,
    telefono: empresa.telemp,
    fax: empresa.faxemp,
    correoElectronico: empresa.emaemp,
    paginaWeb: empresa.webemp,
  };
