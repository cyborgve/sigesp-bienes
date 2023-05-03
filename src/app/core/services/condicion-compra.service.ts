import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { SigespService } from 'sigesp';
import { McondicionCompra } from '@core/models/MCondicionCompra';

@Injectable({
  providedIn: 'root',
})
export class CondicionCompraService {
  constructor(private http: HttpClient, private sigesp: SigespService) {}

  public getAllBuyCondition() {
    return this.http
      .get(`${this.sigesp.URL}/dao/sbn/condicion_compra_dao.php?`, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data.map(element => new McondicionCompra(element));
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public saveBuyCondition(formGroup: FormGroup) {
    const body = {
      id_empresa: this.sigesp.usuarioActivo.empresa.id,
      codconcom: formGroup.get('codigo').value,
      denconcom: formGroup.get('denominacion').value,
      explicacion: formGroup.get('explicacion').value,
    };
    return this.http
      .post(`${this.sigesp.URL}/dao/sbn/condicion_compra_dao.php`, body, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            if (res.data != null) {
              res.data = res.data.map(element => new McondicionCompra(element));
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

  public updateBuyCondition(formGroup: FormGroup, id: number) {
    const body = {
      id_concompra: id,
      id_empresa: this.sigesp.usuarioActivo.empresa.id,
      codconcom: formGroup.get('codigo').value,
      denconcom: formGroup.get('denominacion').value,
      explicacion: formGroup.get('explicacion').value,
    };
    return this.http
      .put(`${this.sigesp.URL}/dao/sbn/condicion_compra_dao.php`, body, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data;
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public deleteBuyCondition(codigo: number) {
    return this.http
      .delete(
        `${this.sigesp.URL}/dao/sbn/condicion_compra_dao.php?codigo=${codigo}`,
        {
          headers: this.sigesp.getHttpHeaders(),
        }
      )
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data;
          }
          return res;
        })
      );
  }
}
