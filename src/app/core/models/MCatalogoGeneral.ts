import { ICatalogoGeneral } from '@core/interfaces/BienesDefiniciones';

export class MCatalogoGeneral {
  public idEmpresa: number = null;
  public catalogoCuenta: string = null;
  public denominacionCuenta: string = null;
  public cuentaReferencia: string = null;
  public estatusMovimiento: string = null;

  constructor(cg: ICatalogoGeneral) {
    this.idEmpresa = parseInt(cg.id_empresa);
    this.catalogoCuenta = cg.catcta;
    this.denominacionCuenta = cg.dencat;
    this.cuentaReferencia = cg.ctaref;
    this.estatusMovimiento = cg.estmov;
  }
}
