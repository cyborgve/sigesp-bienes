import { Component, OnInit } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-marca',
  templateUrl: './buscador-marca.component.html',
  styleUrls: ['./buscador-marca.component.scss'],
})
export class BuscadorMarcaComponent {
  titulo = 'buscador de marcas';
  columnasVisibles = COLUMNAS_VISIBLES.MARCAS.filter(c => c !== 'acciones');
  ocultarNuevo = true;
}
