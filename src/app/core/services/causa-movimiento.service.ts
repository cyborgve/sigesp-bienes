import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { MCausaMovimiento } from '@core/models/MCausaMovimiento';

@Injectable({
  providedIn: 'root',
})
export class CausaMovimientoService {
  constructor(private http: HttpClient, private sigesp: SigespService) {}

  public getAllCauseMovement() {
    return this.http
      .get(`${this.sigesp.URL}/dao/sbn/causa_movimiento_dao.php?`, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data.map(element => new MCausaMovimiento(element));
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public saveCauseMovement(formGroup: FormGroup) {
    let estafecon = formGroup.get('estatusContabilidad').value;
    if (estafecon == 0) {
      estafecon = 0;
    } else {
      estafecon = 1;
    }
    let estafepre = formGroup.get('estatusPresupuesto').value;
    if (estafepre == 0) {
      estafepre = 0;
    } else {
      estafepre = 1;
    }
    const body = {
      codcaumov: formGroup.get('codigo').value,
      dencaumov: formGroup.get('denominacion').value,
      tipcaumov: formGroup.get('tipoCausa').value,
      estafecon: estafecon,
      estafepre: estafepre,
    };
    return this.http
      .post(`${this.sigesp.URL}/dao/sbn/causa_movimiento_dao.php`, body, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            if (res.data != null) {
              res.data = res.data.map(element => new MCausaMovimiento(element));
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

  public updateCauseMovement(formGroup: FormGroup, id: number) {
    let estafecon = formGroup.get('estatusContabilidad').value;
    if (estafecon == 0) {
      estafecon = 0;
    } else {
      estafecon = 1;
    }
    let estafepre = formGroup.get('estatusPresupuesto').value;
    if (estafepre == 0) {
      estafepre = 0;
    } else {
      estafepre = 1;
    }
    const body = {
      id_causa: id,
      id_empresa: this.sigesp.usuarioActivo.empresa.id,
      codcaumov: formGroup.get('codigo').value,
      dencaumov: formGroup.get('denominacion').value,
      tipcaumov: formGroup.get('tipoCausa').value,
      estafecon: estafecon,
      estafepre: estafepre,
    };
    return this.http
      .put(`${this.sigesp.URL}/dao/sbn/causa_movimiento_dao.php`, body, {
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

  public deleteCauseMovement(codigo: number) {
    return this.http
      .delete(
        `${this.sigesp.URL}/dao/sbn/causa_movimiento_dao.php?codigo=${codigo}`,
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
