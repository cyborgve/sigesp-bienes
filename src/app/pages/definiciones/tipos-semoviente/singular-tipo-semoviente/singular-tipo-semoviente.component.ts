import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractEntidadFunciones } from '@core/class/abstract-entidad-funciones';
import { TipoSemovienteService } from '@core/services/tipo-semoviente.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorTipoSemovienteComponent } from '../buscador-tipo-semoviente/buscador-tipo-semoviente.component';
import { TipoSemoviente } from '@core/models/tipo-semoviente';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-singular-tipo-semoviente',
  templateUrl: './singular-tipo-semoviente.component.html',
  styleUrls: ['./singular-tipo-semoviente.component.scss'],
})
export class SingularTipoSemovienteComponent extends AbstractEntidadFunciones {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'tipo de semoviente';
  formulario: FormGroup;

  constructor(
    private _entidad: TipoSemovienteService,
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
    let dialog = this._dialog.open(BuscadorTipoSemovienteComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: TipoSemoviente) => {
          this.formulario.patchValue({
            empresaId: entidad.empresaId,
            id: entidad.id,
            codigo: entidad.creado,
            denominacion: entidad.denominacion,
            creado: entidad.creado,
            modificado: entidad.modificado,
          });
        })
      )
      .subscribe();
  }

  importar() {
    let dialog = this._dialog.open(BuscadorTipoSemovienteComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: TipoSemoviente) => {
          this.formulario.patchValue({
            empresaId: entidad.empresaId,
            id: entidad.id,
            denominacion: entidad.denominacion,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let entidad: TipoSemoviente = this.formulario.value;
    entidad.modificado = new Date();
    if (this.modoFormulario === 'CREANDO') {
      entidad.creado = new Date();
      this._entidad.guardar(entidad).pipe(first()).subscribe();
    } else {
      this._entidad.actualizar(this.id, entidad).pipe(first()).subscribe();
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