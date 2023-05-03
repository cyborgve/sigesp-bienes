import { IUnidadAdministrativa } from '@core/interfaces/BienesDefiniciones';

export class MUnidadAdministrativa {
  public idEmpresa: number = null;
  public idUnidadAdministrativaBien: number = null;
  public codigoUnidadAdministrativa: string = null;
  public denominacionUnidadAdministrativaBien: string = null;
  public idCategoriaUnidad: number = null;
  public denominacion: string = null;
  public idUnidadAdministrativa: number = null;

  constructor(ua: IUnidadAdministrativa) {
    this.idEmpresa = parseInt(ua.id_empresa);
    this.idUnidadAdministrativaBien = parseInt(ua.id_uniadmbien);
    this.codigoUnidadAdministrativa = ua.coduniadmbien;
    this.denominacionUnidadAdministrativaBien = ua.denuniadmbien;
    this.idCategoriaUnidad = parseInt(ua.id_catuniadmin);
    this.denominacion = ua.denominacion;
    this.idUnidadAdministrativa = parseInt(ua.id_uniadm);
  }
}
