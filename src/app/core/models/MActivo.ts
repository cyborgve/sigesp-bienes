import { IActivo } from '@core/interfaces/Activo';
import { ISelect } from '@core/interfaces/BienesDefinicionesBasicas';

export class MActivo {
  public idEmpresa: number = null;
  public idActivo: number = null;
  public tipoActivo: string = null; //tab: Data General
  public idOrigen: number = null; // tab:Origen
  public catalogoCuenta: string = null; //tab: Data General
  public idUnidadAdministrativaBien: number = null; //tab:responsable
  public idSede: number = null; // //tab: ubicacion
  public codigoInternoBien: string = null; //tab: Data General
  public id_Responsable: number = null; //tab:responsable
  public peso: number = null; //tab: Data General
  public idResponsableUso: number = null; //tab:responsable
  public idEstadoUso: number = null; //tab: Data General
  public idUso: number = null; //tab: Data General
  public valorAdquisicionBien: number = null; //tab: Data General
  public codigoMoneda: number = null; //tab: Data General
  public fechaAdquisicionBien: string = null; //tab: Data General
  public fechaIngresoBien: string = null; //tab: Data General
  public idConservacion: number = null; //tab: Data General
  public explicacionEstadoConservacionBien: string = null;
  public numeroSerialBien: string = null; //tab: Data General
  public idMarca: number = null; //tab: Data General
  public idModelo: number = null; //tab: Data General
  public annoFabricacionBien: number = null; //tab: Data General
  public idColor: number = null; //tab: Data General
  public especificacionColor: string = null; //tab: Data General
  public especificacionesTecnicaBien: string = null; //tab: Data General
  public idUnidadMedidaGarantia: number = null; //tab: Data General
  public descripcionBien: string = null; //tab: Data General
  public garantia: number = null; //tab: Data General
  public idCategoria: number = null; //tab: Data General
  public fechaInicioGarantia: string = null; //tab: Data General
  public fecchaFinGarantia: string = null; //tab: Data General
  public estatusPoseeComponente: number = null; //tab: Componente
  public descripcionComponenteBien: string = null; //tab: Data General
  public estatusAsegurado: number = null; // // tab: Seguro
  public idClase: number = null; //tab: Data General
  public descripcionOtraClase: string = null; //tab: Data General
  public serialCarroceriaBien: string = null; //tab: Data General
  public serialMotorBien: string = null; //tab: Data General
  public placaSiglasBien: string = null; //tab: Data General
  public numeroTituloPropiedad: string = null; //tab: Data General
  public capacidadBien: string = null; //tab: Data General
  public nombreBien: string = null; //tab: Data General
  public estatusGPS: number = null; //tab: Data General
  public especificacionSistemaGPS: string = null; //tab: Data General
  public idTipoSemoviente: number = null; //tab: Data General
  public idRaza: number = null; //tab: Data General
  public genero: string = null; //tab: Data General
  public idPropositoSemoviente: number = null; //tab: Data General
  public idRotulacion: number = null; //tab: Data General
  public idUnidadaMedidaPeso: number = null; //tab: Data General
  public idTipoAnimal: number = null; //tab: Data General
  public fechaNacimientoAnimal: string = null; //tab: Data General
  public numeroHierro: string = null; //tab: Data General
  public especificacionAnimal: string = null; //tab: Data General
  public idSedeUbicacion: number = null; //tab: Data General
  public oficinaRegistroNotaria: string = null; //tab: Data General
  public referenciaRegistro: string = null; //tab: Data General
  public tomo: string = null; //tab: Data General
  public folio: string = null; //tab: Data General
  public protocolo: string = null; //tab: Data General
  public numeroRegistro: string = null; //tab: Data General
  public fechaRegistro: string = null; //tab: Data General
  public propietarioAnterior: string = null; //tab: Data General
  public dependencias: string = null; //tab: Data General
  public areaConstruccion: number = null; //tab: Data General
  public idUnidadMedidaConstruccion: number = null; //tab: Data General
  public areaDelTerreno: number = null; //tab: Data General
  public idUnidadMedidaTerreno: number = null; //tab: Data General
  public especificacionInmueble: string = null; //tab: Data General
  public fechaRegistroBien: string = null; //tab: Data General
  public estatusDepreciacion: number = null; //tab: Data General
  public observacion: string = null; //tab: Data General
  public estatusSede: number = null; //tab: Data General
  public idTipoComponente: number = null; //tab: Data General
  public idSeguro: number = null; // // tab: Seguro

  public vidaUtil: number = null; //tab: Depreciacion
  public valorRescate: number; //tab: Depreciacion
  public cuentaDepreciacion: string = null; //tab: Depreciacion
  public cuentaDepreciacionAcumulada: string = null; //tab: Depreciacion
  public codigoFuenteFinaciamiento: number = null; //tab: Depreciacion
  public codigoCentroCosto: string = null; //tab: Depreciacion
  public metodoDepreciacion: string = null; //tab: Depreciacion

  //nuevos campos
  public chapa: string = null; //tab: Data General
  public cuentaPresupuestaria: string = null; //
  public cuentaContable: string = null; //tab: Depreciacion
  public usoBienVehiculo: string = null; //tab: Data General
  public codigoPresupuesto: string = null; //tab: Depreciacion
  public estructuraPresupuestaria: string = null; //tab: Depreciacion

  constructor(a: IActivo) {
    this.idEmpresa = parseInt(a.id_empresa);
    this.idActivo = parseInt(a.id_activo);
    this.tipoActivo = a.tipact;
    this.idOrigen = parseInt(a.id_origen);
    this.catalogoCuenta = a.catcta;
    this.idUnidadAdministrativaBien = parseInt(a.id_uniadmbien); //responsable
    this.idSede = parseInt(a.id_sede); //responsable
    this.codigoInternoBien = a.codintbien; //data
    this.id_Responsable = parseInt(a.id_responsable); //responsable
    this.peso = a.peso;
    this.idResponsableUso = parseInt(a.id_responsable); //responsable
    this.idEstadoUso = parseInt(a.id_estadouso);
    this.idUso = parseInt(a.id_uso);
    this.valorAdquisicionBien = a.valadqbien;
    this.codigoMoneda = a.codmon;
    this.fechaAdquisicionBien = a.fecadqbien;
    this.fechaIngresoBien = a.fecingbien;
    this.idConservacion = parseInt(a.id_conservacion);
    this.explicacionEstadoConservacionBien = a.expedobien;
    this.numeroSerialBien = a.numserbien;
    this.idMarca = parseInt(a.id_marca);
    this.idModelo = parseInt(a.id_modelo);
    this.annoFabricacionBien = a.anofabbien;
    this.idColor = parseInt(a.id_color);
    this.especificacionColor = a.espcolor;
    this.especificacionesTecnicaBien = a.esptecbien;
    this.idUnidadMedidaGarantia = parseInt(a.id_unimedgar);
    this.descripcionBien = a.desbien;
    this.garantia = a.garantia;
    this.idCategoria = parseInt(a.id_categoria);
    this.fechaInicioGarantia = a.fecinigar;
    this.fecchaFinGarantia = a.fecfingar;
    this.estatusPoseeComponente = a.estposcomp;
    this.descripcionComponenteBien = a.descompbien;
    this.estatusAsegurado = a.estaseg;
    this.idClase = parseInt(a.id_clase);
    this.descripcionOtraClase = a.desotraclas;
    this.serialCarroceriaBien = a.sercarbien;
    this.serialMotorBien = a.sermotbien;
    this.placaSiglasBien = a.plasigbien;
    this.numeroTituloPropiedad = a.numtitpro;
    this.capacidadBien = a.capbien;
    this.nombreBien = a.nombien;
    this.estatusGPS = a.estgps;
    this.especificacionSistemaGPS = a.espsisgps;
    this.idTipoSemoviente = parseInt(a.id_tipsem);
    this.idRaza = parseInt(a.id_raza);
    this.genero = a.genero;
    this.idPropositoSemoviente = parseInt(a.id_prosem);
    this.idRotulacion = parseInt(a.id_rotulacion);
    this.idUnidadaMedidaPeso = parseInt(a.id_unimedpeso);
    this.idTipoAnimal = parseInt(a.id_tipani);
    this.fechaNacimientoAnimal = a.fecnacani;
    this.numeroHierro = a.numhieani;
    this.especificacionAnimal = a.espani;
    this.idSedeUbicacion = parseInt(a.id_sede_ubicacion);
    this.oficinaRegistroNotaria = a.ofiregnot;
    this.referenciaRegistro = a.refreg;
    this.tomo = a.tomo;
    this.folio = a.folio;
    this.protocolo = a.protocolo;
    this.numeroRegistro = a.numreg;
    this.fechaRegistro = a.fecreg;
    this.propietarioAnterior = a.propant;
    this.dependencias = a.dependencias;
    this.areaConstruccion = a.areaconst;
    this.idUnidadMedidaConstruccion = parseInt(a.id_unimedconst);
    this.areaDelTerreno = parseInt(a.area_de_terreno);
    this.idUnidadMedidaTerreno = parseInt(a.id_unimedterr);
    this.especificacionInmueble = a.espinm;
    this.fechaRegistroBien = a.fecregbien;
    this.cuentaDepreciacion = a.sc_ctagasdep;
    this.cuentaDepreciacionAcumulada = a.sc_ctadepacum;
    this.estatusDepreciacion = a.estdeprec;
    this.estatusSede = a.estsede;
    this.idSeguro = parseInt(a.id_seguro);
    this.idTipoComponente = parseInt(a.id_tipcomp);
    this.observacion = a.observacion;
    this.vidaUtil = a.vidautil;
    this.codigoCentroCosto = a.codcencos;
    this.codigoFuenteFinaciamiento = a.codfuefin;
    this.valorRescate = a.valrescate;
    this.metodoDepreciacion = a.metdep;
    this.chapa = a.chapa;
    this.cuentaPresupuestaria = a.sig_cuenta;
    this.cuentaContable = a.sc_cuenta;
    this.usoBienVehiculo = a.usobieveh;
    this.codigoPresupuesto = a.sig_cuentapre;
    this.estructuraPresupuestaria = a.estprog;
  }
}

export const TipoActivo: ISelect[] = [
  { value: 'M', denominacion: 'Mueble' },
  { value: 'I', denominacion: 'Inmueble' },
  { value: 'S', denominacion: 'Semoviente' },
  { value: 'C', denominacion: 'Componete' },
];

export const MetodoDepreciacion: ISelect[] = [
  { value: 'L', denominacion: 'Linea Recta' },
];
