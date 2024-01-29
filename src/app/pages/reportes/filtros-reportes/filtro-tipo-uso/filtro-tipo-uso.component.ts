import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorTipoUsoComponent } from '@pages/definiciones/tipos-uso/buscador-tipo-uso/buscador-tipo-uso.component';
import { TipoUso } from '@core/models/definiciones/tipo-uso';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-tipo-uso',
  templateUrl: './filtro-tipo-uso.component.html',
  styleUrls: ['./filtro-tipo-uso.component.scss'],
})
export class FiltroTipoUsoComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ tipoUso: 0 });
  }

  buscarTipoUso() {
    let dialog = this._dialog.open(BuscadorTipoUsoComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.tipoUso),
        tap((tipoUso: TipoUso) =>
          this.formulario.patchValue({ tipoUso: tipoUso.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
