import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Activo } from '@core/models/definiciones/activo';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { filtrarActivosPorFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-fecha';
import { filtrarActivosPorResponsable } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-responsable';
import { filtrarActivosPorSede } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-sede';
import { filtrarActivosPorUnidadAdministrativa } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-unidad-administrativa';
import { Subscription, pipe } from 'rxjs';
import { tap, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-lista-inventario-activos',
  templateUrl: './lista-inventario-activos.component.html',
  styleUrls: ['./lista-inventario-activos.component.scss'],
})
export class ListaInventarioActivosComponent
  implements AfterViewInit, OnDestroy
{
  private subscripciones: Subscription[] = [];
  @ViewChild(MatSort) sort: MatSort;
  titulo = 'Reportes: Lista de Inventario de Bienes';
  fechaEmision = new Date();
  formularioRangoFechas: UntypedFormGroup;
  formularioFiltros: UntypedFormGroup;
  dataSource: MatTableDataSource<Activo> = new MatTableDataSource();
  filtrosSinDecorar: boolean = false;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _activo: ActivoService,
    private _activoUbicacion: ActivoUbicacionService,
    private _xlsx: XLSXService,
    private _configuracion: ConfiguracionService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['PERSONALIZADO'],
      fechaInicio: [undefined],
      fechaFin: [undefined],
      fechaReferencia: 'CREADO',
    });
    this.formularioFiltros = this._formBuilder.group({
      unidadAdministrativa: [0],
      sede: [0],
      responsable: ['Todos'],
    });
  }

  ngAfterViewInit(): void {
    this._configuracion
      .buscarPorId(1)
      .pipe(
        tap(
          configuracion =>
            (this.filtrosSinDecorar = configuracion.decorarFiltros === 0)
        ),
        take(1)
      )
      .subscribe();
    this.subscripciones.push(
      this.formularioRangoFechas.valueChanges.subscribe(() =>
        this.recargarDatos()
      )
    );
    this.subscripciones.push(
      this.formularioFiltros.valueChanges.subscribe(() => this.recargarDatos())
    );
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  private recargarDatos() {
    this._activo
      .buscarTodos()
      .pipe(
        filtrarActivosPorFecha(this.formularioRangoFechas),
        filtrarActivosPorUnidadAdministrativa(
          this.formularioFiltros.value.unidadAdministrativa,
          this._activoUbicacion
        ),
        filtrarActivosPorSede(
          this.formularioFiltros.value.sede,
          this._activoUbicacion
        ),
        filtrarActivosPorResponsable(
          this.formularioFiltros.value.responsable,
          this._activoUbicacion
        ),
        tap(activos => {
          this.dataSource = new MatTableDataSource(activos);
          this.dataSource.sort = this.sort;
        }),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let codigos = this.dataSource.data.map(activo =>
      activo.codigo.substring(5)
    );
    this._activo
      .buscarTodosInventario()
      .pipe(
        map(listaInventario =>
          listaInventario.filter(activo => codigos.includes(activo.codigo))
        ),
        tap(activos => this._xlsx.listaInventarioActivos(activos)),
        take(1)
      )
      .subscribe();
  }
}
