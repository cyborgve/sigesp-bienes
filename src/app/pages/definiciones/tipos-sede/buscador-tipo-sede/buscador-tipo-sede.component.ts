import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
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
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorTipoSedeComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: TipoSede) => {
    this._dialogRef.close(entidad);
  };
}
