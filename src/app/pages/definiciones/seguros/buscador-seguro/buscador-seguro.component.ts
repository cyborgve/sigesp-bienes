import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Component, Inject } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { Seguro } from '@core/models/definiciones/seguro';

@Component({
  selector: 'app-buscador-seguro',
  templateUrl: './buscador-seguro.component.html',
  styleUrls: ['./buscador-seguro.component.scss'],
})
export class BuscadorSeguroComponent {
  titulo = 'buscador de seguros';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.SEGUROS.filter(c => c !== 'acciones');
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorSeguroComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: Seguro) => {
    this._dialogRef.close(entidad);
  };
}
