import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CausaMovimientoService } from '@core/services/causa-movimiento.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorCausaMovimientoComponent } from '../buscador-causa-movimiento/buscador-causa-movimiento.component';
import { CausaMovimiento } from '@core/models/causa-movimiento';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { Location } from '@angular/common';
import { TIPOS_CAUSA_MOVIMIENTO } from '@core/constants/tipos-causa-movimiento';
import { Entidad } from '@core/models/entidad';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { CorrelativoService } from '@core/services/correlativo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-singular-causa-movimiento',
  templateUrl: './singular-causa-movimiento.component.html',
  styleUrls: ['./singular-causa-movimiento.component.scss'],
})
export class SingularCausaMovimientoComponent implements Entidad, OnDestroy {
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[4].nombre;
  formulario: FormGroup;
  tiposCausaMovimiento = TIPOS_CAUSA_MOVIMIENTO;

  constructor(
    private _entidad: CausaMovimientoService,
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
      codigo: ['autogenerado'],
      denominacion: ['', Validators.required],
      tipo: [''],
      estAfectacionContable: [0],
      estAfectacionPresupuestaria: [0],
      creado: [new Date()],
      modificado: [new Date()],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
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
              denominacion: [entidad.denominacion, Validators.required],
              tipo: [entidad.tipo, Validators.required],
              estAfectacionContable: [entidad.estAfectacionContable],
              estAfectacionPresupuestaria: [
                entidad.estAfectacionPresupuestaria,
              ],
              codigo: [entidad.codigo, Validators.required],
              creado: [entidad.creado],
              modificado: [entidad.modificado],
            });
          })
        )
        .subscribe();
    } else {
      this._correlativo
        .buscarPorId(CORRELATIVOS.find(c => c.nombre === this.titulo).id)
        .pipe(
          take(1),
          tap(categoria =>
            this.formulario.patchValue({
              codigo:
                categoria.serie.toString().padStart(4, '0') +
                '-' +
                categoria.correlativo.toString().padStart(8, '0'),
            })
          )
        )
        .subscribe();
    }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorCausaMovimientoComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((entidad: CausaMovimiento) => {
            this.formulario.patchValue({
              denominacion: entidad.denominacion,
              tipo: entidad.tipo,
              estAfectacionContable: entidad.estAfectacionContable,
              estAfectacionPresupuestaria: entidad.estAfectacionPresupuestaria,
            });
          })
        )
        .subscribe()
    );
  }

  guardar() {
    let entidad: CausaMovimiento = this.formulario.value;
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad)
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._entidad
        .actualizar(this.id, entidad)
        .pipe(first())
        .subscribe(() => this.irAtras());
    }
  }

  borrar() {
    let dialog = this._dialog.open(DialogoEliminarComponent, {
      data: {
        codigo: this.formulario.value.codigo,
        denominacion: this.formulario.value.denominacion,
      },
    });
    this.subscripciones.push(
      dialog
        .beforeClosed()
        .pipe(
          filter(todo => !!todo),
          switchMap(() => this._entidad.eliminar(this.formulario.value.id)),
          take(1)
        )
        .subscribe(() => this.irAtras())
    );
  }

  imprimir() {
    throw new Error('Method not implemented.');
  }

  irAtras() {
    this._location.back();
  }
  irAlInicio() {
    this._router.navigate(['/definiciones']);
  }

  salir() {
    throw new Error('Method not implemented.');
  }
}
