import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { PlantillaIntegracion } from '@core/models/definiciones/plantilla-integracion';

@Component({
  selector: 'app-buscador-plantilla-integracion',
  templateUrl: './buscador-plantilla-integracion.component.html',
  styleUrls: ['./buscador-plantilla-integracion.component.scss'],
})
export class BuscadorPlantillaIntegracionComponent {
  titulo = 'buscador de plantillas de Integración';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.COLORES.filter(c => c !== 'acciones');
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorPlantillaIntegracionComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (plantillaIntegracion: PlantillaIntegracion) => {
    this._dialogRef.close(plantillaIntegracion);
  };
}
