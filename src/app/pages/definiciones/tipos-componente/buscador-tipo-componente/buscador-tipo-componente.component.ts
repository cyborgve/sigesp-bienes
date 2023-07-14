import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  constructor(
    private _dialogRef: MatDialogRef<BuscadorTipoComponenteComponent>
  ) {}

  seleccionar = (entidad: TipoComponente) => {
    this._dialogRef.close(entidad);
  };
}
