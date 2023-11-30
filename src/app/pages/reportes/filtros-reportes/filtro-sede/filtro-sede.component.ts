import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorSedeComponent } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.component';
import { Sede } from '@core/models/definiciones/sede';

@Component({
  selector: 'app-filtro-sede',
  templateUrl: './filtro-sede.component.html',
  styleUrls: ['./filtro-sede.component.scss'],
})
export class FiltroSedeComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ sede: 0 });
  }

  buscarSede() {
    let dialog = this._dialog.open(BuscadorSedeComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((sede: Sede) => this.formulario.patchValue({ sede: sede.id })),
        take(1)
      )
      .subscribe();
  }
}
