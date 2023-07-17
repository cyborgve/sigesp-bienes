import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Depreciacion } from '@core/models/procesos/depreciacion';

@Component({
  selector: 'app-buscador-depreciacion',
  templateUrl: './buscador-depreciacion.component.html',
  styleUrls: ['./buscador-depreciacion.component.scss'],
})
export class BuscadorDepreciacionComponent {
  titulo = 'buscador de depreciaciones';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.DEPRECIACIONES.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorDepreciacionComponent>
  ) {}

  seleccionar = (entidad: Depreciacion) => {
    this._dialogRef.close(entidad);
  };
}
