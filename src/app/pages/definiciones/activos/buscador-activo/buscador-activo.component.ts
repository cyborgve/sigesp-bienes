import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buscador-activo',
  templateUrl: './buscador-activo.component.html',
  styleUrls: ['./buscador-activo.component.scss'],
})
export class BuscadorActivoComponent {
  titulo = 'buscador de activos';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ACTIVOS.filter(c => c !== 'acciones');
}
