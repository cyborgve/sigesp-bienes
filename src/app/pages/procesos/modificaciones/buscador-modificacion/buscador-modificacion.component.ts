import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Modificacion } from '@core/models/procesos/modificacion';

@Component({
  selector: 'app-buscador-modificacion',
  templateUrl: './buscador-modificacion.component.html',
  styleUrls: ['./buscador-modificacion.component.scss'],
})
export class BuscadorModificacionComponent {
  titulo = 'buscador de modificaciones';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.MODIFICACIONES.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorModificacionComponent>
  ) {}

  seleccionar = (entidad: Modificacion) => {
    this._dialogRef.close(entidad);
  };
}
