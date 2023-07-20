import { PlantillaDepreciacion } from '@core/models/definiciones/plantilla-depreciacion';
import { tap, take } from 'rxjs/operators';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';
import { BuscadorCuentaContableComponent } from '@shared/components/buscador-cuenta-contable/buscador-cuenta-contable.component';
import { BuscadorPlantillaDepreciacionComponent } from '@pages/definiciones/plantillas-depreciacion/buscador-plantilla-depreciacion/buscador-plantilla-depreciacion.component';
import { Subscription } from 'rxjs';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';
import { BuscadorMonedaComponent } from '@shared/components/buscador-moneda/buscador-moneda.component';
import { Basica } from '@core/models/auxiliares/basica';
import { UNIDADES_MEDIDA } from '@core/constants/unidades-medida';

@Component({
  selector: 'app-activo-depreciacion',
  templateUrl: './activo-depreciacion.component.html',
  styleUrls: ['./activo-depreciacion.component.scss'],
})
export class ActivoDepreciacionComponent implements OnDestroy {
  private subscripciones: Subscription[] = [];
  @Input() formulario: FormGroup = new FormGroup({});

  metodosDepreciacion = METODOS_DEPRECIACION;
  unidadesTiempo = UNIDADES_MEDIDA['TIEMPO'];

  constructor(private _dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  buscarCuentaContableGasto() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((cuentaContable: CuentaContable) =>
            cuentaContable
              ? this.formulario.patchValue({
                  cuentaContableGasto: cuentaContable.id,
                })
              : undefined
          )
        )
        .subscribe()
    );
  }

  buscarCuentaContableDepreciacion() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((cuentaContable: CuentaContable) =>
            cuentaContable
              ? this.formulario.patchValue({
                  cuentaContableDepreciacion: cuentaContable.id,
                })
              : undefined
          )
        )
        .subscribe()
    );
  }

  buscarPlantillaDepreciacion() {
    let dialog = this._dialog.open(BuscadorPlantillaDepreciacionComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((entidad: PlantillaDepreciacion) =>
            entidad
              ? this.formulario.patchValue({
                  metodoDepreciacion: entidad.metodoDepreciacion,
                  cuentaContableGasto: entidad.cuentaContableGasto,
                  cuentaContableDepreciacion:
                    entidad.cuentaContableDepreciacion,
                  vidaUtil: entidad.vidaUtil,
                })
              : undefined
          )
        )
        .subscribe()
    );
  }

  buscarMoneda() {
    let dialog = this._dialog.open(BuscadorMonedaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        take(1),
        tap((entidad: Basica) =>
          entidad
            ? this.formulario.patchValue({ monedaIdValorRescate: entidad.id })
            : undefined
        )
      )
      .subscribe();
  }
}
