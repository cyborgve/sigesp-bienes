import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CondicionCompra } from '@core/models/condicion-compra';

@Component({
  selector: 'app-buscador-condicion-compra',
  templateUrl: './buscador-condicion-compra.component.html',
  styleUrls: ['./buscador-condicion-compra.component.scss'],
})
export class BuscadorCondicionCompraComponent {
  titulo = 'buscador de condiciones de compra';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.CONDICIONES_COMPRA.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorCondicionCompraComponent>
  ) {}

  seleccionar = (condicionCompra: CondicionCompra) => {
    this._dialogRef.close(condicionCompra);
  };
}
