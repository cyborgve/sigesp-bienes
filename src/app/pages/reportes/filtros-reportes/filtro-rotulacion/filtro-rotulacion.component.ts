import { Component, Input, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Rotulacion } from '@core/models/definiciones/rotulacion';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';
import { BuscadorRotulacionComponent } from '@pages/definiciones/rotulaciones/buscador-rotulacion/buscador-rotulacion.component';
import { take, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-filtro-rotulacion',
  templateUrl: './filtro-rotulacion.component.html',
  styleUrls: ['./filtro-rotulacion.component.scss'],
})
export class FiltroRotulacionComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ rotulacion: 0 });
  }

  buscarRotulacion() {
    let dialog = this._dialog.open(BuscadorRotulacionComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.rotulacion),
        tap((rotulacion: Rotulacion) =>
          this.formulario.patchValue({ rotulacion: rotulacion.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
