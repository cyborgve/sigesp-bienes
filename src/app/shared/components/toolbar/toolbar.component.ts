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

  @Input() mostrarCrear: boolean = true;
  @Input() mostrarGuardar: boolean = true;
  @Input() mostrarBorrar: boolean = true;
  @Input() mostrarBuscar: boolean = true;
  @Input() mostrarImprimir: boolean = true;
  @Input() mostrarSalir: boolean = true;

  @Input() desabilitarCrear: boolean = false;
  @Input() desabilitarGuardar: boolean = false;
  @Input() desabilitarBorrar: boolean = false;
  @Input() desabilitarBuscar: boolean = false;
  @Input() desabilitarImprimir: boolean = false;
  @Input() desabilitarSalir: boolean = false;

  @Output() crear = new EventEmitter();
  @Output() guardar = new EventEmitter();
  @Output() borrar = new EventEmitter();
  @Output() buscar = new EventEmitter();
  @Output() imprimir = new EventEmitter();
  @Output() salir = new EventEmitter();

  offset: number = 0;

  ngOnInit() {
    if (window.scrollY < 70) {
      this.offset = window.scrollY;
    } else {
      this.offset = 70;
    }
  }

  emitNew() {
    this.crear.emit(true);
  }

  emitSave() {
    this.guardar.emit(true);
  }

  emitDelete() {
    this.borrar.emit(true);
  }

  emitSearch() {
    this.buscar.emit(true);
  }

  emitPrint() {
    this.imprimir.emit(true);
  }

  emitExit() {
    this.salir.emit(true);
  }
}
