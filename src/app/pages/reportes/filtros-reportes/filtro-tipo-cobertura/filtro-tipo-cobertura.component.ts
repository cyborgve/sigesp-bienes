import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { BuscadorTipoCoberturaComponent } from '@pages/definiciones/tipos-cobertura/buscador-tipo-cobertura/buscador-tipo-cobertura.component';
import { TipoCobertura } from '@core/models/definiciones/tipo-cobertura';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-tipo-cobertura',
  templateUrl: './filtro-tipo-cobertura.component.html',
  styleUrls: ['./filtro-tipo-cobertura.component.scss'],
})
export class FiltroTipoCoberturaComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ tipoCobertura: 0 });
  }

  buscarTipoCobertura() {
    let dialog = this._dialog.open(BuscadorTipoCoberturaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.tipoCobertura),
        tap((tipoCobertura: TipoCobertura) =>
          this.formulario.patchValue({ tipoCorbertura: tipoCobertura.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
