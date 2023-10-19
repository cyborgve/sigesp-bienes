import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PropositoSemoviente } from '@core/models/definiciones/proposito-semoviente';
import { BuscadorPropositoSemovienteComponent } from '@pages/definiciones/propositos-semoviente/buscador-proposito-semoviente/buscador-proposito-semoviente.component';

@Component({
  selector: 'app-filtro-proposito-semoviente',
  templateUrl: './filtro-proposito-semoviente.component.html',
  styleUrls: ['./filtro-proposito-semoviente.component.scss'],
})
export class FiltroPropositoSemovienteComponent {
  @Input() formulario: FormGroup;
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
        filter(todo => !!todo),
        tap((propositoSemoviente: PropositoSemoviente) =>
          this.formulario.patchValue({
            propositoSemoviente: propositoSemoviente.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }
}
