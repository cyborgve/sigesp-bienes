import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';
import { RangoFecha } from '@core/types/rango-fecha';
import { tap } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { RANGOS_FECHAS } from '@core/constants/rangos-fechas';
import { FECHAS_CALCULADAS } from '@core/constants/fechas-calculadas';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rango-fechas',
  templateUrl: './rango-fechas.component.html',
  styleUrls: ['./rango-fechas.component.scss'],
})
export class RangoFechasComponent implements OnInit {
  rangosFechas = RANGOS_FECHAS;
  rangoPersonalizado = () => this.formulario.value.rango !== 'PERSONALIZADO';
  tiposProceso = TIPOS_PROCESO;
  @Input() formulario: FormGroup;

  ngOnInit(): void {
    this.formulario.controls.rango.valueChanges
      .pipe(
        tap((rango: RangoFecha) => {
          this.formulario.patchValue({
            fechaInicio: FECHAS_CALCULADAS[rango][0],
            fechaFin: FECHAS_CALCULADAS[rango][1],
          });
        })
      )
      .subscribe();
  }
}
