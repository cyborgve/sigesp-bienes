import { ordenarActivoListaDepreciacionPorFecha } from '@core/utils/pipes-rxjs/operadores/ordenar-detalles-depreciacion-fecha';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { FECHAS_CALCULADAS } from '@core/constants/fechas-calculadas';
import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { MonedaService } from '@core/services/otros-modulos/moneda.service';
import { DepreciacionDetalleService } from '@core/services/procesos/depreciacion-detalle.service';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { filtrarDepreciacionesAnuales } from '@core/utils/pipes-rxjs/operadores/filtrar-depreciaciones-anuales';
import { filtrarDepreciacionesAnualesPorRangoDeFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-depreciaciones-por-fecha';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';

@Component({
  selector: 'app-lista-depreciaciones-anuales',
  templateUrl: './lista-depreciaciones-anuales.component.html',
  styleUrls: ['./lista-depreciaciones-anuales.component.scss'],
})
export class ListaDepreciacionesAnualesComponent
  implements AfterViewInit, OnDestroy
{
  private subscripciones: Subscription[] = [];
  titulo = 'Reportes: Lista de Depreciaciones Anuales';
  fechaEmision = new Date();
  formularioRangoFechas: UntypedFormGroup;
  dataSource: MatTableDataSource<ActivoListaDepreciacion> =
    new MatTableDataSource();
  columnasVisibles =
    COLUMNAS_VISIBLES.LISTA_DEPRECIACIONES_ANUALES_MENSUALES.filter(
      s => s !== 'depreciacionMensual'
    );
  filtrosSinDecorar: boolean = false;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _depreciacion: DepreciacionService,
    private _xlsx: XLSXService,
    private _configuracion: ConfiguracionService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['TODO EL AÑO'],
      fechaInicio: [FECHAS_CALCULADAS['TODO EL AÑO'][0]],
      fechaFin: [FECHAS_CALCULADAS['TODO EL AÑO'][1]],
      fechaReferencia: 'CREADO',
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
    this.recargarDatos();
    this.subscripciones.push(
      this.formularioRangoFechas.valueChanges
        .pipe(tap(() => this.recargarDatos()))
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  private recargarDatos() {
    this._depreciacion
      .buscarTodosMensuales()
      .pipe(
        filtrarDepreciacionesAnuales(),
        filtrarDepreciacionesAnualesPorRangoDeFecha(this.formularioRangoFechas),
        ordenarActivoListaDepreciacionPorFecha(),
        tap(activos => (this.dataSource = new MatTableDataSource(activos))),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    this._xlsx.listaDepreciacionesAnualesMensuales(
      this.dataSource.data,
      'anuales'
    );
  }
}
