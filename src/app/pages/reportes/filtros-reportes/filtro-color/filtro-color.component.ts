import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Color } from '@core/models/definiciones/color';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';
import { BuscadorColorComponent } from '@pages/definiciones/colores/buscador-color/buscador-color.component';
import { take, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-filtro-color',
  templateUrl: './filtro-color.component.html',
  styleUrls: ['./filtro-color.component.scss'],
})
export class FiltroColorComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ color: 0 });
  }

  buscarColor() {
    let dialog = this._dialog.open(BuscadorColorComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.color),
        tap((color: Color) => this.formulario.patchValue({ color: color.id })),
        take(1)
      )
      .subscribe();
  }
}
