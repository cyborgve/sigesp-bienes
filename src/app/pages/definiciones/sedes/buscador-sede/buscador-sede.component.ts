import { Component } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-sede',
  templateUrl: './buscador-sede.component.html',
  styleUrls: ['./buscador-sede.component.scss'],
})
export class BuscadorSedeComponent {
  titulo = 'buscador de sedes';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.SEDES.filter(c => c !== 'acciones');
}
