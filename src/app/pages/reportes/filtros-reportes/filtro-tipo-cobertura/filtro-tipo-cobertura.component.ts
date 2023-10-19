import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorTipoCoberturaComponent } from '@pages/definiciones/tipos-cobertura/buscador-tipo-cobertura/buscador-tipo-cobertura.component';
import { TipoCobertura } from '@core/models/definiciones/tipo-cobertura';

@Component({
  selector: 'app-filtro-tipo-cobertura',
  templateUrl: './filtro-tipo-cobertura.component.html',
  styleUrls: ['./filtro-tipo-cobertura.component.scss'],
})
export class FiltroTipoCoberturaComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarTipoCobertura() {
    let dialog = this._dialog.open(BuscadorTipoCoberturaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((tipoCobertura: TipoCobertura) =>
          this.formulario.patchValue({ tipoCorbertura: tipoCobertura.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
