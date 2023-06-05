import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TipoEstructura } from '@core/models/tipo-estructura';

@Component({
  selector: 'app-buscador-tipo-estructura',
  templateUrl: './buscador-tipo-estructura.component.html',
  styleUrls: ['./buscador-tipo-estructura.component.scss'],
})
export class BuscadorTipoEstructuraComponent {
  titulo = 'buscador de tipos de estructura';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_ESTRUCTURA.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorTipoEstructuraComponent>
  ) {}

  seleccionar = (entidad: TipoEstructura) => {
    this._dialogRef.close(entidad);
  };
}
