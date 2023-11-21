import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoListaInventario } from '@core/models/auxiliares/activo-lista-inventario';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { EstadoConservacionService } from '@core/services/definiciones/estado-conservacion.service';
import { EstadoUsoService } from '@core/services/definiciones/estado-uso.service';
import { MarcaService } from '@core/services/definiciones/marca.service';
import { ModeloService } from '@core/services/definiciones/modelo.service';
import { MonedaService } from '@core/services/otros-modulos/moneda.service';
import { filtrarActivosPorFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-fecha';
import { filtrarActivosPorResponsable } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-responsable';
import { filtrarActivosPorSede } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-sede';
import { filtrarActivosPorUnidadAdministrativa } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-unidad-administrativa';
import { transformarActivoListaInventario } from '@core/utils/pipes-rxjs/transformacion/transformar-activo-lista-inventario';
import { Subscription } from 'rxjs';
import { tap, take } from 'rxjs/operators';

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
  formularioRangoFechas: FormGroup;
  formularioFiltros: FormGroup;
  dataSource: MatTableDataSource<ActivoListaInventario> =
    new MatTableDataSource();
  filtrosSinDecorar: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _activo: ActivoService,
    private _estadoUso: EstadoUsoService,
    private _estadoConservacion: EstadoConservacionService,
    private _moneda: MonedaService,
    private _marca: MarcaService,
    private _modelo: ModeloService,
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
        transformarActivoListaInventario(
          this._activo,
          this._estadoUso,
          this._marca,
          this._modelo,
          this._estadoConservacion,
          this._moneda
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
    this._xlsx
      .listaInventarioActivos(this.dataSource.data)
      .pipe(take(1))
      .subscribe();
  }
}
