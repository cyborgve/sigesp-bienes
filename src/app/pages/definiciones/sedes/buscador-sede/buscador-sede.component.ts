import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Sede } from '@core/models/definiciones/sede';

@Component({
  selector: 'app-buscador-sede',
  templateUrl: './buscador-sede.component.html',
  styleUrls: ['./buscador-sede.component.scss'],
})
export class BuscadorSedeComponent {
  titulo = 'buscador de sedes';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.SEDES.filter(c => c !== 'acciones');
  constructor(private _dialogRef: MatDialogRef<BuscadorSedeComponent>) {}

  seleccionar = (entidad: Sede) => {
    this._dialogRef.close(entidad);
  };
}
