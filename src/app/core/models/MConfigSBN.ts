import { IConfigSBN } from '@core/interfaces/BienesDefiniciones';

export class MConfigSBN {
  public idEmpresa: number = null;
  public idSbn: number = null;
  public afectacionDepreciacion: string = null;
  public fechaIncorporacionAutomatica: number = null;
  public generarAsientoContable: number = null;
  public normartiaActivoFijo: string = null;
  public estatusSeparadorMascara: number = null;
  public longMaxCaracterCuentaGeneral: number = null;
  public longMaxCaracterCuentaInstitucionalActivo: number = null;
  public formatoCuentaInstitucionalActivo: string = null;
  public formatoCuentaGeneral: string = null;

  constructor(c: IConfigSBN) {
    this.idEmpresa = parseInt(c.id_empresa);
    this.idSbn = parseInt(c.id_sbn);
    this.afectacionDepreciacion = c.afedep;
    this.fechaIncorporacionAutomatica = parseInt(c.fecincaut);
    this.generarAsientoContable = parseInt(c.estgenasiconsbn);
    this.normartiaActivoFijo = c.noract;
    this.estatusSeparadorMascara = parseInt(c.estsepmascodact);
    this.longMaxCaracterCuentaGeneral = parseInt(c.lonmaxcatctagral);
    this.longMaxCaracterCuentaInstitucionalActivo = parseInt(c.lonmaxcodinsact);
    this.formatoCuentaGeneral = c.formcatctagral;
    this.formatoCuentaInstitucionalActivo = c.formcodinsact;
  }
}
