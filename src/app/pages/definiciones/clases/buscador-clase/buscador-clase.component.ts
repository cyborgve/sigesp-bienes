import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  constructor(private _dialogRef: MatDialogRef<BuscadorClaseComponent>) {}

  seleccionar = (clase: Clase) => {
    this._dialogRef.close(clase);
  };
}
