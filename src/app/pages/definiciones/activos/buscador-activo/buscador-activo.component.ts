import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Activo } from '@core/models/definiciones/activo';

@Component({
  selector: 'app-buscador-activo',
  templateUrl: './buscador-activo.component.html',
  styleUrls: ['./buscador-activo.component.scss'],
})
export class BuscadorActivoComponent {
  filtros: any[] = [];
  titulo = 'buscador de bienes';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ACTIVOS.filter(c => c !== 'acciones');
  constructor(
    private _dialogRef: MatDialogRef<BuscadorActivoComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: Activo) => {
    this._dialogRef.close(entidad);
  };
}
