import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorEstadoConservacionComponent } from '@pages/definiciones/estados-conservacion/buscador-estado-conservacion/buscador-estado-conservacion.component';
import { EstadoConservacion } from '@core/models/definiciones/estado-conservacion';

@Component({
  selector: 'app-filtro-estado-conservacion',
  templateUrl: './filtro-estado-conservacion.component.html',
  styleUrls: ['./filtro-estado-conservacion.component.scss'],
})
export class FiltroEstadoConservacionComponent {
  @Input() estadoConservacion = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarEstadoConservacion() {
    let dialog = this._dialog.open(BuscadorEstadoConservacionComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((estadoConservacion: EstadoConservacion) =>
          this.estadoConservacion.patchValue(estadoConservacion.id)
        ),
        take(1)
      )
      .subscribe();
  }
}
