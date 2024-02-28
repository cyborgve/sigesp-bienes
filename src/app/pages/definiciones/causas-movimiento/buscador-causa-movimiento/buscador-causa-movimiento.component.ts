import { Component, Inject } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CausaMovimiento } from '@core/models/definiciones/causa-movimiento';

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
  filtros: any[] = [];
  constructor(
    private _dialogRef: MatDialogRef<BuscadorCausaMovimientoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (causaMovimiento: CausaMovimiento) => {
    this._dialogRef.close(causaMovimiento);
  };
}
