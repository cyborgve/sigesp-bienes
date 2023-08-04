import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';

@Component({
  selector: 'app-buscador-componente',
  templateUrl: './buscador-componente.component.html',
  styleUrls: ['./buscador-componente.component.scss'],
})
export class BuscadorComponenteComponent {
  titulo = 'buscador de componentes de activos';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.COMPONENTES.filter(
    c => c !== 'acciones'
  );
  constructor(private _dialogRef: MatDialogRef<BuscadorComponenteComponent>) {}

  seleccionar = (entidad: ActivoComponente) => {
    this._dialogRef.close(entidad);
  };
}
