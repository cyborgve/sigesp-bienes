import { Component, OnInit } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-tipo-estructura',
  templateUrl: './buscador-tipo-estructura.component.html',
  styleUrls: ['./buscador-tipo-estructura.component.scss'],
})
export class BuscadorTipoEstructuraComponent {
  titulo = 'buscador de tipos de estructura';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_ESTRUCTURA.filter(
    c => c !== 'acciones'
  );
}
