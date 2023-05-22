import { Component } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-uso',
  templateUrl: './buscador-uso.component.html',
  styleUrls: ['./buscador-uso.component.scss'],
})
export class BuscadorUsoComponent {
  titulo = 'buscador de usos';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.USOS.filter(c => c !== 'acciones');
}
