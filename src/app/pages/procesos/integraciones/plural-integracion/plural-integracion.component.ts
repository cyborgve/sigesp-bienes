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
import { map, take, tap } from 'rxjs/operators';
import { FECHAS_CALCULADAS } from '@core/constants/fechas-calculadas';
import { Subscription, pipe } from 'rxjs';
import { Configuracion } from '@core/models/definiciones/configuracion';
import { ConfiguracionPorDefecto } from '@core/utils/funciones/configuracion-por-defecto';
import { filtrarIntegracionesPorEstadoRegistro } from '@core/utils/pipes-rxjs/operadores/filtrar-integraciones-por-estado-registro';
import { ContabilizacionService } from '@core/services/otros-modulos/contabilidad.service';
import { IntegracionService } from '@core/services/procesos/integracion.service';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { ModificacionService } from '@core/services/procesos/modificacion.service';
import { DesincorporacionService } from '@core/services/procesos/desincorporacion.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { PROCESOS_INTEGRABLES } from '@core/constants/procesos-integrables';
import { prepararIntegracion } from '@core/utils/funciones/preparar-integracion';

@Component({
  selector: 'app-plural-integracion',
  templateUrl: './plural-integracion.component.html',
  styleUrls: ['./plural-integracion.component.scss'],
})
export class PluralIntegracionComponent implements AfterViewInit, OnDestroy {
  private subscripciones: Subscription[] = [];
  private integracionesInicial: Integracion[] = [];
  titulo = 'integraciones';
  dataSource: MatTableDataSource<Integracion> = new MatTableDataSource();
  aprobarTodos: boolean = false;
  integrarTodos: boolean = false;
  formularioRangoFechas: FormGroup;
  formulario: FormGroup;
  formularioIntegracion: FormGroup;
  procesoTipo: TipoProceso;
  configuracion: Configuracion = ConfiguracionPorDefecto();

  constructor(
    private _contabilizacion: ContabilizacionService,
    private _integracion: IntegracionService,
    private _router: Router,
    private _location: Location,
    private _configuracion: ConfiguracionService,
    private _formBuilder: FormBuilder,
    private _activo: ActivoService,
    private _depreciacion: DepreciacionService,
    private _modificacion: ModificacionService,
    private _desincorporacion: DesincorporacionService,
    private _unidadAdministrativa: UnidadAdministrativaService
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
      lineEnterprise: [0],
      fechaIntegracion: [new Date()],
    });
  }

  ngAfterViewInit(): void {
    this._integracion
      .buscarTodos()
      .pipe(
        tap(integraciones => (this.integracionesInicial = integraciones)),
        take(1)
      )
      .subscribe();
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
    let integraciones = this.dataSource.data.map(prepararIntegracion);
    let { lineEnterprise, fechaIntegracion } = this.formularioIntegracion.value;
    let { observaciones } = this.formulario.value;
    let notificar = true;
    this._integracion
      .procesarAprobaciones(integraciones, notificar)
      .pipe(take(1))
      .subscribe(() => this.recargarDatos());
    this._integracion
      .procesarReversarAprobaciones(integraciones, notificar)
      .pipe(take(1))
      .subscribe(() => this.recargarDatos());
    this._integracion
      .procesarDepreciaciones(
        this.integracionesCandidatas(integraciones),
        lineEnterprise,
        fechaIntegracion,
        observaciones,
        notificar
      )
      .pipe(take(1))
      .subscribe(() => this.recargarDatos());
    this._integracion
      .procesarReversarDepreciaciones(
        this.integracionesCandidatas(integraciones),
        lineEnterprise,
        fechaIntegracion,
        observaciones,
        notificar
      )
      .pipe(take(1))
      .subscribe(() => this.recargarDatos());
    this._integracion
      .procesarDesincorporaciones(
        this.integracionesCandidatas(integraciones),
        lineEnterprise,
        fechaIntegracion,
        observaciones,
        notificar
      )
      .pipe(take(1))
      .subscribe(() => this.recargarDatos());
    this._integracion
      .procesarReversarDesincorporaciones(
        this.integracionesCandidatas(integraciones),
        lineEnterprise,
        fechaIntegracion,
        observaciones,
        notificar
      )
      .pipe(take(1))
      .subscribe(() => this.recargarDatos());

    this._integracion
      .buscarTodos()
      .pipe(
        tap(integraciones => (this.integracionesInicial = integraciones)),
        take(1)
      )
      .subscribe();
  };

  botonEjecutarHabilitado = () =>
    (this.formularioIntegracion.value.lineEnterprise !== 'Seleccionar' &&
      this.existenAprobaciones()) ||
    this.existenReversoAprobaciones() ||
    this.existenIntegracionesReversos();

  private existenAprobaciones = () =>
    this.dataSource.data
      .map(prepararIntegracion)
      .filter(
        integracion =>
          integracion.registrado === 0 && integracion.aprobado === 1
      ).length > 0;

  private existenReversoAprobaciones = () => {
    let data = this.dataSource.data;
    return (
      data
        .map(prepararIntegracion)
        .filter(
          integracion =>
            integracion.registrado === 1 && integracion.aprobado === 0
        ).length > 0
    );
  };

  private existenIntegracionesReversos = () =>
    this.dataSource.data
      .map(prepararIntegracion)
      .filter(
        integracion =>
          this.integracionesInicial.find(
            integracionInicial => integracionInicial.id == integracion.id
          ).integrado != integracion.integrado
      ).length > 0;

  private integracionesCandidatas = (integraciones: Integracion[]) =>
    integraciones.filter(
      integracion =>
        PROCESOS_INTEGRABLES.some(
          procesoIntegrable => integracion.procesoTipo === procesoIntegrable
        ) &&
        this.integracionesInicial.find(integ => integ.id === integracion.id)
          .integrado != integracion.integrado
    );

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
    this._integracion
      .buscarTodos()
      .pipe(
        tap(integraciones => (this.integracionesInicial = integraciones)),
        take(1)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }
}
