import { FormGroup } from '@angular/forms';
import { MModelo } from './../models/MMarcaModelo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SigespService } from 'sigesp';
import { map } from 'rxjs/operators';
import { MMarcas } from '@core/models/MMarcaModelo';

@Injectable({
  providedIn: 'root',
})
export class MarcaModeloService {
  constructor(private http: HttpClient, private sigesp: SigespService) {}

  public getAllBrand() {
    return this.http
      .get(`${this.sigesp.URL}/dao/sbn/marcas_dao.php`, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            if (res.data != null) {
              res.data = res.data.map(element => new MMarcas(element));
            } else {
              res.data = [];
            }
          }
          return res;
        })
      );
  }

  public getBrandModels(idMarca: number) {
    return this.http
      .get(`${this.sigesp.URL}/dao/sbn/modelos_dao.php?codigo=${idMarca}`, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data.map(element => new MModelo(element));
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public saveBrand(formGroup: FormGroup, modelo: MModelo[]) {
    let model = [];
    modelo.forEach(e => {
      model.push({
        id_marca: e.idMarca,
        id_modelo: e.idModelo,
        codmodelo: e.codigoModelo,
        denmodelo: e.denominacionModelo,
      });
    });
    const body = {
      codmarca: formGroup.get('codigo').value,
      denmarca: formGroup.get('denominacion').value,
      id_tipomarca: formGroup.get('tipoMarca').value,
      model: model,
    };
    return this.http
      .post(`${this.sigesp.URL}/dao/sbn/marcas_dao.php`, body, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            if (res.data != null) {
              res.data = res.data.map(element => new MMarcas(element));
            } else {
              res.data = [];
            }
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public updateBrand(formGroup: FormGroup, idMarca: number, modelo: MModelo[]) {
    let model = [];
    modelo.forEach(e => {
      model.push({
        id_marca: e.idMarca,
        id_modelo: e.idModelo,
        codmodelo: e.codigoModelo,
        denmodelo: e.denominacionModelo,
      });
    });
    const body = {
      id_marca: idMarca,
      codmarca: formGroup.get('codigo').value,
      denmarca: formGroup.get('denominacion').value,
      id_tipomarca: formGroup.get('tipoMarca').value,
      model: model,
    };
    return this.http
      .put(`${this.sigesp.URL}/dao/sbn/marcas_dao.php`, body, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            if (res.data != null) {
              res.data = res.data;
            } else {
              res.data = [];
            }
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public deleteBrand(codigo: number) {
    return this.http
      .delete(`${this.sigesp.URL}/dao/sbn/marcas_dao.php?codigo=${codigo}`, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data;
          }
          return res;
        })
      );
  }

  public deleteModels(delComponetes: MModelo[]) {
    let ids: string = '';
    delComponetes.forEach(e => {
      if (e.idModelo.toString() == '') {
        ids = e.idModelo.toString();
      } else {
        ids = ids + `,${e.idModelo}`;
      }
    });
    return this.http
      .delete(`${this.sigesp.URL}/dao/sbn/modelos_dao.php?ids=${ids}`, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data;
          } else res.data = [];
          return res;
        })
      );
  }
}
