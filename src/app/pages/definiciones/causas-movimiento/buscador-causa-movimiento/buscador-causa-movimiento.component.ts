import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CausaMovimiento } from '@core/models/causa-movimiento';

@Component({
  selector: 'app-buscador-causa-movimiento',
  templateUrl: './buscador-causa-movimiento.component.html',
  styleUrls: ['./buscador-causa-movimiento.component.scss'],
})
export class BuscadorCausaMovimientoComponent {
  titulo = 'buscador de causas de movimiento';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.CAUSAS_MOVIMIENTO.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorCausaMovimientoComponent>
  ) {}

  seleccionar = (causaMovimiento: CausaMovimiento) => {
    this._dialogRef.close(causaMovimiento);
  };
}
