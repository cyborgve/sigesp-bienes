import { Component } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-tipo-poliza',
  templateUrl: './buscador-tipo-poliza.component.html',
  styleUrls: ['./buscador-tipo-poliza.component.scss'],
})
export class BuscadorTipoPolizaComponent {
  titulo = 'buscador de tipos de poliza';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_POLIZA.filter(
    c => c !== 'acciones'
  );
}
