import { Component } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-componente-activo',
  templateUrl: './buscador-componente-activo.component.html',
  styleUrls: ['./buscador-componente-activo.component.scss'],
})
export class BuscadorComponenteActivoComponent {
  titulo = 'buscador de componente de activo';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.COMPONENTES_ACTIVO.filter(
    c => c !== 'acciones'
  );
}
