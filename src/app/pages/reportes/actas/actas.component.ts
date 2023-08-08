import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RANGOS_FECHAS } from '@core/constants/rangos-fechas';
import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';

@Component({
  selector: 'app-actas',
  templateUrl: './actas.component.html',
  styleUrls: ['./actas.component.scss'],
})
export class ActasComponent {
  titulo = 'Reportes de Actas';
  fechaEmision = new Date();
  rangosFechas = RANGOS_FECHAS;
  formularioRangoFechas: FormGroup;
  procesos = TIPOS_PROCESO;

  constructor(private _formBuilder: FormBuilder) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['HOY'],
      fechaInicio: [new Date()],
      fechaFin: [undefined],
    });
  }
}
