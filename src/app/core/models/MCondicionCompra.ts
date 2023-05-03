import { ICondicionCompra } from '@core/interfaces/BienesDefiniciones';

export class McondicionCompra {
  public idEmpresa: number = null;
  public idCondicionCompra: number = null;
  public codigoCondicionCompra: string = null;
  public denominacionCondicionCompra: string = null;
  public explicacion: string = null;

  constructor(cc: ICondicionCompra) {
    this.idEmpresa = parseInt(cc.id_empresa);
    this.idCondicionCompra = parseInt(cc.id_concompra);
    this.codigoCondicionCompra = cc.codconcom;
    this.denominacionCondicionCompra = cc.denconcom;
    this.explicacion = cc.explicacion;
  }
}
