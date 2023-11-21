import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FECHAS_CALCULADAS } from '@core/constants/fechas-calculadas';
import { RANGOS_FECHAS } from '@core/constants/rangos-fechas';
import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { ActaPrestamoService } from '@core/services/procesos/acta-prestamo.service';
import { filtrarProcesoPorFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-proceso-por-fecha';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lista-actas-prestamo',
  templateUrl: './lista-actas-prestamo.component.html',
  styleUrls: ['./lista-actas-prestamo.component.scss'],
})
export class ListaActasPrestamoComponent implements AfterViewInit, OnDestroy {
  private subscripciones: Subscription[] = [];
  dataSource: MatTableDataSource<ActaPrestamo> = new MatTableDataSource();
  titulo = 'Reportes: Lista de Actas de Préstamo Registradas';
  fechaEmision = new Date();
  rangosFechas = RANGOS_FECHAS;
  formularioRangoFechas: FormGroup;
  procesos = TIPOS_PROCESO;
  desactivarGuardar = () => this.dataSource.data.length === 0;
  filtrosSinDecorar: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _actaPrestamo: ActaPrestamoService,
    private _xlsx: XLSXService,
    private _configuracion: ConfiguracionService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['ESTE MES'],
      fechaInicio: [FECHAS_CALCULADAS['ESTE MES'][0]],
      fechaFin: [FECHAS_CALCULADAS['ESTE MES'][1]],
      fechaReferencia: ['CREADO'],
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
    this._xlsx
      .listaActasPrestamo(this.dataSource.data)
      .pipe(take(1))
      .subscribe();
  }
}
