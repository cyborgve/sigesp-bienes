import { ordenarDetallesDepreciacionPorFecha } from '@core/utils/pipes-rxjs/operadores/ordenar-detalles-depreciacion-fecha';
import { DepreciacionDetalleService } from '@core/services/procesos/depreciacion-detalle.service';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FECHAS_CALCULADAS } from '@core/constants/fechas-calculadas';
import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { MonedaService } from '@core/services/otros-modulos/moneda.service';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { Subscription } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { filtrarDepreciacionesMensualesPorFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-depreciaciones-mensuales-por-fecha';
import { transformarActivoListaDepreciacion } from '@core/utils/pipes-rxjs/transformacion/transformar-activo-lista-depreciacion';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-lista-depreciaciones-mensuales',
  templateUrl: './lista-depreciaciones-mensuales.component.html',
  styleUrls: ['./lista-depreciaciones-mensuales.component.scss'],
})
export class ListaDepreciacionesMensualesComponent
  implements AfterViewInit, OnDestroy
{
  private subscripciones: Subscription[] = [];
  titulo = 'Reportes: Lista de Depreciaciones Mensuales';
  fechaEmision = new Date();
  formularioRangoFechas: FormGroup;
  dataSource: MatTableDataSource<ActivoListaDepreciacion> =
    new MatTableDataSource();
  columnasVisibles =
    COLUMNAS_VISIBLES.LISTA_DEPRECIACIONES_ANUALES_MENSUALES.filter(
      s => s !== 'depreciacionAnual'
    );

  constructor(
    private _formBuilder: FormBuilder,
    private _depreciacion: DepreciacionService,
    private _depreciacionDetalle: DepreciacionDetalleService,
    private _activo: ActivoService,
    private _moneda: MonedaService,
    private _xlsx: XLSXService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['ESTE MES'],
      fechaInicio: [FECHAS_CALCULADAS['ESTE MES'][0]],
      fechaFin: [FECHAS_CALCULADAS['ESTE MES'][1]],
      fechaReferencia: 'CREADO',
    });
  }

  ngAfterViewInit(): void {
    this.subscripciones.push(
      this.formularioRangoFechas.valueChanges
        .pipe(tap(() => this.recargarDepreciaciones()))
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  private recargarDepreciaciones() {
    this._depreciacionDetalle
      .buscarTodos()
      .pipe(
        filtrarDepreciacionesMensualesPorFecha(this.formularioRangoFechas),
        ordenarDetallesDepreciacionPorFecha(),
        transformarActivoListaDepreciacion(
          this._depreciacion,
          this._activo,
          this._moneda
        ),
        tap(activos => (this.dataSource = new MatTableDataSource(activos))),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    this._xlsx.depreciacionesAnuales(this.dataSource.data);
  }
}
