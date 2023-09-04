import { tap, take } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorTipoSemovienteComponent } from '@pages/definiciones/tipos-semoviente/buscador-tipo-semoviente/buscador-tipo-semoviente.component';
import { TipoSemoviente } from '@core/models/definiciones/tipo-semoviente';

@Component({
  selector: 'app-filtro-tipo-semoviente',
  templateUrl: './filtro-tipo-semoviente.component.html',
  styleUrls: ['./filtro-tipo-semoviente.component.scss'],
})
export class FiltroTipoSemovienteComponent {
  @Input() tipoSemoviente = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarTipoSemoviente() {
    let dialog = this._dialog.open(BuscadorTipoSemovienteComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((tipoSemoviente: TipoSemoviente) =>
          tipoSemoviente
            ? this.tipoSemoviente.patchValue(tipoSemoviente.id)
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
