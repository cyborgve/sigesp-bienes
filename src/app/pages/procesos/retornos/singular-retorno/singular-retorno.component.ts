import { tap, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { RetornoService } from '@core/services/procesos/retorno.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { FECHAS_CALCULADAS } from '@core/constants/fechas-calculadas';
import { TipoProceso } from '@core/types/tipo-proceso';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { filtrarActivosRetornoPorFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-retorno-por-fecha';
import { filtrarActivosRetornoPorTipoProceso } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-retorno-por-tipo-proceso';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivoListaRetorno } from '@core/models/auxiliares/activo-lista-retorno';

@Component({
  selector: 'app-singular-retorno',
  templateUrl: './singular-retorno.component.html',
  styleUrls: ['./singular-retorno.component.scss'],
})
export class SingularRetornoComponent
  implements Entidad, AfterViewInit, OnDestroy
{
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[38].nombre;
  formulario: UntypedFormGroup;
  formularioRangoFechas: UntypedFormGroup;
  dataSource: MatTableDataSource<ActivoProceso | ActivoListaRetorno> =
    new MatTableDataSource();
  tiposProceso: TipoProceso[] = ['ACTA DE PRÉSTAMO', 'AUTORIZACIÓN DE SALIDA'];
  filtrosSinDecorar = true;
  columnasVisibles = COLUMNAS_VISIBLES.ACTIVOS_LISTA_RETORNOS;
  deshabilitarEjecutar = new BehaviorSubject<boolean>(true);

  constructor(
    private _entidad: RetornoService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: UntypedFormBuilder,
    private _location: Location,
    private _correlativo: CorrelativoService,
    private _activo: ActivoService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['TODOS'],
      fechaInicio: [FECHAS_CALCULADAS['TODOS'][0]],
      fechaFin: [FECHAS_CALCULADAS['TODOS'][1]],
      fechaReferencia: ['CREADO'],
    });
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      tipoProceso: ['TODOS'],
      observaciones: [undefined],
      comprobante: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  ngAfterViewInit(): void {
    this.subscripciones.push(
      this.formularioRangoFechas.valueChanges.subscribe(() =>
        this.recargarListaRetornos()
      )
    );
    this.subscripciones.push(
      this.formulario.controls.tipoProceso.valueChanges.subscribe(tipoProceso =>
        this.recargarListaRetornos(tipoProceso)
      )
    );
    this.recargarListaRetornos();
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subs => subs.unsubscribe());
  }

  private recargarListaRetornos(tipoProceco?: any) {
    this._activo
      .buscarTodosRetornos()
      .pipe(
        filtrarActivosRetornoPorTipoProceso(
          tipoProceco || this.formulario.value.tipoProceso
        ),
        filtrarActivosRetornoPorFecha(this.formularioRangoFechas),
        tap(activos => (this.dataSource = new MatTableDataSource(activos))),
        take(1)
      )
      .subscribe();
  }

  private actualizarFormulario() {
    this._correlativo
      .buscarPorId(CORRELATIVOS.find(c => c.nombre === this.titulo).id)
      .pipe(
        tap(correlativo => {
          let ser = correlativo.serie.toString().padStart(4, '0');
          let doc = correlativo.correlativo.toString().padStart(8, '0');
          this.formulario.patchValue({
            empresaId: 0,
            id: 0,
            comprobante: `${ser}-${doc}`,
            observaciones: '',
            creado: new Date(),
            modificado: new Date(),
          });
        }),
        take(1)
      )
      .subscribe();
  }

  ejecutar() {
    let activosListaReporte = (
      this.dataSource.data as ActivoListaRetorno[]
    ).filter(alr => alr.retornar === true);
    this._entidad
      .guardarTodos(this.formulario.value.observaciones, activosListaReporte)
      .pipe(take(1))
      .subscribe();
  }

  cambiarEstadoActivo(event: any) {
    let activo: ActivoListaRetorno = event.activo;
    let nuevoEstado: boolean = event.nuevoEstado;
    let data = this.dataSource.data as ActivoListaRetorno[];
    data[data.findIndex(data => data.activo === activo.activo)].retornar =
      nuevoEstado;
    this.dataSource = new MatTableDataSource(data);
    this.deshabilitarEjecutar.next(data.every(dato => dato.retornar === false));
  }

  importar() {
    throw new Error('Method not implemented.');
  }

  guardar() {
    throw new Error('Method not implemented.');
  }

  buscar() {
    this._router.navigate(['/procesos/retornos']);
  }

  borrar() {
    throw new Error('Method not implemented.');
  }

  imprimir() {
    throw new Error('Method not implemented.');
  }

  irAtras() {
    this._location.back();
  }
  irAlInicio() {
    this._router.navigate(['/procesos']);
  }

  salir() {
    throw new Error('Method not implemented.');
  }
}
