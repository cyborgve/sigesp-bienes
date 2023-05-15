import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractEntidadFunciones } from '@core/class/abstract-entidad-funciones';
import { CausaMovimientoService } from '@core/services/causa-movimiento.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorCausaMovimientoComponent } from '../buscador-causa-movimiento/buscador-causa-movimiento.component';
import { CausaMovimiento } from '@core/models/causa-movimiento';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { Location } from '@angular/common';
import { TIPOS_CAUSA_MOVIMIENTO } from '@core/constants/tipos-causa-movimiento';

@Component({
  selector: 'app-singular-causa-movimiento',
  templateUrl: './singular-causa-movimiento.component.html',
  styleUrls: ['./singular-causa-movimiento.component.scss'],
})
export class SingularCausaMovimientoComponent extends AbstractEntidadFunciones {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'causa movimiento';
  formulario: FormGroup;
  tiposCausaMovimiento = TIPOS_CAUSA_MOVIMIENTO;

  constructor(
    private _entidad: CausaMovimientoService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog
  ) {
    super();
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  private actualizarFormulario() {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._entidad
        .buscarPorId(this.id)
        .pipe(
          take(1),
          tap(entidad => {
            this.formulario = this._formBuilder.group({
              empresaId: [entidad.empresaId],
              id: [entidad.id],
              codigo: [entidad.codigo, Validators.required],
              denominacion: [entidad.denominacion, Validators.required],
              tipo: [entidad.tipo, Validators.required],
              estadoAfectacionContable: [
                entidad.estadoAfectacionContable,
                Validators.required,
              ],
              estadoAfectacionPresupuestaia: [
                entidad.estadoAfectacionPresupuestari,
                Validators.required,
              ],
              creado: [entidad.creado],
              modificado: [entidad.modificado],
            });
          })
        )
        .subscribe();
    } else {
      this.formulario = this._formBuilder.group({
        empresaId: [''],
        id: [''],
        codigo: ['', Validators.required],
        denominacion: ['', Validators.required],
        tipo: ['', Validators.required],
        estadoAfectacionContable: ['', Validators.required],
        estadoAfectacionPresupuestaria: ['', Validators.required],
        creado: [''],
        modificado: [''],
      });
    }
  }

  buscar() {
    let dialog = this._dialog.open(BuscadorCausaMovimientoComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((causaMovimiento: CausaMovimiento) => {
          this.formulario.patchValue({
            empresaId: causaMovimiento.empresaId,
            id: causaMovimiento.id,
            codigo: causaMovimiento.creado,
            denominacion: causaMovimiento.denominacion,
            creado: causaMovimiento.creado,
            modificado: causaMovimiento.modificado,
          });
        })
      )
      .subscribe();
  }

  importar() {
    let dialog = this._dialog.open(BuscadorCausaMovimientoComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((causaMovimiento: CausaMovimiento) => {
          this.formulario.patchValue({
            empresaId: causaMovimiento.empresaId,
            id: causaMovimiento.id,
            denominacion: causaMovimiento.denominacion,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let causaMovimiento: CausaMovimiento = this.formulario.value;
    causaMovimiento.modificado = new Date();
    if (this.modoFormulario === 'CREANDO') {
      causaMovimiento.creado = new Date();
      this._entidad.guardar(causaMovimiento).pipe(first()).subscribe();
    } else {
      this._entidad
        .actualizar(this.id, causaMovimiento)
        .pipe(first())
        .subscribe();
    }
  }

  borrar() {
    let dialog = this._dialog.open(DialogoEliminarComponent, {
      data: {
        codigo: this.formulario.value.codigo,
        denominacion: this.formulario.value.denominacion,
      },
    });
    dialog
      .beforeClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() => this._entidad.eliminar(this.formulario.value.id)),
        take(1)
      )
      .subscribe();
  }

  imprimir() {
    throw new Error('Method not implemented.');
  }

  irAtras() {
    this._location.back();
  }
  irAlInicio() {
    this._router.navigate(['/']);
  }

  salir() {
    throw new Error('Method not implemented.');
  }
}
