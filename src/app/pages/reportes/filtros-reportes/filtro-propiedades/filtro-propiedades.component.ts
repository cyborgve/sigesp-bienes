import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filtro-propiedades',
  templateUrl: './filtro-propiedades.component.html',
  styleUrls: ['./filtro-propiedades.component.scss'],
})
export class FiltroPropiedadesComponent {
  @Input() sinDecorar: boolean = false;
  @Input() propiedadesDisponibles: any[] = [];
  @Input() propiedadesSeleccionadas: any[] = [];
  @Output() accionSoltar = new EventEmitter();
  @Output() accionAgregar = new EventEmitter();
  @Output() accionEliminar = new EventEmitter();
}
