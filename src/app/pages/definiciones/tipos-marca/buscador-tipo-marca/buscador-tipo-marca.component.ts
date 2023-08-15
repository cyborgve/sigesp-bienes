import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TipoMarca } from '@core/models/definiciones/tipo-marca';

@Component({
  selector: 'app-buscador-tipo-marca',
  templateUrl: './buscador-tipo-marca.component.html',
  styleUrls: ['./buscador-tipo-marca.component.scss'],
})
export class BuscadorTipoMarcaComponent {
  titulo = 'buscador de tipos de marca';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_MARCA.filter(
    c => c !== 'acciones'
  );
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorTipoMarcaComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: TipoMarca) => {
    this._dialogRef.close(entidad);
  };
}
