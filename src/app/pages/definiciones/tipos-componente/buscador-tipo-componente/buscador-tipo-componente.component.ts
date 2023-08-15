import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TipoComponente } from '@core/models/definiciones/tipo-componente';

@Component({
  selector: 'app-buscador-tipo-componente',
  templateUrl: './buscador-tipo-componente.component.html',
  styleUrls: ['./buscador-tipo-componente.component.scss'],
})
export class BuscadorTipoComponenteComponent {
  titulo = 'buscador de tipos de componente';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_COMPONENTE.filter(
    c => c !== 'acciones'
  );
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorTipoComponenteComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: TipoComponente) => {
    this._dialogRef.close(entidad);
  };
}
