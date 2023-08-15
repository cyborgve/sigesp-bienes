import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Modelo } from '@core/models/definiciones/modelo';

@Component({
  selector: 'app-buscador-modelo',
  templateUrl: './buscador-modelo.component.html',
  styleUrls: ['./buscador-modelo.component.scss'],
})
export class BuscadorModeloComponent {
  titulo = 'buscador de modelos';
  columnasVisibles = COLUMNAS_VISIBLES.MODELOS.filter(c => c !== 'acciones');
  ocultarNuevo = true;
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorModeloComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (modelo: Modelo) => {
    this._dialogRef.close(modelo);
  };
}
