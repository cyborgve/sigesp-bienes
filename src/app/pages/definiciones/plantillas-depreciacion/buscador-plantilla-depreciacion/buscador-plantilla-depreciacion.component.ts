import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { PlantillaDepreciacion } from '@core/models/definiciones/plantilla-depreciacion';

@Component({
  selector: 'app-buscador-plantilla-depreciacion',
  templateUrl: './buscador-plantilla-depreciacion.component.html',
  styleUrls: ['./buscador-plantilla-depreciacion.component.scss'],
})
export class BuscadorPlantillaDepreciacionComponent {
  titulo = 'buscador de plantillas de depreciación';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.PLANTILLAS_DEPRECIACION.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorPlantillaDepreciacionComponent>
  ) {}

  seleccionar = (entidad: PlantillaDepreciacion) => {
    this._dialogRef.close(entidad);
  };
}
