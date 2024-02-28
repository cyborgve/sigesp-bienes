import { Component, Inject } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TipoAnimal } from '@core/models/definiciones/tipo-animal';

@Component({
  selector: 'app-buscador-tipo-animal',
  templateUrl: './buscador-tipo-animal.component.html',
  styleUrls: ['./buscador-tipo-animal.component.scss'],
})
export class BuscadorTipoAnimalComponent {
  titulo = 'buscador de tipos de animal';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_ANIMAL.filter(
    c => c !== 'acciones'
  );
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorTipoAnimalComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: TipoAnimal) => {
    this._dialogRef.close(entidad);
  };
}
