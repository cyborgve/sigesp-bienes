import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Seguro } from '@core/models/seguro';

@Component({
  selector: 'app-buscador-seguro',
  templateUrl: './buscador-seguro.component.html',
  styleUrls: ['./buscador-seguro.component.scss'],
})
export class BuscadorSeguroComponent {
  titulo = 'buscador de seguros';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.SEGUROS.filter(c => c !== 'acciones');
  constructor(private _dialogRef: MatDialogRef<BuscadorSeguroComponent>) {}

  seleccionar = (entidad: Seguro) => {
    this._dialogRef.close(entidad);
  };
}
