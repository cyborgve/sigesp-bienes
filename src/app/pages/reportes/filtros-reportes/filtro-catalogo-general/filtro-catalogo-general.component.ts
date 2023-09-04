import { BuscadorCatalogoGeneralComponent } from '@pages/definiciones/catalogos-generales/buscador-catalogo-general/buscador-catalogo-general.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap, take, map } from 'rxjs/operators';
import { CatalogoGeneral } from '@core/models/definiciones/catalogo-general';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-filtro-catalogo-general',
  templateUrl: './filtro-catalogo-general.component.html',
  styleUrls: ['./filtro-catalogo-general.component.scss'],
})
export class FiltroCatalogoGeneralComponent {
  @Input() catalogoGeneral = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarCatalogoGeneral() {
    let filtroSumatorias = () =>
      pipe(
        map((catalogos: CatalogoGeneral[]) =>
          catalogos.filter(catalogo => catalogo.estadoMovimiento === 'Sum')
        )
      );
    let dialog = this._dialog.open(BuscadorCatalogoGeneralComponent, {
      width: '85%',
      height: '95%',
      data: { filtros: [filtroSumatorias()] },
    });
    dialog
      .afterClosed()
      .pipe(
        tap((catalogoGeneral: CatalogoGeneral) =>
          catalogoGeneral
            ? this.catalogoGeneral.patchValue(catalogoGeneral.id)
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
