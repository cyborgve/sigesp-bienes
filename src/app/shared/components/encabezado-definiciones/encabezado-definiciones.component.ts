import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-encabezado-definiciones',
  templateUrl: './encabezado-definiciones.component.html',
  styleUrls: ['./encabezado-definiciones.component.scss'],
})
export class EncabezadoDefinicionesComponent {
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @ViewChild('buscar') buscarElement: ElementRef<HTMLInputElement>;
  @Output() nuevo = new EventEmitter();
  @Output() filtrarDatos = new EventEmitter();
  @Output() limpiarBuscadorEvento = new EventEmitter();

  limpiarBuscador = () => {
    this.buscarElement.nativeElement.value = '';
    this.limpiarBuscadorEvento.emit();
  };
}
