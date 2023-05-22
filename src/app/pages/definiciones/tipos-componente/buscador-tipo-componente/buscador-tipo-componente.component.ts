import { Component } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-tipo-componente',
  templateUrl: './buscador-tipo-componente.component.html',
  styleUrls: ['./buscador-tipo-componente.component.scss'],
})
export class BuscadorTipoComponenteComponent {
  titulo = 'buscador de tipos de componente';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_COMPONENTE.filter(
    c => c !== 'acciones'
  );
}
