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
  dataComponentes: MatTableDataSource<ActivoComponente> =
    new MatTableDataSource();
  dataCuentasContables: MatTableDataSource<CuentaContable> =
    new MatTableDataSource();

  constructor(
    private _entidad: ModificacionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      comprobante: ['AUTOGENERADO'],
      causaMovimiento: ['', Validators.required],
      activo: ['', Validators.required],
      identificador: ['', Validators.required],
      serial: [''],
      observaciones: [''],
      modificaciones: [[]],
      cuentasContables: [[]],
      creado: [new Date()],
      modificado: [new Date()],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

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
              comprobante: `${ser}-${doc}`,
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
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad, this.titulo.toUpperCase())
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._entidad
        .actualizar(this.id, entidad, this.titulo.toUpperCase())
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

  recargarComponentes() {
    this.dataComponentes = new MatTableDataSource(
      this.formulario.value.modificaciones
    );
  }

  recargarCuentasContables() {
    this.dataCuentasContables = new MatTableDataSource(
      this.formulario.value.cuentasContables
    );
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
            this.formulario.patchValue({ activo: activo.id });
          }
        }),
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
        tap((componente: ActivoComponente) => {
          if (componente) {
            this.formulario.patchValue({
              componentes: [...this.formulario.value.componentes, componente],
            });
            this.recargarComponentes();
          }
        }),
        take(1)
      )
      .subscribe();
  }

  removerComponente(event: any) {
    alert('TODO');
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
            this.formulario.patchValue({
              cuentasContables: [
                ...this.formulario.value.cuentasContables,
                cuentaContable,
              ],
            });
          }
        }),
        take(1)
      )
      .subscribe();
  }

  removerCuentaContable(event: any) {
    alert('TODO');
  }
}
