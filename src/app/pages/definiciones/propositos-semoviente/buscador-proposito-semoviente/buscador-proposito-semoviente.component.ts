import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { PropositoSemoviente } from '@core/models/proposito-semoviente';

@Component({
  selector: 'app-buscador-proposito-semoviente',
  templateUrl: './buscador-proposito-semoviente.component.html',
  styleUrls: ['./buscador-proposito-semoviente.component.scss'],
})
export class BuscadorPropositoSemovienteComponent {
  titulo = 'buscador de propósitos de semoviente';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.PROPOSITOS_SEMOVIENTE.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorPropositoSemovienteComponent>
  ) {}

  seleccionar = (entidad: PropositoSemoviente) => {
    this._dialogRef.close(entidad);
  };
}
