import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Aseguradora } from '@core/models/aseguradora';

@Component({
  selector: 'app-buscador-aseguradora',
  templateUrl: './buscador-aseguradora.component.html',
  styleUrls: ['./buscador-aseguradora.component.scss'],
})
export class BuscadorAseguradoraComponent {
  titulo = 'buscador de aseguradoras';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ASEGURADORAS.filter(
    c => c !== 'acciones'
  );
  constructor(private _dialogRef: MatDialogRef<BuscadorAseguradoraComponent>) {}

  seleccionar = (aseguradora: Aseguradora) => {
    this._dialogRef.close(aseguradora);
  };
}
