import { tap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RANGOS_FECHAS } from '@core/constants/rangos-fechas';
import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';
import { filtroArranque } from '@core/utils/pipes-rxjs/operadores/filtro-inicial';
import { MatTableDataSource } from '@angular/material/table';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { ActaPrestamoService } from '@core/services/procesos/acta-prestamo.service';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';
import { filtrarProcesoPorFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-proceso-por-fecha';

@Component({
  selector: 'app-actas',
  templateUrl: './actas.component.html',
  styleUrls: ['./actas.component.scss'],
})
export class ActasComponent implements AfterViewInit, OnDestroy {
  private subscripciones: Subscription[] = [];
  dataSource: MatTableDataSource<ActaPrestamo> = new MatTableDataSource();
  titulo = 'Reportes: Actas de Préstamo';
  fechaEmision = new Date();
  rangosFechas = RANGOS_FECHAS;
  formularioRangoFechas: FormGroup;
  procesos = TIPOS_PROCESO;
  filtros = [filtroArranque()];

  constructor(
    private _formBuilder: FormBuilder,
    private _actaPrestamo: ActaPrestamoService,
    private _xlsx: XLSXService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['TODOS'],
      fechaInicio: [undefined],
      fechaFin: [undefined],
      fechaReferencia: ['CREADO'],
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
    this.subscripciones.forEach(subscrirpcion => subscrirpcion.unsubscribe());
  }

  private recargarDatos() {
    this._actaPrestamo
      .buscarTodos()
      .pipe(
        filtrarProcesoPorFecha(this.formularioRangoFechas),
        tap(
          (actasPrestamo: ActaPrestamo[]) =>
            (this.dataSource = new MatTableDataSource(actasPrestamo))
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    this._xlsx.actasPrestamo(this.dataSource.data);
  }
}
