import { Component, Inject } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Origen } from '@core/models/definiciones/origen';

@Component({
  selector: 'app-buscador-origen',
  templateUrl: './buscador-origen.component.html',
  styleUrls: ['./buscador-origen.component.scss'],
})
export class BuscadorOrigenComponent {
  titulo = 'buscador de orígenes';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ORIGENES.filter(c => c !== 'acciones');
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorOrigenComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (origen: Origen) => {
    this._dialogRef.close(origen);
  };
}
