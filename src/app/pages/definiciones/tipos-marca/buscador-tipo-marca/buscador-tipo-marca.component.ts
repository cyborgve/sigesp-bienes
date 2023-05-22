import { Component } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-tipo-marca',
  templateUrl: './buscador-tipo-marca.component.html',
  styleUrls: ['./buscador-tipo-marca.component.scss'],
})
export class BuscadorTipoMarcaComponent {
  titulo = 'buscador de tipos de marca';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_MARCA.filter(
    c => c !== 'acciones'
  );
}
