import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Marca } from '@core/models/definiciones/marca';

@Component({
  selector: 'app-buscador-marca',
  templateUrl: './buscador-marca.component.html',
  styleUrls: ['./buscador-marca.component.scss'],
})
export class BuscadorMarcaComponent {
  titulo = 'buscador de marcas';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.MARCAS.filter(c => c !== 'acciones');
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorMarcaComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (marca: Marca) => {
    this._dialogRef.close(marca);
  };
}
