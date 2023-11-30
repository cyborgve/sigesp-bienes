import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorCuentaContableComponent } from '@shared/components/buscador-cuenta-contable/buscador-cuenta-contable.component';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';

@Component({
  selector: 'app-filtro-cuenta-contable',
  templateUrl: './filtro-cuenta-contable.component.html',
  styleUrls: ['./filtro-cuenta-contable.component.scss'],
})
export class FiltroCuentaContableComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ cuentaContable: 'Todos' });
  }

  buscarCuentaContable() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((cuentaContable: CuentaContable) =>
          this.formulario.patchValue({ cuentaContable: cuentaContable.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
