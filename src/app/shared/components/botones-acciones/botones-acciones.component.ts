import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-botones-acciones',
  templateUrl: './botones-acciones.component.html',
  styleUrls: ['./botones-acciones.component.scss'],
})
export class BotonesAccionesComponent {
  @Output() editar = new EventEmitter();
  @Output() eliminar = new EventEmitter();
}
