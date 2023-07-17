import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CambioResponsable } from '@core/models/procesos/cambio-responsable';

@Component({
  selector: 'app-buscador-cambio-responsable',
  templateUrl: './buscador-cambio-responsable.component.html',
  styleUrls: ['./buscador-cambio-responsable.component.scss'],
})
export class BuscadorCambioResponsableComponent {
  titulo = 'buscador de cambios de responsable';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.CAMBIOS_RESPONSABLE.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorCambioResponsableComponent>
  ) {}

  seleccionar = (entidad: CambioResponsable) => {
    this._dialogRef.close(entidad);
  };
}
