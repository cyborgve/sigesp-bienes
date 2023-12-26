import { tap, switchMap, take, first, filter, map } from 'rxjs/operators';
import { Subscription, forkJoin } from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { DesincorporacionService } from '@core/services/procesos/desincorporacion.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorDesincorporacionComponent } from '../buscador-desincorporacion/buscador-desincorporacion.component';
import { Basica } from '@core/models/auxiliares/basica';
import { Desincorporacion } from '@core/models/procesos/desincorporacion';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { BuscadorCausaMovimientoComponent } from '@pages/definiciones/causas-movimiento/buscador-causa-movimiento/buscador-causa-movimiento.component';
import { CausaMovimiento } from '@core/models/definiciones/causa-movimiento';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { convertirActivoProceso } from '@core/utils/funciones/convertir-activo-proceso';
import { DialogoEliminarProcesoComponent } from '@shared/components/dialogo-eliminar-proceso/dialogo-eliminar-proceso.component';
import { CuentaContableProceso } from '@core/models/auxiliares/cuenta-contable-proceso';
import { convertirCuentaProceso } from '@core/utils/funciones/convertir-cuenta-proceso';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { chequearUnidadConActivos } from '@core/utils/funciones/chequear-unidad-con-activos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filtrarActivosIncorporados } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-incoporados';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { filtrarActivosPorUnidadAdministrativa } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-unidad-administrativa';
import { filtrarCausasMovimientoPorTipo } from '@core/utils/pipes-rxjs/operadores/filtrar-causas-movimiento-por-tipo';
import { ActivoIntegracionService } from '@core/services/definiciones/activo-integracion.service';
import { CuentaContableService } from '@core/services/otros-modulos/cuenta-contable.service';
import { Activo } from '@core/models/definiciones/activo';
import { filtrarActivosSeleccionados } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-seleccionados';

@Component({
  selector: 'app-singular-desincorporacion',
  templateUrl: './singular-desincorporacion.component.html',
  styleUrls: ['./singular-desincorporacion.component.scss'],
})
export class SingularDesincorporacionComponent
  implements Entidad, OnInit, OnDestroy
{
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[33].nombre;
  formulario: FormGroup;
  activosDataSource: MatTableDataSource<ActivoProceso> =
    new MatTableDataSource();
  cuentasDataSource: MatTableDataSource<CuentaContableProceso> =
    new MatTableDataSource();

  constructor(
    private _entidad: DesincorporacionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _activo: ActivoService,
    private _activoUbicacion: ActivoUbicacionService,
    private _activoIntegracion: ActivoIntegracionService,
    private _cuentaContable: CuentaContableService,
    private _snackBar: MatSnackBar
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      comprobante: [undefined],
      causaMovimiento: [undefined, Validators.required],
      unidadAdministrativa: [undefined, Validators.required],
      observaciones: [undefined],
      activos: [undefined],
      total: [undefined],
      cuentasContables: [undefined],
      debe: [undefined],
      haber: [undefined],
      diferencia: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  ngOnInit(): void {
    this.subscripciones.push(
      this.formulario.controls.unidadAdministrativa.valueChanges
        .pipe(
          switchMap((unidadAdministrativa: Id) =>
            chequearUnidadConActivos(
              unidadAdministrativa,
              this._activo,
              this._activoUbicacion,
              this._snackBar
            )
          )
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  formularioValido = () =>
    this.formulario.valid &&
    this.formulario.value.causaMovimiento !== 0 &&
    this.formulario.value.unidadAdministrativa !== 0 &&
    this.activosDataSource.data.length > 0 &&
    this.cuentasDataSource.data.length > 0;

  agregarActivoHabilitado = () =>
    this.formulario.valid &&
    this.formulario.value.causaMovimiento !== 0 &&
    this.formulario.value.unidadAdministrativa !== 0;

  private actualizarFormulario() {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._entidad
        .buscarPorId(this.id)
        .pipe(
          tap(entidad =>
            this.formulario.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              comprobante: entidad.comprobante,
              causaMovimiento: entidad.causaMovimiento,
              unidadAdministrativa: entidad.unidadAdministrativa,
              observaciones: entidad.observaciones,
              activos: entidad.activos,
              total: entidad.total,
              cuentasContables: entidad.cuentasContables,
              debe: entidad.debe,
              haber: entidad.haber,
              diferencia: entidad.diferencia,
              creado: entidad.creado,
              modificado: entidad.modificado,
            })
          ),
          take(1)
        )
        .subscribe();
    } else {
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
              causaMovimiento: 0,
              unidadAdministrativa: 0,
              observaciones: '',
              activos: [],
              total: 0,
              cuentasContables: [],
              debe: 0,
              haber: 0,
              diferencia: 0,
              creado: new Date(),
              modificado: new Date(),
            });
          }),
          take(1)
        )
        .subscribe();
    }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorDesincorporacionComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap((depreciacion: Basica) =>
          this._entidad.buscarPorId(depreciacion.id)
        ),
        tap(entidad =>
          this.formulario.patchValue({
            causaMovimiento: entidad.causaMovimiento,
            unidadAdministrativa: entidad.unidadAdministrativa,
            observaciones: entidad.observaciones,
            activos: entidad.activos,
            total: entidad.total,
            cuentasContables: entidad.cuentasContables,
            debe: entidad.debe,
            haber: entidad.haber,
            diferencia: entidad.diferencia,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad: Desincorporacion = this.formulario.value;
    entidad.activos = this.activosDataSource.data;
    entidad.cuentasContables = this.cuentasDataSource.data;
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad, 'DESINCORPORACIÓN')
        .pipe(first())
        .subscribe(() => this.reiniciarFormulario());
    } else {
      this._entidad
        .actualizar(this.id, entidad, this.titulo)
        .pipe(first())
        .subscribe(() => this.irAtras());
    }
  }

  borrar() {
    let dialog = this._dialog.open(DialogoEliminarProcesoComponent, {
      data: {
        comprobante: this.formulario.value.codigo,
        tipoDato: 'DESINCORPORACIÓN',
      },
    });
    dialog
      .beforeClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() =>
          this._entidad.eliminar(this.formulario.value.id, 'DESINCORPORACIÓN')
        ),
        take(1)
      )
      .subscribe(() => this.irAtras());
  }

  buscar() {
    this._router.navigate(['/procesos/desincorporaciones']);
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

  buscarUnidadAdministrativa() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((unidadAdministrativa: UnidadAdministrativa) => {
          if (unidadAdministrativa) {
            this.formulario.patchValue({
              unidadAdministrativa: unidadAdministrativa.id,
            });
          }
        }),
        take(1)
      )
      .subscribe();
  }

  buscarCausaMovimiento() {
    let dialog = this._dialog.open(BuscadorCausaMovimientoComponent, {
      height: '95%',
      width: '85%',
      data: {
        filtros: [filtrarCausasMovimientoPorTipo('DESINCORPORACIÓN')],
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((causaMovimiento: CausaMovimiento) => {
          if (causaMovimiento) {
            this.formulario.patchValue({
              causaMovimiento: causaMovimiento.id,
            });
          }
        }),
        take(1)
      )
      .subscribe();
  }

  agregarActivo() {
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      height: '95%',
      width: '85%',
      data: {
        filtros: [
          filtrarActivosIncorporados(this._activoUbicacion),
          filtrarActivosPorUnidadAdministrativa(
            this.formulario.value.unidadAdministrativa,
            this._activoUbicacion
          ),
          filtrarActivosSeleccionados(this.activosDataSource.data),
        ],
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap(activo => {
          this.activosDataSource = new MatTableDataSource([
            ...this.activosDataSource.data,
            convertirActivoProceso(activo),
          ]);
          this.agregarCuentasContables(activo);
        }),
        take(1)
      )
      .subscribe();
  }

  removerActivo(activo: ActivoProceso) {
    let data = this.activosDataSource.data;
    data
      .splice(data.indexOf(activo), 1)
      .forEach(activoEliminado =>
        this.removerCuentasContables(activoEliminado)
      );
    this.activosDataSource = new MatTableDataSource(data);
  }

  agregarCuentasContables(activo: Activo) {
    this._activoIntegracion
      .buscarPorActivo(activo.id)
      .pipe(
        switchMap(cuentasIntegracion => {
          let transformarDebe = this._cuentaContable
            .buscarPorId(cuentasIntegracion.desCuentaContableDebe)
            .pipe(
              map(cuentaContable =>
                convertirCuentaProceso(
                  cuentaContable,
                  'D',
                  activo.valorAdquisicion
                )
              )
            );
          let transformarHaber = this._cuentaContable
            .buscarPorId(cuentasIntegracion.desCuentaContableHaber)
            .pipe(
              map(cuentaContable =>
                convertirCuentaProceso(
                  cuentaContable,
                  'H',
                  activo.valorAdquisicion
                )
              )
            );
          return forkJoin([transformarDebe, transformarHaber]).pipe(
            tap(cuentasContables => {
              let { data } = this.cuentasDataSource;
              cuentasContables.forEach(c => {
                if (
                  data.some(
                    dato =>
                      dato.cuentaContable === c.cuentaContable &&
                      dato.procedencia === c.procedencia
                  )
                ) {
                  let indice = data.findIndex(
                    d =>
                      d.cuentaContable === c.cuentaContable &&
                      d.procedencia === c.procedencia
                  );
                  data[indice].monto += c.monto;
                } else {
                  data.push(c);
                }
              });
              this.cuentasDataSource = new MatTableDataSource(data);
            })
          );
        }),
        take(1)
      )
      .subscribe();
  }

  removerCuentasContables(activoProceso: ActivoProceso) {
    this._activo
      .buscarPorId(activoProceso.activo)
      .pipe(
        tap(activoCompleto => {
          let { integracion, valorAdquisicion } = activoCompleto;
          let { desCuentaContableDebe, desCuentaContableHaber } = integracion;
          let { data } = this.cuentasDataSource;
          let indiceDebe = data.findIndex(
            dato =>
              dato.cuentaContable === desCuentaContableDebe &&
              dato.procedencia === 'D'
          );
          data[indiceDebe]['monto'] -= valorAdquisicion;
          if (data[indiceDebe]['monto'] <= 0) data.splice(indiceDebe, 1);
          let indiceHaber = data.findIndex(
            dato =>
              dato.cuentaContable === desCuentaContableHaber &&
              dato.procedencia === 'H'
          );
          data[indiceHaber]['monto'] -= valorAdquisicion;
          if (data[indiceHaber]['monto'] <= 0) data.splice(indiceHaber, 1);
          this.cuentasDataSource = new MatTableDataSource(data);
        }),
        take(1)
      )
      .subscribe();
  }

  private reiniciarFormulario() {
    this.formulario.reset();
    this.activosDataSource = new MatTableDataSource();
    this.cuentasDataSource = new MatTableDataSource();
    this.actualizarFormulario();
  }
}
