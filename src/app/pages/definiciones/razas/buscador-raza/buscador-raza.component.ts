import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Raza } from '@core/models/raza';

@Component({
  selector: 'app-buscador-raza',
  templateUrl: './buscador-raza.component.html',
  styleUrls: ['./buscador-raza.component.scss'],
})
export class BuscadorRazaComponent {
  titulo = 'buscador de razas';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.RAZAS.filter(c => c !== 'acciones');
  constructor(private _dialogRef: MatDialogRef<BuscadorRazaComponent>) {}

  seleccionar = (entidad: Raza) => {
    this._dialogRef.close(entidad);
  };
}
