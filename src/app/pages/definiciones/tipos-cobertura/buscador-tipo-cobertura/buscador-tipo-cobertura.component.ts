import { Component } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-tipo-cobertura',
  templateUrl: './buscador-tipo-cobertura.component.html',
  styleUrls: ['./buscador-tipo-cobertura.component.scss'],
})
export class BuscadorTipoCoberturaComponent {
  titulo = 'buscador de tipos de cobertura';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_COBERTURA.filter(
    c => c !== 'acciones'
  );
}
