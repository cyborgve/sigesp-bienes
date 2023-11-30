import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TipoComponente } from '@core/models/definiciones/tipo-componente';
import { BuscadorTipoComponenteComponent } from '@pages/definiciones/tipos-componente/buscador-tipo-componente/buscador-tipo-componente.component';

@Component({
  selector: 'app-filtro-tipo-componente',
  templateUrl: './filtro-tipo-componente.component.html',
  styleUrls: ['./filtro-tipo-componente.component.scss'],
})
export class FiltroTipoComponenteComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ tipoComponente: 0 });
  }

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
          this.formulario.patchValue({ tipoComponente: tipoComponente.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
