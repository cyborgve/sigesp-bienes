import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TipoUso } from '@core/models/definiciones/tipo-uso';

@Component({
  selector: 'app-buscador-tipo-uso',
  templateUrl: './buscador-tipo-uso.component.html',
  styleUrls: ['./buscador-tipo-uso.component.scss'],
})
export class BuscadorTipoUsoComponent {
  titulo = 'buscador de tipos de uso';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_USO.filter(c => c !== 'acciones');
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorTipoUsoComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: TipoUso) => {
    this._dialogRef.close(entidad);
  };
}
