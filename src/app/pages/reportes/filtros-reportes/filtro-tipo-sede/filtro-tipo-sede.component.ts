import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { BuscadorTipoSedeComponent } from '@pages/definiciones/tipos-sede/buscador-tipo-sede/buscador-tipo-sede.component';
import { TipoSede } from '@core/models/definiciones/tipo-sede';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-tipo-sede',
  templateUrl: './filtro-tipo-sede.component.html',
  styleUrls: ['./filtro-tipo-sede.component.scss'],
})
export class FiltroTipoSedeComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ tipoSede: 0 });
  }

  buscarTipoSede() {
    let dialog = this._dialog.open(BuscadorTipoSedeComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.tipoSede),
        tap((tipoSede: TipoSede) =>
          this.formulario.patchValue({ tipoSede: tipoSede.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
