import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorPlantillaDepreciacionComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: PlantillaDepreciacion) => {
    this._dialogRef.close(entidad);
  };
}
