import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Component, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CausaMovimientoService } from '@core/services/definiciones/causa-movimiento.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorCausaMovimientoComponent } from '../buscador-causa-movimiento/buscador-causa-movimiento.component';
import { CausaMovimiento } from '@core/models/definiciones/causa-movimiento';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { Location } from '@angular/common';
import { TIPOS_CAUSA_MOVIMIENTO } from '@core/constants/tipos-causa-movimiento';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { Subscription } from 'rxjs';
import { adaptarCausaMovimiento } from '@core/utils/pipes-rxjs/adaptadores/adaptar-causa-movimiento';

@Component({
  selector: 'app-singular-causa-movimiento',
  templateUrl: './singular-causa-movimiento.component.html',
  styleUrls: ['./singular-causa-movimiento.component.scss'],
})
export class SingularCausaMovimientoComponent implements Entidad, OnDestroy {
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[6].nombre;
  formulario: UntypedFormGroup;
  tiposCausaMovimiento = TIPOS_CAUSA_MOVIMIENTO;

  constructor(
    private _entidad: CausaMovimientoService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: UntypedFormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      codigo: [undefined],
      denominacion: [undefined, Validators.required],
      tipo: [undefined],
      estAfectacionContable: [undefined],
      estAfectacionPresupuestaria: [undefined],
      creado: [undefined],
      modificado: [undefined],
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
          adaptarCausaMovimiento(),
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
          tap(correlativo => {
            let ser = correlativo.serie.toString().padStart(4, '0');
            let cor = correlativo.correlativo.toString().padStart(8, '0');
            this.formulario.patchValue({
              empresaId: 0,
              id: 0,
              codigo: `${ser}-${cor}`,
              denominacion: '',
              tipo: '',
              estAfectacionContable: 0,
              estAfectacionPresupuestaria: 0,
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
    let dialog = this._dialog.open(BuscadorCausaMovimientoComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          tap((entidad: CausaMovimiento) =>
            this.formulario.patchValue({
              denominacion: entidad.denominacion,
              tipo: entidad.tipo,
              estAfectacionContable: entidad.estAfectacionContable,
              estAfectacionPresupuestaria: entidad.estAfectacionPresupuestaria,
            })
          )
        )
        .subscribe()
    );
  }

  guardar() {
    let entidad: CausaMovimiento = this.formulario.value;
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
    this.subscripciones.push(
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
