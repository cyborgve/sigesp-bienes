import { Location } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Integracion } from '@core/models/procesos/integracion';
import { TipoProceso } from '@core/types/tipo-proceso';
import { filtrarIntegracionesPorEstadoAprobacion } from '@core/utils/pipes-rxjs/operadores/filtrar-integraciones-por-estado-aprobacion';
import { filtrarIntegracionesPorEstadoIntegracion } from '@core/utils/pipes-rxjs/operadores/filtrar-integraciones-por-estado-integracion';
import { filtrarIntegracionesPorFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-integraciones-por-fecha';
import { filtrarIntegracionesPorTipoProceso } from '@core/utils/pipes-rxjs/operadores/filtrar-integraciones-por-tipo-proceso';
import { ordenarIntegracionesPorFechaDescendiente } from '@core/utils/pipes-rxjs/operadores/ordenar-integraciones-por fecha-descendente';
import { take, tap } from 'rxjs/operators';
import { FECHAS_CALCULADAS } from '@core/constants/fechas-calculadas';
import { Subscription } from 'rxjs';
import { Configuracion } from '@core/models/definiciones/configuracion';
import { ConfiguracionPorDefecto } from '@core/utils/funciones/configuracion-por-defecto';
import { filtrarIntegracionesPorEstadoRegistro } from '@core/utils/pipes-rxjs/operadores/filtrar-integraciones-por-estado-registro';
import { ContabilizacionService } from '@core/services/otros-modulos/contabilidad.service';
import { IntegracionService } from '@core/services/procesos/integracion.service';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';

@Component({
  selector: 'app-plural-integracion',
  templateUrl: './plural-integracion.component.html',
  styleUrls: ['./plural-integracion.component.scss'],
})
export class PluralIntegracionComponent implements AfterViewInit, OnDestroy {
  private subscripciones: Subscription[] = [];
  titulo = 'integraciones';
  dataSource: MatTableDataSource<Integracion> = new MatTableDataSource();
  aprobarTodos: boolean = false;
  integrarTodos: boolean = false;
  formularioRangoFechas: FormGroup;
  formulario: FormGroup;
  formularioIntegracion: FormGroup;
  tipoProceso: TipoProceso;
  configuracion: Configuracion = ConfiguracionPorDefecto();

  constructor(
    private _contabilizacion: ContabilizacionService,
    private _integracion: IntegracionService,
    private _router: Router,
    private _location: Location,
    private _configuracion: ConfiguracionService,
    private _formBuilder: FormBuilder
  ) {
    let esteMes = FECHAS_CALCULADAS['ESTE MES'];
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['ESTE MES'],
      fechaInicio: [esteMes[0]],
      fechaFin: [esteMes[1]],
      fechaReferencia: ['CREADO'],
    });

    this.formulario = this._formBuilder.group({
      tipoProceso: ['TODOS'],
      estadoRegistro: ['TODOS'],
      estadoAprobacion: ['NO APROBADOS'],
      estadoIntegracion: ['NO INTEGRADOS'],
    });

    this.formularioIntegracion = this._formBuilder.group({
      lineEnterprise: ['Seleccionar'],
    });
  }

  ngAfterViewInit(): void {
    this.subscripciones.push(
      this.formularioRangoFechas.valueChanges.subscribe(() =>
        this.recargarDatos()
      )
    );
    this.subscripciones.push(
      this.formulario.valueChanges.subscribe(() => this.recargarDatos())
    );

    this.recargarDatos();
  }

  ejecutar = () => {
    this._integracion
      .guardarTodos(
        this.dataSource.data,
        this.formularioIntegracion.value.lineEnterprice,
        true
      )
      .pipe(take(1))
      .subscribe(() => this.recargarDatos());
  };

  botonEjecutarHabilitado = () =>
    this.dataSource.data.filter(integracion => integracion.registrado === 0)
      .length > 0 &&
    this.dataSource.data.filter(integracion => integracion.aprobado === 1)
      .length > 0 &&
    this.formularioIntegracion.value.lineEnterprise !== 'Seleccionar';

  irAtras = () => {
    this._location.back();
  };

  irAlInicio = () => {
    this._router.navigate(['/procesos']);
  };

  private recargarDatos() {
    this.aprobarTodos = false;
    this.integrarTodos = false;
    this._configuracion
      .buscarPorId(1)
      .pipe(
        tap(configuracion => {
          this.configuracion = configuracion;
        }, take(1))
      )
      .subscribe();
    this._integracion
      .buscarTodos()
      .pipe(
        filtrarIntegracionesPorFecha(this.formularioRangoFechas),
        filtrarIntegracionesPorTipoProceso(this.formulario.value.tipoProceso),
        filtrarIntegracionesPorEstadoRegistro(
          this.formulario.value.estadoRegistro
        ),
        filtrarIntegracionesPorEstadoAprobacion(
          this.formulario.value.estadoAprobacion
        ),
        filtrarIntegracionesPorEstadoIntegracion(
          this.formulario.value.estadoIntegracion
        ),
        ordenarIntegracionesPorFechaDescendiente(),
        tap(procesos => (this.dataSource = new MatTableDataSource(procesos))),
        take(1)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }
}
