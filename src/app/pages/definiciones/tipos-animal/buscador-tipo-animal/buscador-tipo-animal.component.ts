import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  constructor(private _dialogRef: MatDialogRef<BuscadorTipoAnimalComponent>) {}

  seleccionar = (entidad: TipoAnimal) => {
    this._dialogRef.close(entidad);
  };
}
