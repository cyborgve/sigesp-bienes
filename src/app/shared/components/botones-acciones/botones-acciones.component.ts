import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-botones-acciones',
  templateUrl: './botones-acciones.component.html',
  styleUrls: ['./botones-acciones.component.scss'],
})
export class BotonesAccionesComponent {
  @Output() editar = new EventEmitter();
  @Output() eliminar = new EventEmitter();
  @Input() deshabilitarEliminar: boolean = false;
  @Input() deshabilitarEditar: boolean = false;
}
