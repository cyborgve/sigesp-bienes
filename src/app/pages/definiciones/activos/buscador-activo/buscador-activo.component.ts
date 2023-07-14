import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Activo } from '@core/models/definiciones/activo';

@Component({
  selector: 'app-buscador-activo',
  templateUrl: './buscador-activo.component.html',
  styleUrls: ['./buscador-activo.component.scss'],
})
export class BuscadorActivoComponent {
  titulo = 'buscador de activos';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ACTIVOS.filter(c => c !== 'acciones');
  constructor(private _dialogRef: MatDialogRef<BuscadorActivoComponent>) {}

  seleccionar = (entidad: Activo) => {
    this._dialogRef.close(entidad);
  };
}
