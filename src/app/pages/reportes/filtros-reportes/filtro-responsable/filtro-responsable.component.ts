import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Responsable } from '@core/models/otros-modulos/responsable';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';

@Component({
  selector: 'app-filtro-responsable',
  templateUrl: './filtro-responsable.component.html',
  styleUrls: ['./filtro-responsable.component.scss'],
})
export class FiltroResponsableComponent {
  @Input() responsable = new FormControl(['---']);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarResponsable() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((responsable: Responsable) =>
          this.responsable.patchValue(responsable.id)
        ),
        take(1)
      )
      .subscribe();
  }
}
