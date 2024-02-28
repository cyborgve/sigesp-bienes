import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { BuscadorTipoPolizaComponent } from '@pages/definiciones/tipos-poliza/buscador-tipo-poliza/buscador-tipo-poliza.component';
import { TipoPoliza } from '@core/models/definiciones/tipo-poliza';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-tipo-poliza',
  templateUrl: './filtro-tipo-poliza.component.html',
  styleUrls: ['./filtro-tipo-poliza.component.scss'],
})
export class FiltroTipoPolizaComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ tipoPoliza: 0 });
  }

  buscarTipoPoliza() {
    let dialog = this._dialog.open(BuscadorTipoPolizaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.tipoPoliza),
        tap((tipoPoliza: TipoPoliza) =>
          this.formulario.patchValue({ tipoPoliza: tipoPoliza.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
