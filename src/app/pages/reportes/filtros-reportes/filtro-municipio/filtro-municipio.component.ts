import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorMunicipioComponent } from '@shared/components/buscador-municipio/buscador-municipio.component';
import { Municipio } from '@core/models/otros-modulos/municipio';

@Component({
  selector: 'app-filtro-municipio',
  templateUrl: './filtro-municipio.component.html',
  styleUrls: ['./filtro-municipio.component.scss'],
})
export class FiltroMunicipioComponent {
  @Input() formulario: FormGroup;
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
        filter(todo => !!todo),
        tap((municipio: Municipio) =>
          this.formulario.patchValue({ municipio: municipio.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
