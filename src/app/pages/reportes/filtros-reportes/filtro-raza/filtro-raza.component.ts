import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Raza } from '@core/models/definiciones/raza';
import { BuscadorRazaComponent } from '@pages/definiciones/razas/buscador-raza/buscador-raza.component';

@Component({
  selector: 'app-filtro-raza',
  templateUrl: './filtro-raza.component.html',
  styleUrls: ['./filtro-raza.component.scss'],
})
export class FiltroRazaComponent {
  @Input() raza = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarRaza() {
    let dialog = this._dialog.open(BuscadorRazaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((raza: Raza) => this.raza.patchValue(raza.id)),
        take(1)
      )
      .subscribe();
  }
}
