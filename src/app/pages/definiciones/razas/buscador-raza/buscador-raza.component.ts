import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Raza } from '@core/models/definiciones/raza';

@Component({
  selector: 'app-buscador-raza',
  templateUrl: './buscador-raza.component.html',
  styleUrls: ['./buscador-raza.component.scss'],
})
export class BuscadorRazaComponent {
  titulo = 'buscador de razas';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.RAZAS.filter(c => c !== 'acciones');
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorRazaComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: Raza) => {
    this._dialogRef.close(entidad);
  };
}
