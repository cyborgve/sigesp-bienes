import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TipoPoliza } from '@core/models/definiciones/tipo-poliza';

@Component({
  selector: 'app-buscador-tipo-poliza',
  templateUrl: './buscador-tipo-poliza.component.html',
  styleUrls: ['./buscador-tipo-poliza.component.scss'],
})
export class BuscadorTipoPolizaComponent {
  titulo = 'buscador de tipos de poliza';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_POLIZA.filter(
    c => c !== 'acciones'
  );
  constructor(private _dialogRef: MatDialogRef<BuscadorTipoPolizaComponent>) {}

  seleccionar = (entidad: TipoPoliza) => {
    this._dialogRef.close(entidad);
  };
}
