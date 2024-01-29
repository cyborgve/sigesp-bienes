import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorMarcaComponent } from '@pages/definiciones/marcas/buscador-marca/buscador-marca.component';
import { Marca } from '@core/models/definiciones/marca';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-marca',
  templateUrl: './filtro-marca.component.html',
  styleUrls: ['./filtro-marca.component.scss'],
})
export class FiltroMarcaComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ marca: 0 });
  }

  buscarMarca() {
    let dialog = this._dialog.open(BuscadorMarcaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.marca),
        tap((marca: Marca) => this.formulario.patchValue({ marca: marca.id })),
        take(1)
      )
      .subscribe();
  }
}
