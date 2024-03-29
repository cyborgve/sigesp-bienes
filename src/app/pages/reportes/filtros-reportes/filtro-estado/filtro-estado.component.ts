import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Estado } from '@core/models/otros-modulos/estado';
import { BuscadorEstadoComponent } from '@shared/components/buscador-estado/buscador-estado.component';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-estado',
  templateUrl: './filtro-estado.component.html',
  styleUrls: ['./filtro-estado.component.scss'],
})
export class FiltroEstadoComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ estado: 'Todos' });
  }

  buscarEstado() {
    let dialog = this._dialog.open(BuscadorEstadoComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.estado),
        tap((estado: Estado) =>
          this.formulario.patchValue({ estado: estado.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
