import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractEntidadFunciones } from '@core/class/abstract-entidad-funciones';
import { ConservacionService } from '@core/services/conservacion.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorEstadoConservacionComponent } from '../buscador-estado-conservacion/buscador-estado-conservacion.component';
import { Conservacion } from '@core/models/conservacion';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-singular-estado-conservacion',
  templateUrl: './singular-estado-conservacion.component.html',
  styleUrls: ['./singular-estado-conservacion.component.scss'],
})
export class SingularEstadoConservacionComponent extends AbstractEntidadFunciones {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'Estado de Conservacion';
  formulario: FormGroup;

  constructor(
    private _entidad: ConservacionService,
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
        creado: [''],
        modificado: [''],
      });
    }
  }

  buscar() {
    let dialog = this._dialog.open(BuscadorEstadoConservacionComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((condicionCompra: Conservacion) => {
          this.formulario.patchValue({
            empresaId: condicionCompra.empresaId,
            id: condicionCompra.id,
            codigo: condicionCompra.creado,
            denominacion: condicionCompra.denominacion,
            creado: condicionCompra.creado,
            modificado: condicionCompra.modificado,
          });
        })
      )
      .subscribe();
  }

  importar() {
    let dialog = this._dialog.open(BuscadorEstadoConservacionComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((condicionCompra: Conservacion) => {
          this.formulario.patchValue({
            empresaId: condicionCompra.empresaId,
            id: condicionCompra.id,
            denominacion: condicionCompra.denominacion,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let condicionCompra: Conservacion = this.formulario.value;
    condicionCompra.modificado = new Date();
    if (this.modoFormulario === 'CREANDO') {
      condicionCompra.creado = new Date();
      this._entidad.guardar(condicionCompra).pipe(first()).subscribe();
    } else {
      this._entidad
        .actualizar(this.id, condicionCompra)
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
    this._router.navigate(['/definiciones']);
  }

  salir() {
    throw new Error('Method not implemented.');
  }
}
