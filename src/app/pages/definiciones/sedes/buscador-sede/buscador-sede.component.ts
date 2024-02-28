import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Sede } from '@core/models/definiciones/sede';

@Component({
  selector: 'app-buscador-sede',
  templateUrl: './buscador-sede.component.html',
  styleUrls: ['./buscador-sede.component.scss'],
})
export class BuscadorSedeComponent {
  titulo = 'buscador de sedes';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.SEDES.filter(c => c !== 'acciones');
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorSedeComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: Sede) => {
    this._dialogRef.close(entidad);
  };
}
