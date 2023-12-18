import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorOrigenComponent } from '@pages/definiciones/origenes/buscador-origen/buscador-origen.component';
import { Origen } from '@core/models/definiciones/origen';

@Component({
  selector: 'app-filtro-origen',
  templateUrl: './filtro-origen.component.html',
  styleUrls: ['./filtro-origen.component.scss'],
})
export class FiltroOrigenComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ origen: 0 });
  }

  buscarOrigen() {
    let dialog = this._dialog.open(BuscadorOrigenComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((origen: Origen) =>
          this.formulario.patchValue({ origen: origen.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
