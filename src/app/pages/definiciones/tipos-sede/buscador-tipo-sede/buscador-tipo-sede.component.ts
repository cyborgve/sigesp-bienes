import { Component } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-tipo-sede',
  templateUrl: './buscador-tipo-sede.component.html',
  styleUrls: ['./buscador-tipo-sede.component.scss'],
})
export class BuscadorTipoSedeComponent {
  titulo = 'buscador de tipos de sede';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_SEDE.filter(c => c !== 'acciones');
}
