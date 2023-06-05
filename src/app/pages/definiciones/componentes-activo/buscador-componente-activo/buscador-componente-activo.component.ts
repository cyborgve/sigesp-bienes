import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { ComponenteActivo } from '@core/models/componente-activo';
import { BuscadorColorComponent } from '@pages/definiciones/colores/buscador-color/buscador-color.component';

@Component({
  selector: 'app-buscador-componente-activo',
  templateUrl: './buscador-componente-activo.component.html',
  styleUrls: ['./buscador-componente-activo.component.scss'],
})
export class BuscadorComponenteActivoComponent {
  titulo = 'buscador de colores';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.COMPONENTES_ACTIVO.filter(
    c => c !== 'acciones'
  );
  constructor(private _dialogRef: MatDialogRef<BuscadorColorComponent>) {}

  seleccionar = (entidad: ComponenteActivo) => {
    this._dialogRef.close(entidad);
  };
}
