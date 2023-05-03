import { ISeguros } from '@core/interfaces/BienesDefiniciones';

export class MSeguros {
  idSeguro: number = null;
  codigoSeguro: string = null;
  denominacionSeguro: string = null;
  idAseguradora: number = null;
  idTipoPoliza: number = null;
  idTipCobertura: number = null;
  poliza: string = null;
  montoAsegurado: number = null;
  fechaInicioPoliza: string = null;
  fechaFinPoliza: string = null;
  codigoMoneda: number = null;
  monedaSecundaria: number = null;
  estatusResposabilidadCivil: number = null;
  descripcionCobertura: string = null;
  coberturaAdicional: number = null;

  constructor(s: ISeguros) {
    this.idSeguro = parseInt(s.id_seguro);
    this.codigoSeguro = s.codseg;
    this.denominacionSeguro = s.denseg;
    this.idAseguradora = parseInt(s.id_aseguradora);
    this.idTipoPoliza = parseInt(s.id_tipopoliza);
    this.idTipCobertura = parseInt(s.id_tipcob);
    this.poliza = s.poliza;
    this.montoAsegurado = parseInt(s.monaseg);
    this.fechaInicioPoliza = s.fecfinpol;
    this.fechaFinPoliza = s.fecfinpol;
    this.codigoMoneda = parseInt(s.codmon);
    this.monedaSecundaria = parseInt(s.monsec);
    this.estatusResposabilidadCivil = parseInt(s.estrescivil);
    this.descripcionCobertura = s.descob;
    this.coberturaAdicional = parseInt(s.cobadi);
  }
}
