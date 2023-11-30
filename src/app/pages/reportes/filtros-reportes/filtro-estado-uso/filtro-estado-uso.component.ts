import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EstadoUso } from '@core/models/definiciones/estado-uso';
import { BuscadorEstadoUsoComponent } from '@pages/definiciones/estados-uso/buscador-estado-uso/buscador-estado-uso.component';

@Component({
  selector: 'app-filtro-estado-uso',
  templateUrl: './filtro-estado-uso.component.html',
  styleUrls: ['./filtro-estado-uso.component.scss'],
})
export class FiltroEstadoUsoComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ estadoUso: 0 });
  }

  buscarEstadoUso() {
    let dialog = this._dialog.open(BuscadorEstadoUsoComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((estadoUso: EstadoUso) =>
          this.formulario.patchValue({ estadoUso: estadoUso.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
