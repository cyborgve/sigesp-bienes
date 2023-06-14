import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { MCuentaInstitucional } from 'sigesp';

@Component({
  selector: 'app-buscador-cuenta-contable',
  templateUrl: './buscador-cuenta-contable.component.html',
  styleUrls: ['./buscador-cuenta-contable.component.scss'],
})
export class BuscadorCuentaContableComponent {
  titulo = 'buscador de cuentas contables';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.CUENTAS_CONTABLES;

  constructor(
    private _dialogRef: MatDialogRef<BuscadorCuentaContableComponent>
  ) {}

  seleccionar = (entidad: MCuentaInstitucional) => {
    this._dialogRef.close(entidad);
  };
}
