import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorTipoSemovienteComponent } from '@pages/definiciones/tipos-semoviente/buscador-tipo-semoviente/buscador-tipo-semoviente.component';
import { TipoSemoviente } from '@core/models/definiciones/tipo-semoviente';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-tipo-semoviente',
  templateUrl: './filtro-tipo-semoviente.component.html',
  styleUrls: ['./filtro-tipo-semoviente.component.scss'],
})
export class FiltroTipoSemovienteComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ tipoSemoviente: 0 });
  }

  buscarTipoSemoviente() {
    let dialog = this._dialog.open(BuscadorTipoSemovienteComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.tipoSemoviente),
        tap((tipoSemoviente: TipoSemoviente) =>
          this.formulario.patchValue({ tipoSemoviente: tipoSemoviente.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
