import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorTipoSedeComponent } from '@pages/definiciones/tipos-sede/buscador-tipo-sede/buscador-tipo-sede.component';
import { TipoSede } from '@core/models/definiciones/tipo-sede';

@Component({
  selector: 'app-filtro-tipo-sede',
  templateUrl: './filtro-tipo-sede.component.html',
  styleUrls: ['./filtro-tipo-sede.component.scss'],
})
export class FiltroTipoSedeComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ tipoSede: 0 });
  }

  buscarTipoSede() {
    let dialog = this._dialog.open(BuscadorTipoSedeComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((tipoSede: TipoSede) =>
          this.formulario.patchValue({ tipoSede: tipoSede.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
