import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoListaRetorno } from '@core/models/auxiliares/activo-lista-retorno';

@Component({
  selector: 'app-activos-proceso',
  templateUrl: './activos-proceso.component.html',
  styleUrls: ['./activos-proceso.component.scss'],
})
export class ActivosProcesoComponent {
  @ViewChild('inputBuscar') inputBuscar: ElementRef<HTMLInputElement>;
  @Output() agregarActivo = new EventEmitter();
  @Output() removerActivo = new EventEmitter();
  @Output() cambiarEstadoActivo = new EventEmitter();
  @Input() dataSource: MatTableDataSource<Activo | ActivoListaRetorno> =
    new MatTableDataSource();
  @Input() agregarActivoDeshabilitado: boolean = true;
  @Input() ocultarAgregarActivo: boolean = true;
  @Input() ocultarEncabezado: boolean = true;
  @Input() columnasVisibles = COLUMNAS_VISIBLES.ACTIVOS;
  @Input() mostrarBuscar: boolean = false;

  buscar(event: Event) {
    let valorFiltro = event ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  limpiarBuscar() {
    this.inputBuscar.nativeElement.value = null;
    this.buscar(null);
  }
}
