import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';

@Component({
  selector: 'app-buscador-componente',
  templateUrl: './buscador-componente.component.html',
  styleUrls: ['./buscador-componente.component.scss'],
})
export class BuscadorComponenteComponent {
  titulo = 'buscador de componentes de bienes';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.COMPONENTES.filter(
    c => c !== 'acciones'
  );
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorComponenteComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: ActivoComponente) => {
    this._dialogRef.close(entidad);
  };
}
