import { first, tap } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';
import { BuscadorCuentaContableComponent } from '@shared/components/buscador-cuenta-contable/buscador-cuenta-contable.component';

@Component({
  selector: 'app-activo-depreciacion',
  templateUrl: './activo-depreciacion.component.html',
  styleUrls: ['./activo-depreciacion.component.scss'],
})
export class ActivoDepreciacionComponent {
  @Input() formulario: FormGroup = new FormGroup({});

  metodosDepreciacion = METODOS_DEPRECIACION;

  constructor(private _dialog: MatDialog) {}

  buscarCuentaContableGasto() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        first(),
        tap(cuentaContable =>
          this.formulario.patchValue({ cuentaContableGasto: cuentaContable })
        )
      )
      .subscribe();
  }

  buscarCuentaContableDepreciacion() {
    TODO: 'preguntar de donde se obtienen estos datos';
  }

  buscarPlantillaDepreciacion() {
    alert('TO-DO');
  }
}
