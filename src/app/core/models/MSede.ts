import { ISede } from '@core/interfaces/BienesDefiniciones';

export class MSede {
  idEmpresa: number = null;
  idSede: number = null;
  idTipoSede: number = null;
  codigoSede: string = null;
  denominacionSede: string = null;
  localizacion: string = null;
  codigoPais: string = null;
  codigoEstado: string = null;
  codigoMunicipio: string = null;
  codigoParroquia: string = null;
  codigoCiudad: string = null;
  urbanizacion: string = null;
  calleAvenida: string = null;
  casaEdificio: string = null;
  piso: string = null;

  constructor(s: ISede) {
    this.idEmpresa = parseInt(s.id_empresa);
    this.idSede = parseInt(s.id_sede);
    this.idTipoSede = parseInt(s.id_tipsede);
    this.codigoSede = s.codsede;
    this.denominacionSede = s.densede;
    this.localizacion = s.localizacion;
    this.codigoPais = s.codpai;
    this.codigoEstado = s.codest;
    this.codigoMunicipio = s.codmun;
    this.codigoParroquia = s.codpar;
    this.codigoCiudad = s.codciu;
    this.urbanizacion = s.urbanizacion;
    this.calleAvenida = s.calleav;
    this.casaEdificio = s.casaedif;
    this.piso = s.piso;
  }
}
