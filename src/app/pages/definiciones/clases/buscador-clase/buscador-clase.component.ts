import { Component, Inject } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Clase } from '@core/models/definiciones/clase';

@Component({
  selector: 'app-buscador-clase',
  templateUrl: './buscador-clase.component.html',
  styleUrls: ['./buscador-clase.component.scss'],
})
export class BuscadorClaseComponent {
  titulo = 'buscador de clases';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.CLASES.filter(c => c !== 'acciones');
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorClaseComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (clase: Clase) => {
    this._dialogRef.close(clase);
  };
}
