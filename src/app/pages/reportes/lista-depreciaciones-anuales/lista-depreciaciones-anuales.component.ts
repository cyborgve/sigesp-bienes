import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { FECHAS_CALCULADAS } from '@core/constants/fechas-calculadas';
import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { DepreciacionDetalleService } from '@core/services/procesos/depreciacion-detalle.service';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { convertirActivoListaDepreciacion } from '@core/utils/funciones/convertir-activo-lista-depreciacion';
import { Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

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
  formularioRangoFechas: FormGroup;
  dataSource: MatTableDataSource<ActivoListaDepreciacion> =
    new MatTableDataSource();
  columnasVisibles =
    COLUMNAS_VISIBLES.LISTA_DEPRECIACIONES_ANUALES_MENSUALES.filter(
      s => s !== 'depreciacionMensual'
    );

  constructor(
    private _formBuilder: FormBuilder,
    private _depreciacion: DepreciacionService,
    private _depreciacionDetalle: DepreciacionDetalleService,
    private _activo: ActivoService,
    private _xlsx: XLSXService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['TODO EL AÑO'],
      fechaInicio: [FECHAS_CALCULADAS['TODO EL AÑO'][0]],
      fechaFin: [FECHAS_CALCULADAS['TODO EL AÑO'][1]],
      fechaReferencia: 'CREADO',
    });
  }

  ngAfterViewInit(): void {
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
      .buscarTodos()
      .pipe(
        map(depreciaciones =>
          depreciaciones.map(depreciacion =>
            convertirActivoListaDepreciacion(
              depreciacion,
              {
                fechaDepreciacion: depreciacion.fechaIncorporacion,
                depreciacionMensual: depreciacion.depreciacionMensual,
                depreciacionAnual: depreciacion.depreciacionAnual,
                depreciacionAcumulada: 0,
                valorContable: 0,
              },
              { codigo: 'TODO', denominacion: 'TODO', tipoActivo: 'TODO' }
            )
          )
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
