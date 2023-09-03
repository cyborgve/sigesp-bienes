import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { RANGOS_FECHAS } from '@core/constants/rangos-fechas';
import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-listado-activos',
  templateUrl: './listado-activos.component.html',
  styleUrls: ['./listado-activos.component.scss'],
})
export class ListadoActivosComponent {
  titulo = 'Listado de Bienes';
  fechaEmision = new Date();
  rangosFechas = RANGOS_FECHAS;
  formularioRangoFechas: FormGroup;
  procesos = TIPOS_PROCESO;
  columnasVisibles = COLUMNAS_VISIBLES['ACTIVOS'].filter(c => c !== 'acciones');

  activo = <Activo>{};

  constructor(
    private _formBuilder: FormBuilder,
    private _activo: ActivoService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['TODOS'],
      fechaInicio: [undefined],
      fechaFin: [undefined],
      fechaReferencia: ['CREADO'],
    });
    this._activo
      .buscarTodos()
      .pipe(
        switchMap(activos => this._activo.buscarPorId(activos[0].id)),
        tap(activo => (this.activo = activo)),
        take(1)
      )
      .subscribe();
  }
}
