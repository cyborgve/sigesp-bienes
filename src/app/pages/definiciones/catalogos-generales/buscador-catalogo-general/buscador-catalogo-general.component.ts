import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  constructor(
    private _dialogRef: MatDialogRef<BuscadorCatalogoGeneralComponent>
  ) {}

  seleccionar = (entidad: CatalogoGeneral) => {
    this._dialogRef.close(entidad);
  };
}
