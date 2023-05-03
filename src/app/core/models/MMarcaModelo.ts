import { IMarcas, IModelo } from '../interfaces/BienesDefiniciones';
import {} from '@core/interfaces/BienesDefiniciones';

export class MMarcas {
  public idMarca: number;
  public codigoMarca: string;
  public denominacionMarca: string;
  public tipoMarca: number;

  constructor(m: IMarcas) {
    this.idMarca = parseInt(m.id_marca);
    this.codigoMarca = m.codmarca;
    this.denominacionMarca = m.denmarca;
    this.tipoMarca = parseInt(m.id_tipomarca);
  }
}

export class MModelo {
  public idMarca: number;
  public idModelo: number;
  public codigoModelo: string;
  public denominacionModelo: string;

  constructor(mod: IModelo) {
    this.idMarca = parseInt(mod.id_marca);
    this.idModelo = parseInt(mod.id_modelo);
    this.codigoModelo = mod.codmodelo;
    this.denominacionModelo = mod.denmodelo;
  }
}
