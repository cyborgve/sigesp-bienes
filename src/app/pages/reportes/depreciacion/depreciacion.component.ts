import { tap, take } from 'rxjs/operators';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';
import { Subscription } from 'rxjs';
import { filtrarProcesoPorFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-proceso-por-fecha';

@Component({
  selector: 'app-depreciacion',
  templateUrl: './depreciacion.component.html',
  styleUrls: ['./depreciacion.component.scss'],
})
export class DepreciacionComponent implements AfterViewInit, OnDestroy {
  private subscripciones: Subscription[] = [];
  titulo = 'Reportes: Depreciación Anual';
  fechaEmision = new Date();
  formularioRangoFechas: FormGroup;
  dataSource: MatTableDataSource<Depreciacion> = new MatTableDataSource();

  constructor(
    private _formBuilder: FormBuilder,
    private _depreciacion: DepreciacionService,
    private _xlsx: XLSXService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['HOY'],
      fechaInicio: [new Date()],
      fechaFin: [undefined],
      fechaReferencia: ['CREADO'],
    });
    this.recargarDepreciaciones();
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
    this._depreciacion
      .buscarTodos()
      .pipe(
        filtrarProcesoPorFecha(this.formularioRangoFechas),
        tap(
          depreciaciones =>
            (this.dataSource = new MatTableDataSource(depreciaciones))
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    this._xlsx.depreciacionesAnuales(this.dataSource.data);
  }
}
