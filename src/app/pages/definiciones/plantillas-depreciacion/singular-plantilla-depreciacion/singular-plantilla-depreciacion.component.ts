import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Entidad } from '@core/models/entidad';
import { PlantillaDepreciacionService } from '@core/services/plantilla-depreciacion.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorPlantillaDepreciacionComponent } from '../buscador-plantilla-depreciacion/buscador-plantilla-depreciacion.component';
import { PlantillaDepreciacion } from '@core/models/plantilla-depreciacion';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';
import { Subscription } from 'rxjs';
import { BuscadorCuentaContableComponent } from '@shared/components/buscador-cuenta-contable/buscador-cuenta-contable.component';
import { CuentaContable } from '@core/types/cuenta-contable';

@Component({
  selector: 'app-singular-plantilla-depreciacion',
  templateUrl: './singular-plantilla-depreciacion.component.html',
  styleUrls: ['./singular-plantilla-depreciacion.component.scss'],
})
export class SingularPlantillaDepreciacionComponent
  implements Entidad, OnDestroy
{
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'plantilla depreciación';
  formulario: FormGroup;
  metodosDepreciacion = METODOS_DEPRECIACION;

  constructor(
    private _entidad: PlantillaDepreciacionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog
  ) {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.formulario = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      codigo: ['', Validators.required],
      denominacion: ['', Validators.required],
      metodoDepreciacion: ['', Validators.required],
      cuentaContableGasto: ['', Validators.required],
      cuentaContableDepreciacion: ['', Validators.required],
      vidaUtil: ['', Validators.required],
      creado: [''],
      modificado: [''],
    });
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
            this.formulario.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              codigo: entidad.codigo,
              denominacion: entidad.denominacion,
              metodoDepreciacion: entidad.denominacion,
              cuentaContableGasto: entidad.denominacion,
              cuentaContableDepreciacion: entidad.denominacion,
              vidaUtil: entidad.denominacion,
              creado: entidad.creado,
              modificado: entidad.modificado,
            });
          })
        )
        .subscribe();
    }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorPlantillaDepreciacionComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((entidad: PlantillaDepreciacion) => {
            this.formulario.patchValue({
              denominacion: entidad.denominacion,
              metodoDepreciacion: entidad.denominacion,
              cuentaContableGasto: entidad.denominacion,
              cuentaContableDepreciacion: entidad.denominacion,
              vidaUtil: entidad.denominacion,
            });
          })
        )
        .subscribe()
    );
  }

  guardar() {
    let entidad: PlantillaDepreciacion = this.formulario.value;
    entidad.modificado = new Date();
    if (this.modoFormulario === 'CREANDO') {
      entidad.creado = new Date();
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

  buscarCuentaContableGasto() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((cc: CuentaContable) =>
            this.formulario.patchValue({
              cuentaContableGasto: cc.cuenta,
            })
          )
        )
        .subscribe()
    );
  }

  buscarCuentaContableDepreciacion() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((cc: CuentaContable) =>
            this.formulario.patchValue({
              cuentaContableDepreciacion: cc.cuenta,
            })
          )
        )
        .subscribe()
    );
  }
}
