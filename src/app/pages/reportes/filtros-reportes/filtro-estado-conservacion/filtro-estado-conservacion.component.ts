import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorEstadoConservacionComponent } from '@pages/definiciones/estados-conservacion/buscador-estado-conservacion/buscador-estado-conservacion.component';
import { EstadoConservacion } from '@core/models/definiciones/estado-conservacion';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-estado-conservacion',
  templateUrl: './filtro-estado-conservacion.component.html',
  styleUrls: ['./filtro-estado-conservacion.component.scss'],
})
export class FiltroEstadoConservacionComponent {
  @Input() formulario: UntypedFormGroup;
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
        puedeActualizarFormulario(this.formulario.value.estadoConservacion),
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
