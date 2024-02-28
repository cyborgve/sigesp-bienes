import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Aseguradora } from '@core/models/definiciones/aseguradora';

@Component({
  selector: 'app-buscador-aseguradora',
  templateUrl: './buscador-aseguradora.component.html',
  styleUrls: ['./buscador-aseguradora.component.scss'],
})
export class BuscadorAseguradoraComponent {
  titulo = 'buscador de aseguradoras';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ASEGURADORAS.filter(
    c => c !== 'acciones'
  );
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorAseguradoraComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: Aseguradora) => {
    this._dialogRef.close(entidad);
  };
}
