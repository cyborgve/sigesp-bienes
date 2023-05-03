import { ICausaMovimiento } from '@core/interfaces/BienesDefiniciones';

export class MCausaMovimiento {
  public idCausa: number = null;
  public codigoCausa: string = null;
  public denominacionCausa: string = null;
  public tipoCausa: string = null;
  public estatusAfectacionContable: number = null;
  public estatusAfectacionPresupuestaria: number = null;

  constructor(cm: ICausaMovimiento) {
    this.idCausa = parseInt(cm.id_causa);
    this.codigoCausa = cm.codcaumov;
    this.denominacionCausa = cm.dencaumov;
    this.tipoCausa = cm.tipcaumov;
    this.estatusAfectacionContable = parseInt(cm.estafecon);
    this.estatusAfectacionPresupuestaria = parseInt(cm.estafepre);
  }
}
