import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CatalogoGeneral } from '@core/models/definiciones/catalogo-general';

@Component({
  selector: 'app-buscador-catalogo-general',
  templateUrl: './buscador-catalogo-general.component.html',
  styleUrls: ['./buscador-catalogo-general.component.scss'],
})
export class BuscadorCatalogoGeneralComponent {
  titulo = 'buscador de catálogos generales';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.CATALOGO_GENERAL.filter(
    c => c !== 'acciones'
  );
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorCatalogoGeneralComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: CatalogoGeneral) => {
    this._dialogRef.close(entidad);
  };
}
