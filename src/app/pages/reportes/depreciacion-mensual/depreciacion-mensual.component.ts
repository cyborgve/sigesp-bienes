import { map, tap, take } from 'rxjs/operators';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepreciacionDetalleService } from '@core/services/procesos/depreciacion-detalle.service';
import moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';
import { Subscription } from 'rxjs';
import { filtrarProcesoPorFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-proceso-por-fecha';

@Component({
  selector: 'app-depreciacion-mensual',
  templateUrl: './depreciacion-mensual.component.html',
  styleUrls: ['./depreciacion-mensual.component.scss'],
})
export class DepreciacionMensualComponent implements AfterViewInit, OnDestroy {
  private subscripciones: Subscription[] = [];
  titulo = 'Reportes: Depreciaciones Mensuales';
  fechaEmision = new Date();
  formularioRangoFechas: FormGroup;
  dataSource: MatTableDataSource<DetalleDepreciacion> =
    new MatTableDataSource();

  constructor(
    private _formBuilder: FormBuilder,
    private _depreciacionDetalle: DepreciacionDetalleService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['TODOS'],
      fechaInicio: [undefined],
      fechaFin: [undefined],
      fechaReferencia: ['CREADO'],
    });
    this.recargarDatos();
  }

  ngAfterViewInit(): void {
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
    this._depreciacionDetalle
      .buscarTodos()
      .pipe(
        filtrarProcesoPorFecha(this.formularioRangoFechas),
        tap(detalles => {
          this.dataSource = new MatTableDataSource(detalles);
        }),
        take(1)
      )
      .subscribe();
  }

  guardar() {}
}
