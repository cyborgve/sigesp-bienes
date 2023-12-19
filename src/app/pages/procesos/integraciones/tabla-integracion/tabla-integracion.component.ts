import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { FECHAS_CALCULADAS } from '@core/constants/fechas-calculadas';
import { OPCIONES_INTEGRACION_PROCESOS } from '@core/constants/opciones-proceso-integracion';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { Configuracion } from '@core/models/definiciones/configuracion';
import { Integracion } from '@core/models/procesos/integracion';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { IntegracionService } from '@core/services/procesos/integracion.service';
import { Id } from '@core/types/id';
import { filtrarIntegracionesPorEstadoAprobacion } from '@core/utils/pipes-rxjs/operadores/filtrar-integraciones-por-estado-aprobacion';
import { filtrarIntegracionesPorEstadoIntegracion } from '@core/utils/pipes-rxjs/operadores/filtrar-integraciones-por-estado-integracion';
import { filtrarIntegracionesPorFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-integraciones-por-fecha';
import { filtrarIntegracionesPorTipoProceso } from '@core/utils/pipes-rxjs/operadores/filtrar-integraciones-por-tipo-proceso';
import { ordenarIntegracionesPorFechaDescendiente } from '@core/utils/pipes-rxjs/operadores/ordenar-integraciones-por fecha-descendente';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-integracion',
  templateUrl: './tabla-integracion.component.html',
  styleUrls: ['./tabla-integracion.component.scss'],
})
export class TablaIntegracionComponent
  implements TablaEntidad<Integracion>, AfterViewInit, OnDestroy
{
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
  private subscripciones: Subscription[] = [];

  dataSource: MatTableDataSource<Integracion> = new MatTableDataSource();
  activarPaginacion: boolean = false;
  opcionesPaginacion: number[] = [6];
  mostrarBotonesInicioFinal: boolean = true;
  mostrarOpcionesPaginacion: boolean = true;
  itemsPorPagina = 6;

  formularioRangoFechas: FormGroup;
  formulario: FormGroup;
  filtrosSinDecorar: boolean;
  opciones = OPCIONES_INTEGRACION_PROCESOS;

  constructor(
    private _integracion: IntegracionService,
    private _location: Location,
    private _router: Router,
    private _configuracion: ConfiguracionService,
    private _formBuilder: FormBuilder
  ) {
    let fechaCalculada = FECHAS_CALCULADAS['ESTE MES'];
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['ESTE MES'],
      fechaInicio: [fechaCalculada[0]],
      fechaFin: [fechaCalculada[1]],
      fechaReferencia: ['CREADO'],
    });

    this.formulario = this._formBuilder.group({
      tipoProceso: ['TODOS'],
      estadoRegistro: ['NO REGISTRADOS'],
      estadoAprobacion: ['NO APROBADOS'],
      estadoIntegracion: ['NO INTEGRADOS'],
    });
  }

  ngAfterViewInit(): void {
    this._configuracion
      .buscarPorId(1)
      .pipe(
        tap(configuracion => {
          this.ajustarConfiguracion(configuracion);
          this.filtrosSinDecorar =
            configuracion.decorarFiltros === 1 ? false : true;
        }),
        take(1)
      )
      .subscribe();
    this.recargarDatos();
    this.subscripciones.push(
      this.formularioRangoFechas.valueChanges.subscribe(() =>
        this.recargarDatos()
      )
    );
    this.subscripciones.push(
      this.formulario.valueChanges.subscribe(() => this.recargarDatos())
    );
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
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

  private recargarDatos() {
    this.toggleAprobarTodos.checked = false;
    this.toggleIntegrarTodos.checked = false;
    this._integracion
      .buscarTodos()
      .pipe(
        filtrarIntegracionesPorFecha(this.formularioRangoFechas),
        filtrarIntegracionesPorTipoProceso(this.formulario.value.tipoProceso),
        filtrarIntegracionesPorEstadoAprobacion(
          this.formulario.value.estadoAprobacion
        ),
        filtrarIntegracionesPorEstadoIntegracion(
          this.formulario.value.estadoIntegracion
        ),
        ordenarIntegracionesPorFechaDescendiente(),
        tap(procesos => (this.dataSource = new MatTableDataSource(procesos))),
        take(1)
      )
      .subscribe();
  }

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

  aprobarTodos = () =>
    this.dataSource.data.forEach(
      dato => (dato.aprobado = this.toggleAprobarTodos.checked ? 0 : 1)
    );

  integrarTodos = () =>
    this.dataSource.data.forEach(
      dato => (dato.integrado = this.toggleIntegrarTodos.checked ? 0 : 1)
    );
}
