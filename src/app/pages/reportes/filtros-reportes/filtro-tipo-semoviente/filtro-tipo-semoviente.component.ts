import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorTipoSemovienteComponent } from '@pages/definiciones/tipos-semoviente/buscador-tipo-semoviente/buscador-tipo-semoviente.component';
import { TipoSemoviente } from '@core/models/definiciones/tipo-semoviente';

@Component({
  selector: 'app-filtro-tipo-semoviente',
  templateUrl: './filtro-tipo-semoviente.component.html',
  styleUrls: ['./filtro-tipo-semoviente.component.scss'],
})
export class FiltroTipoSemovienteComponent {
  @Input() formulario: FormGroup;
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
        filter(todo => !!todo),
        tap((tipoSemoviente: TipoSemoviente) =>
          this.formulario.patchValue({ tipoSemoviente: tipoSemoviente.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
