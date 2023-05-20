import { Component } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-raza',
  templateUrl: './buscador-raza.component.html',
  styleUrls: ['./buscador-raza.component.scss'],
})
export class BuscadorRazaComponent {
  titulo = 'buscador de razas';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.RAZAS.filter(c => c !== 'acciones');
}
