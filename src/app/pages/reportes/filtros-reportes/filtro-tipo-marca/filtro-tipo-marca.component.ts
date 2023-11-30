import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorTipoMarcaComponent } from '@pages/definiciones/tipos-marca/buscador-tipo-marca/buscador-tipo-marca.component';
import { TipoMarca } from '@core/models/definiciones/tipo-marca';

@Component({
  selector: 'app-filtro-tipo-marca',
  templateUrl: './filtro-tipo-marca.component.html',
  styleUrls: ['./filtro-tipo-marca.component.scss'],
})
export class FiltroTipoMarcaComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ tipoMarca: 0 });
  }

  buscarTipoMarca() {
    let dialog = this._dialog.open(BuscadorTipoMarcaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((tipoMarca: TipoMarca) =>
          this.formulario.patchValue({ tipoMarca: tipoMarca.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
