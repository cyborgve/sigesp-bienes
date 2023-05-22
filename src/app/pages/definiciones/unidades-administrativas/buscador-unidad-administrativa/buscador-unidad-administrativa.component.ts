import { Component } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-unidad-administrativa',
  templateUrl: './buscador-unidad-administrativa.component.html',
  styleUrls: ['./buscador-unidad-administrativa.component.scss'],
})
export class BuscadorUnidadAdministrativaComponent {
  titulo = 'buscador de unidades administrativas';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.UNIDADES_ADMINISTRATIVAS.filter(
    c => c !== 'acciones'
  );
}
