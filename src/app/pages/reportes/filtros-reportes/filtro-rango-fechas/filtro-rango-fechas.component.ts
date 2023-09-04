import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';
import { RangoFecha } from '@core/types/rango-fecha';
import { tap } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { RANGOS_FECHAS } from '@core/constants/rangos-fechas';
import { FECHAS_CALCULADAS } from '@core/constants/fechas-calculadas';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filtro-rango-fechas',
  templateUrl: './filtro-rango-fechas.component.html',
  styleUrls: ['./filtro-rango-fechas.component.scss'],
})
export class FiltroRangoFechasComponent implements OnInit {
  rangosFechas = RANGOS_FECHAS;
  rangoPersonalizado = () => this.formulario.value.rango !== 'PERSONALIZADO';
  tiposProceso = TIPOS_PROCESO;
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  ngOnInit(): void {
    this.formulario.controls.rango.valueChanges
      .pipe(
        tap((rango: RangoFecha) => {
          this.formulario.patchValue({
            fechaInicio: FECHAS_CALCULADAS[rango][0],
            fechaFin: FECHAS_CALCULADAS[rango][1],
            fechaReferencia: 'CREADO',
          });
        })
      )
      .subscribe();
  }
}
