import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorTipoAnimalComponent } from '@pages/definiciones/tipos-animal/buscador-tipo-animal/buscador-tipo-animal.component';
import { TipoAnimal } from '@core/models/definiciones/tipo-animal';

@Component({
  selector: 'app-filtro-tipo-animal',
  templateUrl: './filtro-tipo-animal.component.html',
  styleUrls: ['./filtro-tipo-animal.component.scss'],
})
export class FiltroTipoAnimalComponent {
  @Input() tipoAnimal = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarTipoAnimal() {
    let dialog = this._dialog.open(BuscadorTipoAnimalComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((tipoAnimal: TipoAnimal) =>
          this.tipoAnimal.patchValue(tipoAnimal.id)
        ),
        take(1)
      )
      .subscribe();
  }
}
