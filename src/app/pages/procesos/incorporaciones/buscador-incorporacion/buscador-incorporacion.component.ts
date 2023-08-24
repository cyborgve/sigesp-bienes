import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Incorporacion } from '@core/models/procesos/incorporacion';

@Component({
  selector: 'app-buscador-incorporacion',
  templateUrl: './buscador-incorporacion.component.html',
  styleUrls: ['./buscador-incorporacion.component.scss'],
})
export class BuscadorIncorporacionComponent {
  titulo = 'buscador de incorporaciones';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.INCORPORACIONES.filter(
    c => c !== 'acciones'
  );
  filtros: any[] = [];
  constructor(
    private _dialogRef: MatDialogRef<BuscadorIncorporacionComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: Incorporacion) => {
    this._dialogRef.close(entidad);
  };
}
