import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TipoSemoviente } from '@core/models/definiciones/tipo-semoviente';

@Component({
  selector: 'app-buscador-tipo-semoviente',
  templateUrl: './buscador-tipo-semoviente.component.html',
  styleUrls: ['./buscador-tipo-semoviente.component.scss'],
})
export class BuscadorTipoSemovienteComponent {
  titulo = 'buscador de tipos de semoviente';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_SEMOVIENTE.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorTipoSemovienteComponent>
  ) {}

  seleccionar = (entidad: TipoSemoviente) => {
    this._dialogRef.close(entidad);
  };
}
