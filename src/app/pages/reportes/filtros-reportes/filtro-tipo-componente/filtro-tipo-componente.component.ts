import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TipoComponente } from '@core/models/definiciones/tipo-componente';
import { BuscadorTipoComponenteComponent } from '@pages/definiciones/tipos-componente/buscador-tipo-componente/buscador-tipo-componente.component';

@Component({
  selector: 'app-filtro-tipo-componente',
  templateUrl: './filtro-tipo-componente.component.html',
  styleUrls: ['./filtro-tipo-componente.component.scss'],
})
export class FiltroTipoComponenteComponent {
  @Input() tipoComponente = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarTipoComponente() {
    let dialog = this._dialog.open(BuscadorTipoComponenteComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((tipoComponente: TipoComponente) =>
          this.tipoComponente.patchValue(tipoComponente.id)
        ),
        take(1)
      )
      .subscribe();
  }
}
