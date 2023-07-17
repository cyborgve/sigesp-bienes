import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Incorporacion } from '@core/models/procesos/incorporacion';

@Component({
  selector: 'app-buscador-incorporacion',
  templateUrl: './buscador-incorporacion.component.html',
  styleUrls: ['./buscador-incorporacion.component.scss'],
})
export class BuscadorIncorporacionComponent {
  titulo = 'buscador de incorporaciones';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.INCORPORACIONES.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorIncorporacionComponent>
  ) {}

  seleccionar = (entidad: Incorporacion) => {
    this._dialogRef.close(entidad);
  };
}
