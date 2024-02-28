import { Component, Inject } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Rotulacion } from '@core/models/definiciones/rotulacion';

@Component({
  selector: 'app-buscador-rotulacion',
  templateUrl: './buscador-rotulacion.component.html',
  styleUrls: ['./buscador-rotulacion.component.scss'],
})
export class BuscadorRotulacionComponent {
  titulo = 'buscador de rotulaciones';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ROTULACIONES.filter(
    c => c !== 'acciones'
  );
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorRotulacionComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: Rotulacion) => {
    this._dialogRef.close(entidad);
  };
}
