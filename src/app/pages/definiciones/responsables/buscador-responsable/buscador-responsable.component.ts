import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Responsable } from '@core/models/responsable';

@Component({
  selector: 'app-buscador-responsable',
  templateUrl: './buscador-responsable.component.html',
  styleUrls: ['./buscador-responsable.component.scss'],
})
export class BuscadorResponsableComponent {
  titulo = 'buscador de responsables';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.RESPONSABLES.filter(c => c !== 'tipo')
    .filter(c => c !== 'direccion')
    .filter(c => c !== 'telefonos')
    .filter(c => c !== 'acciones');
  constructor(private _dialogRef: MatDialogRef<BuscadorResponsableComponent>) {}

  seleccionar = (entidad: Responsable) => {
    this._dialogRef.close(entidad);
  };
}
