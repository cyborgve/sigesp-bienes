import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Modelo } from '@core/models/definiciones/modelo';
import { BuscadorModeloComponent } from '@pages/definiciones/modelos/buscador-modelo/buscador-modelo.component';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-modelo',
  templateUrl: './filtro-modelo.component.html',
  styleUrls: ['./filtro-modelo.component.scss'],
})
export class FiltroModeloComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ modelo: 0 });
  }

  buscarModelo() {
    let dialog = this._dialog.open(BuscadorModeloComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.modelo),
        tap((modelo: Modelo) =>
          this.formulario.patchValue({ modelo: modelo.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
