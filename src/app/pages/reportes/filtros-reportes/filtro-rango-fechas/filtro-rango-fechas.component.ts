import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';
import { TipoRangoFecha } from '@core/types/tipo-rango-fecha';
import { tap } from 'rxjs/operators';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RANGOS_FECHAS } from '@core/constants/rangos-fechas';
import { FECHAS_CALCULADAS } from '@core/constants/fechas-calculadas';
import { UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filtro-rango-fechas',
  templateUrl: './filtro-rango-fechas.component.html',
  styleUrls: ['./filtro-rango-fechas.component.scss'],
})
export class FiltroRangoFechasComponent implements OnInit, OnDestroy {
  private subscipciones: Subscription[] = [];
  rangosFechas = RANGOS_FECHAS;
  rangoPersonalizado = () => this.formulario.value.rango !== 'PERSONALIZADO';
  tiposProceso = TIPOS_PROCESO;
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;
  @Input() habilitarReferencia: boolean = false;

  ngOnInit(): void {
    this.subscipciones.push(
      this.formulario.controls.rango.valueChanges
        .pipe(
          tap((rango: TipoRangoFecha) => {
            this.formulario.patchValue({
              fechaInicio: FECHAS_CALCULADAS[rango][0],
              fechaFin: FECHAS_CALCULADAS[rango][1],
            });
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscipciones.forEach(subscipcion => subscipcion.unsubscribe());
  }
}
