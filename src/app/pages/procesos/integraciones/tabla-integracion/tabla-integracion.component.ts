import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { OPCIONES_INTEGRACION_PROCESOS } from '@core/constants/opciones-proceso-integracion';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { Configuracion } from '@core/models/definiciones/configuracion';
import { Integracion } from '@core/models/procesos/integracion';
import { Id } from '@core/types/id';

@Component({
  selector: 'app-tabla-integracion',
  templateUrl: './tabla-integracion.component.html',
  styleUrls: ['./tabla-integracion.component.scss'],
})
export class TablaIntegracionComponent implements TablaEntidad<Integracion> {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('toggleAprobarTodos') toggleAprobarTodos: MatSlideToggle;
  @ViewChild('toggleIntegrarTodos') toggleIntegrarTodos: MatSlideToggle;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() ocultarEncabezado: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.INTEGRACIONES;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/procesos/integraciones';
  private urlSingular = this.urlPlural + '/integracion';
  private urlSingularId = (id: Id) => this.urlPlural + '/integracion/' + id;

  @Input() configuracion: Configuracion;
  @Input() dataSource: MatTableDataSource<Integracion> =
    new MatTableDataSource();

  @Input() formularioRangoFechas: FormGroup;
  @Input() formulario: FormGroup;
  @Input() formularioIntegracion: FormGroup;
  opciones = OPCIONES_INTEGRACION_PROCESOS;

  constructor(private _location: Location, private _router: Router) {}

  irAtras() {
    this._location.back();
  }

  irAlInicio() {
    this._router.navigate(['/']);
  }

  filtrar(event: Event) {
    let valorFiltro = event ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  nuevo() {
    this._router.navigate([this.urlSingular]);
  }

  editar(entidad: Integracion) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  imprimir(entidad: Integracion) {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: Integracion) {
    throw new Error('Method not implemented.');
  }

  private indice = (integracion: Integracion) =>
    this.dataSource.data.findIndex(
      integ =>
        integ.empresaId === integracion.empresaId &&
        integ.id === integracion.id &&
        integ.comprobante === integracion.comprobante &&
        integ.tipoProceso === integracion.tipoProceso
    );

  aprobar = (integracion: Integracion) =>
    this.dataSource.data[this.indice(integracion)].aprobado === 1;

  actualizarAprobar = (aprobado: boolean, integracion: Integracion) => {
    let data = this.dataSource.data;
    data[this.indice(integracion)].aprobado = aprobado ? 1 : 0;
    this.toggleAprobarTodos.checked = data
      .map(d => d.aprobado)
      .every(b => b === 0);
    this.toggleAprobarTodos.checked = data
      .map(d => d.aprobado)
      .every(b => b === 1);
    this.dataSource = new MatTableDataSource(data);
  };

  integrar = (integracion: Integracion) =>
    this.dataSource.data[this.indice(integracion)].integrado === 1;

  actualizarIntegrar = (integrado: boolean, integracion: Integracion) => {
    let data = this.dataSource.data;
    data[this.indice(integracion)].integrado = integrado ? 1 : 0;
    this.toggleIntegrarTodos.checked = data
      .map(dato => dato.integrado)
      .every(n => n === 0);
    this.toggleIntegrarTodos.checked = data
      .map(d => d.integrado)
      .every(n => n === 1);
    this.dataSource = new MatTableDataSource(data);
  };

  aprobarTodos = () => {
    this.dataSource.data.forEach(
      dato => (dato.aprobado = this.toggleAprobarTodos.checked ? 0 : 1)
    );
    // if (this.toggleIntegrarTodos) {
    //   this.toggleIntegrarTodos.checked = false;
    //   this.dataSource.data.forEach(dato => (dato.integrado = 0));
    // }
  };

  integrarTodos = () => {
    this.dataSource.data.forEach(dato => {
      dato.integrado = this.toggleIntegrarTodos.checked ? 0 : 1;
    });
    // if (!this.toggleIntegrarTodos.checked) {
    //   this.toggleAprobarTodos.checked = true;
    //   this.dataSource.data.forEach(dato => (dato.aprobado = 1));
    // }
  };
}
