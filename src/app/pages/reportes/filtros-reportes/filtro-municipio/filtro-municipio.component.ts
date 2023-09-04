import { tap, take } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorMunicipioComponent } from '@shared/components/buscador-municipio/buscador-municipio.component';
import { Municipio } from '@core/models/otros-modulos/municipio';

@Component({
  selector: 'app-filtro-municipio',
  templateUrl: './filtro-municipio.component.html',
  styleUrls: ['./filtro-municipio.component.scss'],
})
export class FiltroMunicipioComponent {
  @Input() municipio = new FormControl(['---']);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarMunicipio() {
    let dialog = this._dialog.open(BuscadorMunicipioComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((municipio: Municipio) =>
          municipio ? this.municipio.patchValue(municipio.id) : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
