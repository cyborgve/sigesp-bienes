import { MDefinicionesBasicas } from '@core/models/MDefinicionesBasicas';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SigespService } from 'sigesp';
import { MUnidadAdministrativa } from '@core/models/MUnidadAdministrativa';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UnidadAdministrativaService {
  constructor(private http: HttpClient, private sigesp: SigespService) {}

  public getAllAdministrativeUnit() {
    return this.http
      .get(`${this.sigesp.URL}/dao/sbn/unidad_administrativa_dao.php?`, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data.map(
              element => new MUnidadAdministrativa(element)
            );
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public saveAdministrativeUnit(formGroup: FormGroup) {
    const body = {
      id_empresa: this.sigesp.usuarioActivo.empresa.id,
      id_uniadmbien: 0,
      coduniadmbien: formGroup.get('codigo').value,
      denuniadmbien: formGroup.get('denominacion').value,
      id_catuniadmin: formGroup.get('categoria').value,
      denominacion: formGroup.get('otraDenominacion').value,
      id_uniadm: formGroup.get('codUnidadAdscrita').value,
    };

    return this.http
      .post(`${this.sigesp.URL}/dao/sbn/unidad_administrativa_dao.php`, body, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            if (res.data != null) {
              res.data = res.data.map(
                element => new MUnidadAdministrativa(element)
              );
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

  public updateAdministrativeUnit(formGroup: FormGroup, id: number) {
    const body = {
      id_empresa: this.sigesp.usuarioActivo.empresa.id,
      id_uniadmbien: id,
      coduniadmbien: formGroup.get('codigo').value,
      denuniadmbien: formGroup.get('denominacion').value,
      id_catuniadmin: formGroup.get('categoria').value,
      denominacion: formGroup.get('otraDenominacion').value,
      id_uniadm: formGroup.get('codUnidadAdscrita').value,
    };

    return this.http
      .put(`${this.sigesp.URL}/dao/sbn/unidad_administrativa_dao.php`, body, {
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

  public deleteAdministrativeUnit(codigo: number) {
    return this.http
      .delete(
        `${this.sigesp.URL}/dao/sbn/unidad_administrativa_dao.php?codigo=${codigo}`,
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
