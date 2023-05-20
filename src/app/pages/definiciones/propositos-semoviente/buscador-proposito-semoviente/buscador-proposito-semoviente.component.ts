import { Component } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-proposito-semoviente',
  templateUrl: './buscador-proposito-semoviente.component.html',
  styleUrls: ['./buscador-proposito-semoviente.component.scss'],
})
export class BuscadorPropositoSemovienteComponent {
  titulo = 'buscador de propositos de semoviente';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.PROPOSITOS_SEMOVIENTE.filter(
    c => c !== 'acciones'
  );
}
