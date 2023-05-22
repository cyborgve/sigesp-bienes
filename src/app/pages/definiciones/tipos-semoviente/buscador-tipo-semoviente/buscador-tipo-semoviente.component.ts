import { Component, OnInit } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-tipo-semoviente',
  templateUrl: './buscador-tipo-semoviente.component.html',
  styleUrls: ['./buscador-tipo-semoviente.component.scss'],
})
export class BuscadorTipoSemovienteComponent {
  titulo = 'buscador de tipos de semoviente';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_SEMOVIENTE.filter(
    c => c !== 'acciones'
  );
}
