import { Component } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-estado-uso',
  templateUrl: './buscador-estado-uso.component.html',
  styleUrls: ['./buscador-estado-uso.component.scss'],
})
export class BuscadorEstadoUsoComponent {
  titulo = 'buscador de estados de uso';
  columnasVisibles = COLUMNAS_VISIBLES.ESTADOS_USO.filter(
    c => c !== 'acciones'
  );
  ocultarNuevo = true;
}
