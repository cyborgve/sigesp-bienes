import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    if (window.scrollY < 70) {
      this.offset = window.scrollY;
    } else {
      this.offset = 70;
    }
  }

  @Input() mostrarBuscar: boolean = true;
  @Input() mostrarImportar: boolean = true;
  @Input() mostrarGuardar: boolean = true;
  @Input() mostrarImprimir: boolean = false;
  @Input() mostrarBorrar: boolean = true;
  @Input() mostrarIrAtras: boolean = true;
  @Input() mostrarIrAlInicio: boolean = true;
  @Input() mostrarSalir: boolean = true;
  @Input() tooTipProceso: boolean = false;

  @Input() desabilitarBuscar: boolean = false;
  @Input() desabilitarImportar: boolean = false;
  @Input() desabilitarGuardar: boolean = false;
  @Input() desabilitarImprimir: boolean = false;
  @Input() desabilitarBorrar: boolean = false;
  @Input() desabilitarIrAtras: boolean = false;
  @Input() desabilitarIrAlInicio: boolean = false;
  @Input() desabilitarSalir: boolean = false;

  @Output() buscar = new EventEmitter();
  @Output() importar = new EventEmitter();
  @Output() guardar = new EventEmitter();
  @Output() imprimir = new EventEmitter();
  @Output() borrar = new EventEmitter();
  @Output() irAtras = new EventEmitter();
  @Output() irAlInicio = new EventEmitter();
  @Output() salir = new EventEmitter();

  offset: number = 0;

  toolTipInicio = () =>
    this.tooTipProceso ? 'Ir a procesos' : 'Ir a definiciones';

  ngOnInit() {
    if (window.scrollY < 70) {
      this.offset = window.scrollY;
    } else {
      this.offset = 70;
    }
  }
}
