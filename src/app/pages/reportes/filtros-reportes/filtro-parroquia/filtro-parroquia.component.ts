import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorParroquiaComponent } from '@shared/components/buscador-parroquia/buscador-parroquia.component';
import { Parroquia } from '@core/models/otros-modulos/parroquia';

@Component({
  selector: 'app-filtro-parroquia',
  templateUrl: './filtro-parroquia.component.html',
  styleUrls: ['./filtro-parroquia.component.scss'],
})
export class FiltroParroquiaComponent {
  @Input() parroquia = new FormControl(['---']);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarParroquia() {
    let dialog = this._dialog.open(BuscadorParroquiaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((parroquia: Parroquia) => this.parroquia.patchValue(parroquia.id)),
        take(1)
      )
      .subscribe();
  }
}
