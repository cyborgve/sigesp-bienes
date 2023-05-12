import { COLUMNAS_VISIBLES } from './../../../../core/constants/columnas-visibles';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivoComponente } from '@core/models/activo-componente';

@Component({
  selector: 'app-buscador-activo-componente',
  templateUrl: './buscador-activo-componente.component.html',
  styleUrls: ['./buscador-activo-componente.component.scss'],
})
export class BuscadorActivoComponenteComponent {
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ACTIVO_COMPONENTES.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorActivoComponenteComponent>
  ) {}

  seleccionar = (activoComponente: ActivoComponente) => {
    this._dialogRef.close(activoComponente);
  };
}
