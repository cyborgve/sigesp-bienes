import { Component, OnInit } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-modelo',
  templateUrl: './buscador-modelo.component.html',
  styleUrls: ['./buscador-modelo.component.scss'],
})
export class BuscadorModeloComponent {
  titulo = 'buscador de modelos';
  columnasVisibles = COLUMNAS_VISIBLES.MODELOS.filter(c => c !== 'acciones');
  ocultarNuevo = true;
}
