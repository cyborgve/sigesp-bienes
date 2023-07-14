import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TipoCobertura } from '@core/models/definiciones/tipo-cobertura';

@Component({
  selector: 'app-buscador-tipo-cobertura',
  templateUrl: './buscador-tipo-cobertura.component.html',
  styleUrls: ['./buscador-tipo-cobertura.component.scss'],
})
export class BuscadorTipoCoberturaComponent {
  titulo = 'buscador de tipos de cobertura';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_COBERTURA.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorTipoCoberturaComponent>
  ) {}

  seleccionar = (entidad: TipoCobertura) => {
    this._dialogRef.close(entidad);
  };
}
