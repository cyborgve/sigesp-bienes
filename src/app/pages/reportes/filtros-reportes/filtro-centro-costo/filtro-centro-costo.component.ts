import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CentroCostos } from '@core/models/otros-modulos/centro-costos';
import { BuscadorCentroCostoComponent } from '@shared/components/buscador-centro-costo/buscador-centro-costo.component';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-centro-costo',
  templateUrl: './filtro-centro-costo.component.html',
  styleUrls: ['./filtro-centro-costo.component.scss'],
})
export class FiltroCentroCostoComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ centroCostos: 'Todos' });
  }

  buscarCentroCostos() {
    let dialog = this._dialog.open(BuscadorCentroCostoComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.centroCostos),
        tap((centroCostos: CentroCostos) =>
          this.formulario.patchValue({ centroCostos: centroCostos.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
