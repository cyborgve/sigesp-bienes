import { tap, take } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorCuentaContableComponent } from '@shared/components/buscador-cuenta-contable/buscador-cuenta-contable.component';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';

@Component({
  selector: 'app-filtro-cuenta-contable',
  templateUrl: './filtro-cuenta-contable.component.html',
  styleUrls: ['./filtro-cuenta-contable.component.scss'],
})
export class FiltroCuentaContableComponent {
  @Input() cuentaContable = new FormControl(['---']);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarCuentaContable() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((cuentaContable: CuentaContable) =>
          cuentaContable
            ? this.cuentaContable.patchValue(cuentaContable.id)
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
