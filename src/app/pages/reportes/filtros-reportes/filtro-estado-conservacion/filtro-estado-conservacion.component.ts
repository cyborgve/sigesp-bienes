import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorEstadoConservacionComponent } from '@pages/definiciones/estados-conservacion/buscador-estado-conservacion/buscador-estado-conservacion.component';
import { EstadoConservacion } from '@core/models/definiciones/estado-conservacion';

@Component({
  selector: 'app-filtro-estado-conservacion',
  templateUrl: './filtro-estado-conservacion.component.html',
  styleUrls: ['./filtro-estado-conservacion.component.scss'],
})
export class FiltroEstadoConservacionComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ estadoConservacion: 0 });
  }

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
          this.formulario.patchValue({
            estadoConservacion: estadoConservacion.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }
}
