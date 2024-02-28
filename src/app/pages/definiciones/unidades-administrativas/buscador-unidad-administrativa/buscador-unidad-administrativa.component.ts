import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';

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
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorUnidadAdministrativaComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: UnidadAdministrativa) => {
    this._dialogRef.close(entidad);
  };
}
