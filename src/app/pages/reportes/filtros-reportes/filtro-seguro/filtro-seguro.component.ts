import { tap, take } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorSeguroComponent } from '@pages/definiciones/seguros/buscador-seguro/buscador-seguro.component';
import { Seguro } from '@core/models/definiciones/seguro';

@Component({
  selector: 'app-filtro-seguro',
  templateUrl: './filtro-seguro.component.html',
  styleUrls: ['./filtro-seguro.component.scss'],
})
export class FiltroSeguroComponent {
  @Input() seguro = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarSeguro() {
    let dialog = this._dialog.open(BuscadorSeguroComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((seguro: Seguro) =>
          seguro ? this.seguro.patchValue(seguro.id) : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
