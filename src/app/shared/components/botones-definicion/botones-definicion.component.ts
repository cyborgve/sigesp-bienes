import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-botones-definicion',
  templateUrl: './botones-definicion.component.html',
  styleUrls: ['./botones-definicion.component.scss'],
})
export class BotonesDefinicionComponent {
  @Output() importar = new EventEmitter();
  @Output() eliminar = new EventEmitter();
  @Output() imprimir = new EventEmitter();
  @Output() irAlInicio = new EventEmitter();
  @Output() irAtras = new EventEmitter();
  @Output() guardar = new EventEmitter();
}
