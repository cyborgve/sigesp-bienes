import { Component } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-origen',
  templateUrl: './buscador-origen.component.html',
  styleUrls: ['./buscador-origen.component.scss'],
})
export class BuscadorOrigenComponent {
  titulo = 'buscador de origenes';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ORIGENES.filter(c => c !== 'acciones');
}
