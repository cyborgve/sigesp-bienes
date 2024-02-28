import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';

@Component({
  selector: 'app-buscador-autorizacion-salida',
  templateUrl: './buscador-autorizacion-salida.component.html',
  styleUrls: ['./buscador-autorizacion-salida.component.scss'],
})
export class BuscadorAutorizacionSalidaComponent {
  titulo = 'buscador de autorizaciones de salida';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.AUTORIZACIONES_SALIDA.filter(
    c => c !== 'acciones-proceso'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorAutorizacionSalidaComponent>
  ) {}

  seleccionar = (entidad: AutorizacionSalida) => {
    this._dialogRef.close(entidad);
  };
}
