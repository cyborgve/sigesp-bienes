import { UnidadAdministrativa } from '@core/new.models/unidad-administrative';
import { MDefinicionesBasicas } from '@core/models/MDefinicionesBasicas';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SigespService } from 'sigesp';
import { MUnidadAdministrativa } from '@core/models/MUnidadAdministrativa';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnidadAdministrativaService {
  constructor(private _http: HttpClient, private _sigesp: SigespService) {}

  public buscarTodasUnidadesAdministrativas(): Observable<
    UnidadAdministrativa[]
  > {
    return this._http
      .get(`${this._sigesp.URL}/dao/sbn/unidad_administrativa_dao.php?`, {
        headers: this._sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data.map(element => element as UnidadAdministrativa);
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public saveAdministrativeUnit(formGroup: FormGroup) {
    const body = {
      id_empresa: this._sigesp.usuarioActivo.empresa.id,
      id_uniadmbien: 0,
      coduniadmbien: formGroup.get('codigo').value,
      denuniadmbien: formGroup.get('denominacion').value,
      id_catuniadmin: formGroup.get('categoria').value,
      denominacion: formGroup.get('otraDenominacion').value,
      id_uniadm: formGroup.get('codUnidadAdscrita').value,
    };

    return this._http
      .post(`${this._sigesp.URL}/dao/sbn/unidad_administrativa_dao.php`, body, {
        headers: this._sigesp.getHttpHeaders(),
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
      id_empresa: this._sigesp.usuarioActivo.empresa.id,
      id_uniadmbien: id,
      coduniadmbien: formGroup.get('codigo').value,
      denuniadmbien: formGroup.get('denominacion').value,
      id_catuniadmin: formGroup.get('categoria').value,
      denominacion: formGroup.get('otraDenominacion').value,
      id_uniadm: formGroup.get('codUnidadAdscrita').value,
    };

    return this._http
      .put(`${this._sigesp.URL}/dao/sbn/unidad_administrativa_dao.php`, body, {
        headers: this._sigesp.getHttpHeaders(),
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
    return this._http
      .delete(
        `${this._sigesp.URL}/dao/sbn/unidad_administrativa_dao.php?codigo=${codigo}`,
        {
          headers: this._sigesp.getHttpHeaders(),
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
