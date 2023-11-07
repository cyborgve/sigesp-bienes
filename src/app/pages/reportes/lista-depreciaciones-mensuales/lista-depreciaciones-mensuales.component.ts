import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
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
    this.recargarDepreciaciones();
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
    this._depreciacion
      .buscarTodos()
      .pipe(
        map(depreciaciones =>
          depreciaciones.map(depreciacion =>
            convertirActivoListaDepreciacion(depreciacion, undefined, undefined)
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
