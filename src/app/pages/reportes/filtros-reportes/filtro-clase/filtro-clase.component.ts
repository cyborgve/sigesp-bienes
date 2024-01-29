import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Clase } from '@core/models/definiciones/clase';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';
import { BuscadorClaseComponent } from '@pages/definiciones/clases/buscador-clase/buscador-clase.component';
import { take, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-filtro-clase',
  templateUrl: './filtro-clase.component.html',
  styleUrls: ['./filtro-clase.component.scss'],
})
export class FiltroClaseComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ clase: 0 });
  }

  buscarClase() {
    let dialog = this._dialog.open(BuscadorClaseComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.clase),
        tap((clase: Clase) => this.formulario.patchValue({ clase: clase.id })),
        take(1)
      )
      .subscribe();
  }
}
