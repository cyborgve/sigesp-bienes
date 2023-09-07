import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-botones-acciones-proceso',
  templateUrl: './botones-acciones-proceso.component.html',
  styleUrls: ['./botones-acciones-proceso.component.scss'],
})
export class BotonesAccionesProcesoComponent {
  @Output() previsualizar = new EventEmitter();
  @Output() imprimir = new EventEmitter();
  @Output() editar = new EventEmitter();
  @Output() eliminar = new EventEmitter();
  @Input() deshabilitarEliminar: boolean = false;
  @Input() deshabilitarEditar: boolean = true;
  @Input() deshabilitarPrevisualizar: boolean = false;
  @Input() deshabilitarImprimir: boolean = false;
  @Input() ocultarEliminar: boolean = false;
  @Input() ocultarEditar: boolean = false;
  @Input() ocultarPrevisualizar: boolean = false;
  @Input() ocultarImprimir: boolean = true;
}
