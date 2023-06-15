import { CuentaContable } from './../../../../../core/types/cuenta-contable';
import { PlantillaDepreciacion } from '@core/models/plantilla-depreciacion';
import { tap } from 'rxjs/operators';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';
import { BuscadorCuentaContableComponent } from '@shared/components/buscador-cuenta-contable/buscador-cuenta-contable.component';
import { BuscadorPlantillaDepreciacionComponent } from '@pages/definiciones/plantillas-depreciacion/buscador-plantilla-depreciacion/buscador-plantilla-depreciacion.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activo-depreciacion',
  templateUrl: './activo-depreciacion.component.html',
  styleUrls: ['./activo-depreciacion.component.scss'],
})
export class ActivoDepreciacionComponent implements OnDestroy {
  private subscripciones: Subscription[] = [];
  @Input() formulario: FormGroup = new FormGroup({});

  metodosDepreciacion = METODOS_DEPRECIACION;

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
          tap((cc: CuentaContable) =>
            this.formulario.patchValue({ cuentaContableGasto: cc.cuenta })
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
          tap((cc: CuentaContable) =>
            this.formulario.patchValue({
              cuentaContableDepreciacion: cc.cuenta,
            })
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
            this.formulario.patchValue({
              metodoDepreciacion: entidad.metodoDepreciacion,
              cuentaContableGasto: entidad.cuentaContableGasto,
              cuentaContableDepreciacion: entidad.cuentaContableDepreciacion,
              vidaUtil: entidad.vidaUtil,
            })
          )
        )
        .subscribe()
    );
  }
}
