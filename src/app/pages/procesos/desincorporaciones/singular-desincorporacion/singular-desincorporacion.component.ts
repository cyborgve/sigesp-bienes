import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';
import { tap, switchMap, take, first, filter, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
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
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { BuscadorCausaMovimientoComponent } from '@pages/definiciones/causas-movimiento/buscador-causa-movimiento/buscador-causa-movimiento.component';
import { CausaMovimiento } from '@core/models/definiciones/causa-movimiento';
import { pipe, forkJoin } from 'rxjs';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { Activo } from '@core/models/definiciones/activo';
import { activoIncorporado } from '@core/utils/funciones/activo-incorporado';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { convertirActivoProceso } from '@core/utils/funciones/convertir-activo-proceso';
import { BuscadorCuentaContableComponent } from '@shared/components/buscador-cuenta-contable/buscador-cuenta-contable.component';
import { DialogoEliminarProcesoComponent } from '@shared/components/dialogo-eliminar-proceso/dialogo-eliminar-proceso.component';
import { CuentaContableProceso } from '@core/models/auxiliares/cuenta-contable-proceso';
import { convertirCuentaProceso } from '@core/utils/funciones/convertir-cuenta-proceso';

@Component({
  selector: 'app-singular-desincorporacion',
  templateUrl: './singular-desincorporacion.component.html',
  styleUrls: ['./singular-desincorporacion.component.scss'],
})
export class SingularDesincorporacionComponent implements Entidad {
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
    private _activoUbicacion: ActivoUbicacionService
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
    this.reiniciarFormulario();
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
              comprobante: `${ser}-${doc}`,
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
        switchMap((depreciacion: Basica) =>
          depreciacion ? this._entidad.buscarPorId(depreciacion.id) : undefined
        ),
        tap(entidad =>
          entidad
            ? this.formulario.patchValue({
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
            : undefined
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
    const filtroCausas = () =>
      pipe(
        map((causas: CausaMovimiento[]) =>
          causas.filter(causa => causa.tipo === 'D')
        )
      );
    let dialog = this._dialog.open(BuscadorCausaMovimientoComponent, {
      height: '95%',
      width: '85%',
      data: { filtros: [filtroCausas()] },
    });
    dialog
      .afterClosed()
      .pipe(
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
    let filtrarIncorporados = () =>
      pipe(
        switchMap((activos: Activo[]) => {
          let ubicacionesPeticiones = activos.map(activo =>
            this._activoUbicacion.buscarPorActivo(activo.id)
          );
          return forkJoin(ubicacionesPeticiones).pipe(
            map(ubicaciones => {
              return activos.map(activo => {
                activo.ubicacion = ubicaciones.find(
                  ubicacion => ubicacion.activoId === activo.id
                );
                return activo;
              });
            })
          );
        }),
        map(activos =>
          activos.filter(activo => activoIncorporado(activo.ubicacion))
        )
      );
    let filtrarPorUnidadAdministrativa = () =>
      pipe(
        switchMap((activos: Activo[]) => {
          let ubicacionesPeticiones = activos.map(activo =>
            this._activoUbicacion.buscarPorActivo(activo.id)
          );
          return forkJoin(ubicacionesPeticiones).pipe(
            map(ubicaciones => {
              return activos.map(activo => {
                activo.ubicacion = ubicaciones.find(
                  ubicacion => ubicacion.activoId === activo.id
                );
                return activo;
              });
            })
          );
        }),
        map(activos =>
          activos.filter(
            activo =>
              Number(activo.ubicacion.unidadAdministrativaId) ===
              Number(this.formulario.value.unidadAdministrativa)
          )
        )
      );
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      height: '95%',
      width: '85%',
      data: {
        filtros: [filtrarIncorporados(), filtrarPorUnidadAdministrativa()],
      },
    });
    dialog
      .afterClosed()
      .pipe(
        tap(activo => {
          activo
            ? (this.activosDataSource = new MatTableDataSource([
                ...this.activosDataSource.data,
                convertirActivoProceso(activo),
              ]))
            : undefined;
        }),
        take(1)
      )
      .subscribe();
  }

  removerActivo(activo: ActivoProceso) {
    let data = this.activosDataSource.data;
    data.splice(data.indexOf(activo), 1);
    this.activosDataSource = new MatTableDataSource(data);
  }

  agregarCuentaContable() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((cuentaContable: CuentaContable) => {
          if (cuentaContable) {
            let data = this.cuentasDataSource.data;
            data.push(convertirCuentaProceso(cuentaContable));
            this.cuentasDataSource = new MatTableDataSource(data);
          }
        }),
        take(1)
      )
      .subscribe();
  }

  removerCuentaContable(cuentaProceso: CuentaContableProceso) {
    let data = this.cuentasDataSource.data;
    data.splice(data.indexOf(cuentaProceso), 1);
    this.cuentasDataSource = new MatTableDataSource(data);
  }

  private reiniciarFormulario() {
    this.formulario.reset({
      empresaId: 0,
      id: 0,
      comprobante: 'AUTOGENERADO',
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
    this.activosDataSource = new MatTableDataSource();
    this.cuentasDataSource = new MatTableDataSource();
    this.actualizarFormulario();
  }
}
