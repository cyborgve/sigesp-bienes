import { tap, take, switchMap, first, filter, map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { ModificacionService } from '@core/services/procesos/modificacion.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorModificacionComponent } from '../buscador-modificacion/buscador-modificacion.component';
import { Basica } from '@core/models/auxiliares/basica';
import { Modificacion } from '@core/models/procesos/modificacion';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorCausaMovimientoComponent } from '@pages/definiciones/causas-movimiento/buscador-causa-movimiento/buscador-causa-movimiento.component';
import { CausaMovimiento } from '@core/models/definiciones/causa-movimiento';
import { Activo } from '@core/models/definiciones/activo';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { BuscadorComponenteComponent } from '@pages/definiciones/activos-componentes/buscador-componente/buscador-componente.component';
import { BuscadorCuentaContableComponent } from '@shared/components/buscador-cuenta-contable/buscador-cuenta-contable.component';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { ComponenteProceso } from '@core/models/auxiliares/componente-proceso';
import { CuentaContableProceso } from '@core/models/auxiliares/cuenta-contable-proceso';
import { convertirComponenteProceso } from '@core/utils/funciones/convertir-componente-proceso';
import { convertirCuentaProceso } from '@core/utils/funciones/convertir-cuenta-proceso';
import { ActivoService } from '@core/services/definiciones/activo.service';

@Component({
  selector: 'app-singular-modificacion',
  templateUrl: './singular-modificacion.component.html',
  styleUrls: ['./singular-modificacion.component.scss'],
})
export class SingularModificacionComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[36].nombre;
  formulario: FormGroup;
  dataComponentes: MatTableDataSource<ComponenteProceso> =
    new MatTableDataSource();
  dataCuentasContables: MatTableDataSource<CuentaContableProceso> =
    new MatTableDataSource();

  constructor(
    private _entidad: ModificacionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _activo: ActivoService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      comprobante: [undefined],
      causaMovimiento: [undefined, Validators.required],
      activo: [undefined, Validators.required],
      identificador: [undefined],
      serial: [undefined],
      observaciones: [undefined],
      modificaciones: [[]],
      cuentasContables: [[]],
      creado: [undefined],
      modificado: [undefined],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  agregarComponentesDeshabilitado = () => {
    let comprobaciones = [
      this.formulario.value.activo === undefined ||
        this.formulario.value.activo === 0,
      this.formulario.value.causaMovimiento === undefined ||
        this.formulario.value.causaMovimiento === 0,
    ];
    return comprobaciones.every(resultado => !!resultado);
  };

  depreciarDeshabilitado = true;

  formularioActivo = () =>
    this.formulario.valid &&
    this.dataComponentes.data.length > 0 &&
    this.dataCuentasContables.data.length > 0;

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
              activo: entidad.activo,
              identificador: entidad.identificador,
              serial: entidad.serial,
              observaciones: entidad.observaciones,
              modificaciones: entidad.modificaciones,
              cuentasContables: entidad.cuentasContables,
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
              causaMovimiento: '',
              activo: '',
              identificador: '',
              serial: '',
              observaciones: '',
              modificaciones: [],
              cuentasContables: [],
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
    let dialog = this._dialog.open(BuscadorModificacionComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        switchMap((modificacion: Basica) =>
          modificacion ? this._entidad.buscarPorId(modificacion.id) : undefined
        ),
        tap(entidad =>
          entidad
            ? this.formulario.patchValue({
                causaMovimiento: entidad.causaMovimiento,
                activo: entidad.activo,
                identificador: entidad.identificador,
                serial: entidad.serial,
                observaciones: entidad.observaciones,
              })
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad: Modificacion = this.formulario.value;
    entidad.modificaciones = this.dataComponentes.data;
    entidad.cuentasContables = this.dataCuentasContables.data;
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad, this.titulo)
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
    let dialog = this._dialog.open(DialogoEliminarDefinicionComponent, {
      data: {
        codigo: this.formulario.value.codigo,
        denominacion: this.formulario.value.denominacion,
      },
    });
    dialog
      .beforeClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() =>
          this._entidad.eliminar(
            this.formulario.value.id,
            this.titulo.toUpperCase()
          )
        ),
        take(1)
      )
      .subscribe(() => this.irAtras());
  }

  buscar() {
    this._router.navigate(['/procesos/modificaciones']);
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

  buscarCausaMovimiento() {
    const filtroCausas = () =>
      pipe(
        map((causas: CausaMovimiento[]) =>
          causas.filter(causa => causa.tipo === 'M')
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
            this.formulario.patchValue({ causaMovimiento: causaMovimiento.id });
          }
        }),
        take(1)
      )
      .subscribe();
  }

  buscarActivo() {
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((activo: Activo) => {
          if (activo) {
            this.formulario.patchValue({
              activo: activo.id,
              identificador: activo.serialRotulacion,
              serial: activo.serialFabrica,
            });
          }
        }),
        switchMap(activo => this._activo.esDepreciable(activo.id)),
        tap(esDepreciable => (this.depreciarDeshabilitado = !esDepreciable)),
        take(1)
      )
      .subscribe();
  }

  agregarComponente() {
    let dialog = this._dialog.open(BuscadorComponenteComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((activoComponente: ActivoComponente) => {
          this.dataComponentes = new MatTableDataSource([
            ...this.dataComponentes.data,
            convertirComponenteProceso(activoComponente),
          ]);
        }),
        take(1)
      )
      .subscribe();
  }

  removerComponente(componente: ComponenteProceso) {
    this.dataComponentes.data.splice(
      this.dataComponentes.data.indexOf(componente),
      1
    );
    this.dataComponentes = new MatTableDataSource(this.dataComponentes.data);
  }

  agregarCuentaContable() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((cuentaContable: CuentaContable) => {
          if (cuentaContable) {
            this.dataCuentasContables = new MatTableDataSource([
              ...this.dataCuentasContables.data,
              convertirCuentaProceso(cuentaContable),
            ]);
          }
        }),
        take(1)
      )
      .subscribe();
  }

  removerCuentaContable(cuentaProceso: CuentaContableProceso) {
    this.dataCuentasContables.data.splice(
      this.dataCuentasContables.data.indexOf(cuentaProceso),
      1
    );
    this.dataCuentasContables = new MatTableDataSource(
      this.dataCuentasContables.data
    );
  }

  private reiniciarFormulario(): void {
    this.formulario.reset();
    this.dataComponentes = new MatTableDataSource();
    this.dataCuentasContables = new MatTableDataSource();
    this.actualizarFormulario();
  }
}
