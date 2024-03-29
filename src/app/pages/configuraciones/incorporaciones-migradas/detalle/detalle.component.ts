import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { ActivoMigrado } from '@core/models/auxiliares/activo-migrado';
import { CausaMovimiento } from '@core/models/definiciones/causa-movimiento';
import { MensajeDialogoSpinnerService } from '@core/services/auxiliares/mensaje-dialogo-spinner.service';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { IncorporacionActivoService } from '@core/services/procesos/incorporacion-activo.service';
import { IncorporacionService } from '@core/services/procesos/incorporacion.service';
import { ConfiguracionPorDefecto } from '@core/utils/funciones/configuracion-por-defecto';
import { convertirActivoMigrado } from '@core/utils/funciones/convertir-activo-migrado';
import { filtrarActivosIncorporados } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-incoporados';
import { filtrarActivosSinIncorporacion } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-sin-incorporacion';
import { filtrarCausasMovimientoPorTipo } from '@core/utils/pipes-rxjs/operadores/filtrar-causas-movimiento-por-tipo';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';
import { BuscadorCausaMovimientoComponent } from '@pages/definiciones/causas-movimiento/buscador-causa-movimiento/buscador-causa-movimiento.component';
import { DialogoSpinnerComponent } from '@shared/components/dialogo-spinner/dialogo-spinner.component';
import moment from 'moment';
import { Observable, Subscription, forkJoin, from } from 'rxjs';
import {
  filter,
  groupBy,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
  toArray,
} from 'rxjs/operators';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements AfterViewInit, OnDestroy {
  private subscripciones: Subscription[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('generarTodas') generarTodas: MatSlideToggle;
  @Input() generarIntegraciones: Observable<boolean>;
  dataSource: MatTableDataSource<ActivoMigrado> = new MatTableDataSource();
  configuracion = ConfiguracionPorDefecto();
  columnasVisibles = COLUMNAS_VISIBLES['ACTIVOS'];
  itemsPorPagina = this.configuracion['opcionesPaginacion'][0];
  activarSpinner = false;
  formulario: UntypedFormGroup;

  @Output() actualizarData = new EventEmitter();

  constructor(
    private _configuracion: ConfiguracionService,
    private _activo: ActivoService,
    private _activoUbicacion: ActivoUbicacionService,
    private _incorporacion: IncorporacionService,
    private _incorporacionActivo: IncorporacionActivoService,
    private _dialog: MatDialog,
    private _mensaje: MensajeDialogoSpinnerService,
    private _formBuilder: UntypedFormBuilder
  ) {
    this.formulario = this._formBuilder.group({
      causaMovimiento: [0],
    });
    this._configuracion
      .buscarPorId(1)
      .pipe(tap(configuracion => (this.configuracion = configuracion), take(1)))
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.subscripciones.push(
      this.generarIntegraciones
        .pipe(
          tap((generarIncorporaciones: boolean) => {
            if (generarIncorporaciones) this.ejecutarGenerarIncorporaciones();
          })
        )
        .subscribe()
    );
    this.recargarDatos();
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  private recargarDatos = () => {
    this._activo
      .buscarTodos()
      .pipe(
        filtrarActivosIncorporados(this._activoUbicacion),
        filtrarActivosSinIncorporacion(this._incorporacionActivo),
        map(activos => activos.map(convertirActivoMigrado)),
        tap(activos => {
          this.dataSource = new MatTableDataSource(activos);
          this.dataSource.paginator = this.paginator;
        }),
        tap(() => (this.generarTodas.checked = false)),
        take(1)
      )
      .subscribe(() =>
        this.actualizarData.emit(
          this.dataSource.data.some(activo => activo.generar)
        )
      );
  };

  private buscarIndice = (activoSeleccionado: ActivoMigrado) =>
    this.dataSource.data.findIndex(
      activoGuardado => activoGuardado.activo === activoSeleccionado.activo
    );

  generar = (activoSeleccionado: ActivoMigrado) =>
    this.dataSource.data[this.buscarIndice(activoSeleccionado)]['generar'];

  actualizarGenerar = (activoSeleccionado: ActivoMigrado) => {
    let data = this.dataSource.data;
    let indice = this.buscarIndice(activoSeleccionado);
    data[indice]['generar'] = !data[indice]['generar'];
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.actualizarData.emit(data.some(activo => activo.generar));
    this.generarTodas.checked =
      data.filter(ag => ag.generar).length === data.length;
  };

  private inicio = moment(new Date());

  ejecutarGenerarIncorporaciones = () => {
    this.inicio = moment(new Date());
    let activosMigrados = this.dataSource.data.filter(dato => dato.generar);
    let dialog = this._dialog.open(DialogoSpinnerComponent, {
      disableClose: true,
    });
    this._incorporacion
      .buscarPendientesPorRegistrar()
      .pipe(
        map(incorporaciones =>
          incorporaciones.filter(incorporacion =>
            activosMigrados.some(
              activoMigrado =>
                activoMigrado.activo === incorporacion.activos[0].activo
            )
          )
        ),
        map(incorporaciones => {
          for (let inc of incorporaciones)
            inc.causaMovimiento = this.formulario.value.causaMovimiento;
          return incorporaciones;
        }),
        mergeMap(incorporaciones =>
          from(incorporaciones).pipe(
            groupBy(incorporacion => incorporacion.responsableUso),
            mergeMap(grupos$ => grupos$.pipe(toArray())),
            map(incorporaciones => {
              let incorporacionNueva = incorporaciones[0];
              incorporaciones.forEach((incorporacion, indice) => {
                if (indice > 0)
                  incorporacionNueva.activos.push(incorporacion.activos[0]);
              });
              return incorporacionNueva;
            }),
            toArray()
          )
        ),
        tap(incorporacionesAgrupadas =>
          this._mensaje.actualizar(
            'MENSAJE',
            `Se estan registrando ${incorporacionesAgrupadas.length} Incorporaciones con ${activosMigrados.length} Bienes en total`
          )
        ),
        switchMap(incorporaciones => {
          let guardarIncorporaciones = incorporaciones.map(incorporacion =>
            this._incorporacion.guardar(incorporacion, 'INCORPORACIÓN', true)
          );
          return forkJoin(guardarIncorporaciones);
        }),
        take(1)
      )
      .subscribe(() => {
        this.recargarDatos();
        dialog.close();
        this.formulario.reset();
        this.formulario.patchValue({ causaMovimiento: 0 });
        console.log(
          'Duracion: ' +
            moment(new Date()).diff(this.inicio, 'seconds') +
            ' segundos.'
        );
      });
  };

  selecionarGenerarTodas = (generarTodas: MatSlideToggleChange) => {
    let data = this.dataSource.data;
    data = data.map(activoGuardado => {
      activoGuardado.generar = generarTodas.checked;
      return activoGuardado;
    });
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.actualizarData.emit(data.some(activo => activo.generar));
  };

  buscarCausaMovimiento = () => {
    let dialog = this._dialog.open(BuscadorCausaMovimientoComponent, {
      width: '85%',
      height: '95%',
      data: {
        filtros: [filtrarCausasMovimientoPorTipo('INCORPORACIÓN')],
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => todo),
        puedeActualizarFormulario(this.formulario.value.causaMovimiento),
        tap((causaMovimiento: CausaMovimiento) => {
          this.formulario.patchValue({ causaMovimiento: causaMovimiento.id });
        }),
        take(1)
      )
      .subscribe();
  };
}
