import { tap, take } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PropositoSemoviente } from '@core/models/definiciones/proposito-semoviente';
import { BuscadorPropositoSemovienteComponent } from '@pages/definiciones/propositos-semoviente/buscador-proposito-semoviente/buscador-proposito-semoviente.component';

@Component({
  selector: 'app-filtro-proposito-semoviente',
  templateUrl: './filtro-proposito-semoviente.component.html',
  styleUrls: ['./filtro-proposito-semoviente.component.scss'],
})
export class FiltroPropositoSemovienteComponent {
  @Input() propositoSemoviente = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarPropositoSemoviente() {
    let dialog = this._dialog.open(BuscadorPropositoSemovienteComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((propositoSemoviente: PropositoSemoviente) =>
          propositoSemoviente
            ? this.propositoSemoviente.patchValue(propositoSemoviente.id)
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
