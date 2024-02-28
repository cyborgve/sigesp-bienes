import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';

@Component({
  selector: 'app-buscador-entrega-unidad',
  templateUrl: './buscador-entrega-unidad.component.html',
  styleUrls: ['./buscador-entrega-unidad.component.scss'],
})
export class BuscadorEntregaUnidadComponent {
  titulo = 'buscador de entregas de unidad';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ENTREGA_UNIDAD.filter(
    c => c !== 'acciones-proceso'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorEntregaUnidadComponent>
  ) {}

  seleccionar = (entidad: EntregaUnidad) => {
    this._dialogRef.close(entidad);
  };
}
