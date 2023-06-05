import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { UnidadAdministrativa } from '@core/models/unidad-administrativa';

@Component({
  selector: 'app-buscador-unidad-administrativa',
  templateUrl: './buscador-unidad-administrativa.component.html',
  styleUrls: ['./buscador-unidad-administrativa.component.scss'],
})
export class BuscadorUnidadAdministrativaComponent {
  titulo = 'buscador de unidades administrativas';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.UNIDADES_ADMINISTRATIVAS.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorUnidadAdministrativaComponent>
  ) {}

  seleccionar = (entidad: UnidadAdministrativa) => {
    this._dialogRef.close(entidad);
  };
}
