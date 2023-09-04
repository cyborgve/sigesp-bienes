import { tap, take } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Estado } from '@core/models/otros-modulos/estado';
import { BuscadorEstadoComponent } from '@shared/components/buscador-estado/buscador-estado.component';

@Component({
  selector: 'app-filtro-estado',
  templateUrl: './filtro-estado.component.html',
  styleUrls: ['./filtro-estado.component.scss'],
})
export class FiltroEstadoComponent {
  @Input() estado = new FormControl(['---']);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarEstado() {
    let dialog = this._dialog.open(BuscadorEstadoComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((estado: Estado) =>
          estado ? this.estado.patchValue(estado.id) : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
