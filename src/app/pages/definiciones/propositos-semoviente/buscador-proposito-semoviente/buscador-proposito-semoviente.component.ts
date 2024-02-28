import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { PropositoSemoviente } from '@core/models/definiciones/proposito-semoviente';

@Component({
  selector: 'app-buscador-proposito-semoviente',
  templateUrl: './buscador-proposito-semoviente.component.html',
  styleUrls: ['./buscador-proposito-semoviente.component.scss'],
})
export class BuscadorPropositoSemovienteComponent {
  titulo = 'buscador de propósitos de semoviente';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.PROPOSITOS_SEMOVIENTE.filter(
    c => c !== 'acciones'
  );
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorPropositoSemovienteComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: PropositoSemoviente) => {
    this._dialogRef.close(entidad);
  };
}
