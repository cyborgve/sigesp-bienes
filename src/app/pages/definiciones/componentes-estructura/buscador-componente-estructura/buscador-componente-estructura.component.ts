import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { ComponenteEstructura } from '@core/models/componente-estructura';

@Component({
  selector: 'app-buscador-componente-estructura',
  templateUrl: './buscador-componente-estructura.component.html',
  styleUrls: ['./buscador-componente-estructura.component.scss'],
})
export class BuscadorComponenteEstructuraComponent {
  titulo = 'buscador de componentes de estructura';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.COMPONENTES_ESTRUCTURA.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorComponenteEstructuraComponent>
  ) {}

  seleccionar = (componenteEstructura: ComponenteEstructura) => {
    this._dialogRef.close(componenteEstructura);
  };
}
