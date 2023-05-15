import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractEntidadFunciones } from '@core/class/abstract-entidad-funciones';
import { ActivoComponenteService } from '@core/services/activo-componente.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorActivoComponenteComponent } from '../buscador-activo-componente/buscador-activo-componente.component';
import { ActivoComponente } from '@core/models/activo-componente';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-singular-activo-componente',
  templateUrl: './singular-activo-componente.component.html',
  styleUrls: ['./singular-activo-componente.component.scss'],
})
export class SingularActivoComponenteComponent extends AbstractEntidadFunciones {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'activo componente';
  formulario: FormGroup;
  constructor(
    private _entidad: ActivoComponenteService,
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
              marcaId: [entidad.marcaId, Validators.required],
              modeloId: [entidad.modeloId, Validators.required],
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
        marcaId: ['', Validators.required],
        modeloId: ['', Validators.required],
        creado: [''],
        modificado: [''],
      });
    }
  }

  buscar() {
    let dialog = this._dialog.open(BuscadorActivoComponenteComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((activoComponente: ActivoComponente) => {
          this.formulario.patchValue({
            empresaId: activoComponente.empresaId,
            id: activoComponente.id,
            codigo: activoComponente.creado,
            denominacion: activoComponente.denominacion,
            tipo: activoComponente.tipo,
            marcaId: activoComponente.marcaId,
            modeloId: activoComponente.modeloId,
            creado: activoComponente.creado,
            modificado: activoComponente.modificado,
          });
        })
      )
      .subscribe();
  }

  importar() {
    let dialog = this._dialog.open(BuscadorActivoComponenteComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((activoComponente: ActivoComponente) => {
          this.formulario.patchValue({
            empresaId: activoComponente.empresaId,
            id: activoComponente.id,
            denominacion: activoComponente.denominacion,
            tipo: activoComponente.tipo,
            marcaId: activoComponente.marcaId,
            modeloId: activoComponente.modeloId,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let activoComponente: ActivoComponente = this.formulario.value;
    activoComponente.modificado = new Date();
    if (this.modoFormulario === 'CREANDO') {
      activoComponente.creado = new Date();
      this._entidad.guardar(activoComponente).pipe(first()).subscribe();
    } else {
      this._entidad
        .actualizar(this.id, activoComponente)
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

  buscarTipo() {
    throw new Error('Method not implemented.');
  }
  buscarMarca() {
    throw new Error('Method not implemented.');
  }
  buscarModelo() {
    throw new Error('Method not implemented.');
  }
}
