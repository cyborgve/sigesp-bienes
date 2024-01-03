import { BuscadorCatalogoGeneralComponent } from '@pages/definiciones/catalogos-generales/buscador-catalogo-general/buscador-catalogo-general.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap, take, map, filter } from 'rxjs/operators';
import { CatalogoGeneral } from '@core/models/definiciones/catalogo-general';
import { pipe } from 'rxjs';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-catalogo-general',
  templateUrl: './filtro-catalogo-general.component.html',
  styleUrls: ['./filtro-catalogo-general.component.scss'],
})
export class FiltroCatalogoGeneralComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ catalogoGeneral: 0 });
  }

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
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.catalogoGeneral),
        tap((catalogoGeneral: CatalogoGeneral) =>
          this.formulario.patchValue({ catalogoGeneral: catalogoGeneral.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
