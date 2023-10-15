import { tap, map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RANGOS_FECHAS } from '@core/constants/rangos-fechas';
import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';
import { filtroArranque } from '@core/utils/pipes-rxjs/operadores/filtro-inicial';
import { filtroRangoFechas } from '@core/utils/funciones/actualizar-filtro-fecha';
import { TipoRangoFecha } from '@core/types/tipo-rango-fecha';
import { TipoFechaReferencia } from '@core/types/tipo-fecha';
import { RangoFecha } from '@core/models/auxiliares/rango-fecha';
import { MatTableDataSource } from '@angular/material/table';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { ActaPrestamoService } from '@core/services/procesos/acta-prestamo.service';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import moment from 'moment';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';

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
      this.formularioRangoFechas.controls.rango.valueChanges
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
        map(actasPrestamo =>
          actasPrestamo.filter(acta => {
            let fechaInicio = this.formularioRangoFechas.value.fechaInicio
              ? moment(this.formularioRangoFechas.value.fechaInicio)
              : moment(new Date(1));
            let fechaFin = this.formularioRangoFechas.value.fechaFin
              ? moment(this.formularioRangoFechas.value.fechaFin)
              : moment(new Date());
            if (this.formularioRangoFechas.value.rango === 'HOY') {
              console.log(`Fecha inicio: ${fechaInicio}`);
            }
            return moment(acta.creado).isBetween(fechaInicio, fechaFin);
          })
        ),
        tap(
          (actasPrestamo: ActaPrestamo[]) =>
            (this.dataSource = new MatTableDataSource(actasPrestamo))
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    console.log(this.dataSource.data);
    this._xlsx.actasPrestamo(this.dataSource.data);
  }
}
