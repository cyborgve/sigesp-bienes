import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { RANGOS_FECHAS } from '@core/constants/rangos-fechas';
import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';

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

  constructor(private _formBuilder: FormBuilder) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['HOY'],
      fechaInicio: [new Date()],
      fechaFin: [undefined],
    });
  }
}
