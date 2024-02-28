import { Component, Inject } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { PlantillaIntegracion } from '@core/models/definiciones/plantilla-integracion';

@Component({
  selector: 'app-buscador-plantilla-integracion',
  templateUrl: './buscador-plantilla-integracion.component.html',
  styleUrls: ['./buscador-plantilla-integracion.component.scss'],
})
export class BuscadorPlantillaIntegracionComponent {
  titulo = 'buscador de Plantillas de Integración';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.PLANTILLAS_INTEGRACION.filter(
    c => c !== 'acciones'
  );
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorPlantillaIntegracionComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: PlantillaIntegracion) => {
    this._dialogRef.close(entidad);
  };
}
