import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { Configuracion } from '@core/models/definiciones/configuracion';
import { Integracion } from '@core/models/procesos/integracion';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { Id } from '@core/types/id';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-integracion',
  templateUrl: './tabla-integracion.component.html',
  styleUrls: ['./tabla-integracion.component.scss'],
})
export class TablaIntegracionComponent
  implements TablaEntidad<Integracion>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() ocultarEncabezado: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.INTEGRACIONES;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/procesos/integraciones';
  private urlSingular = this.urlPlural + '/integracion';
  private urlSingularId = (id: Id) => this.urlPlural + '/integracion/' + id;

  dataSource: MatTableDataSource<Integracion> = new MatTableDataSource(mocks);
  activarPaginacion: boolean = false;
  opcionesPaginacion: number[] = [6];
  mostrarBotonesInicioFinal: boolean = true;
  mostrarOpcionesPaginacion: boolean = true;
  itemsPorPagina = 6;

  formularioRangoFechas: FormGroup;
  filtrosSinDecorar: boolean;

  constructor(
    private _location: Location,
    private _router: Router,
    private _dialog: MatDialog,
    private _configuracion: ConfiguracionService,
    private _formBuilder: FormBuilder
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['TODOS'],
      fechaInicio: [undefined],
      fechaFin: [undefined],
      fechaReferencia: ['CREADO'],
    });
  }

  ngAfterViewInit(): void {
    this._configuracion
      .buscarPorId(1)
      .pipe(
        tap(configuracion => {
          this.ajustarConfiguracion(configuracion);
          this.filtrosSinDecorar =
            configuracion.decorarFiltros === 1 ? true : false;
        }),
        take(1)
      )
      .subscribe();
    this.recargarDatos();
  }

  private ajustarConfiguracion(configuracion: Configuracion) {
    this.activarPaginacion =
      configuracion.activarPaginacion === 1 ? true : false;
    this.opcionesPaginacion = configuracion.opcionesPaginacion;
    this.mostrarBotonesInicioFinal =
      configuracion.mostrarBotonesInicioFinal === 1 ? true : false;
    this.mostrarOpcionesPaginacion =
      configuracion.mostrarOpcionesPaginacion === 1 ? true : false;
    this.itemsPorPagina = configuracion.opcionesPaginacion[0];
  }

  private recargarDatos() {}

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

  imprimir(entidad: Integracion) {}

  eliminar(entidad: Integracion) {}
}

const mocks: Integracion[] = [
  {
    empresaId: 0,
    id: 0,
    comprobante: '0000-00000000',
    tipo: 'DEPRECIACION',
    activo: 1,
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 0,
    id: 0,
    comprobante: '0000-00000000',
    tipo: 'DEPRECIACION',
    activo: 1,
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 0,
    id: 0,
    comprobante: '0000-00000000',
    tipo: 'DEPRECIACION',
    activo: 1,
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 0,
    id: 0,
    comprobante: '0000-00000000',
    tipo: 'DEPRECIACION',
    activo: 1,
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 0,
    id: 0,
    comprobante: '0000-00000000',
    tipo: 'DEPRECIACION',
    activo: 1,
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 0,
    id: 0,
    comprobante: '0000-00000000',
    tipo: 'DEPRECIACION',
    activo: 1,
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 0,
    id: 0,
    comprobante: '0000-00000000',
    tipo: 'DEPRECIACION',
    activo: 1,
    creado: new Date(),
    modificado: new Date(),
  },
];
