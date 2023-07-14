import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TipoSede } from '@core/models/definiciones/tipo-sede';

@Component({
  selector: 'app-buscador-tipo-sede',
  templateUrl: './buscador-tipo-sede.component.html',
  styleUrls: ['./buscador-tipo-sede.component.scss'],
})
export class BuscadorTipoSedeComponent {
  titulo = 'buscador de tipos de sede';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_SEDE.filter(c => c !== 'acciones');
  constructor(private _dialogRef: MatDialogRef<BuscadorTipoSedeComponent>) {}

  seleccionar = (entidad: TipoSede) => {
    this._dialogRef.close(entidad);
  };
}
