import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorCuentaContableComponent } from '@shared/components/buscador-cuenta-contable/buscador-cuenta-contable.component';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-cuenta-contable',
  templateUrl: './filtro-cuenta-contable.component.html',
  styleUrls: ['./filtro-cuenta-contable.component.scss'],
})
export class FiltroCuentaContableComponent {
  @Input() formulario: UntypedFormGroup;
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
        puedeActualizarFormulario(this.formulario.value.cuentaContable),
        tap((cuentaContable: CuentaContable) =>
          this.formulario.patchValue({ cuentaContable: cuentaContable.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
