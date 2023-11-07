import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoListaInventario } from '@core/models/auxiliares/activo-lista-inventario';
import { Activo } from '@core/models/definiciones/activo';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { convertirActivoListaInventario } from '@core/utils/funciones/convertir-activo-lista-inventario';
import { filtrarActivosPorFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-fecha';
import { filtrarActivosPorResponsable } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-responsable';
import { filtrarActivosPorSede } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-sede';
import { filtrarActivosPorUnidadAdministrativa } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-unidad-administrativa';
import { Subscription, of, combineLatest } from 'rxjs';
import { tap, take, map, first } from 'rxjs/operators';

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
  dataSource: MatTableDataSource<Activo> = new MatTableDataSource();

  constructor(
    private _formBuilder: FormBuilder,
    private _activo: ActivoService,
    private _activoUbicacion: ActivoUbicacionService,
    private _xlsx: XLSXService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['TODOS'],
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
    this.recargarDatos();
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
    let activos = this.dataSource.data;
    let activos$ = of(activos);
    let ubicaciones$ = activos.map(activo =>
      this._activoUbicacion.buscarPorId(activo.id)
    );
    combineLatest([activos$, ubicaciones$])
      .pipe(
        map(([activos, ubicaciones]) => {
          let listaSalida: ActivoListaInventario[] = [];
          for (let index = 0; index < activos.length; index++) {
            listaSalida.push(
              convertirActivoListaInventario(activos[index], ubicaciones[index])
            );
          }
          return listaSalida;
        }),
        tap(listaInventario => this._xlsx.inventarioActivos(listaInventario)),
        first()
      )
      .subscribe();
  }
}
