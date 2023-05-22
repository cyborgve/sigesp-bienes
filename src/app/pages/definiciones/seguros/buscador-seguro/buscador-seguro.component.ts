import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buscador-seguro',
  templateUrl: './buscador-seguro.component.html',
  styleUrls: ['./buscador-seguro.component.scss'],
})
export class BuscadorSeguroComponent {
  titulo = 'buscador de seguros';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.SEGUROS.filter(c => c !== 'acciones');
}
