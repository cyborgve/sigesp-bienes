import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractEntidadFunciones } from '@core/class/abstract-entidad-funciones';
import { ResponsableService } from '@core/services/responsable.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorResponsableComponent } from '../buscador-responsable/buscador-responsable.component';
import { Responsable } from '@core/models/responsable';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-singular-responsable',
  templateUrl: './singular-responsable.component.html',
  styleUrls: ['./singular-responsable.component.scss'],
})
export class SingularResponsableComponent extends AbstractEntidadFunciones {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'responsable';
  formulario: FormGroup;

  tipos = ['Tipo 1', 'Tipo 2', 'Tipo 3'];
  cargos = ['Cargo 1', 'Cargo 2', 'Cargo 3'];

  constructor(
    private _entidad: ResponsableService,
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
              tipo: [entidad.tipo, Validators.required],
              numeroCedula: [entidad.numeroCedula, Validators.required],
              nombreCompleto: [entidad.nombreCompleto, Validators.required],
              cargo: [entidad.cargo, Validators.required],
              telefonos: [entidad.telefonos, Validators.required],
              direccion: [entidad.direccion, Validators.required],
              correoElectronico: [
                entidad.correoElectronico,
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
        tipo: ['', Validators.required],
        numeroCedula: ['', Validators.required],
        nombreCompleto: ['', Validators.required],
        cargo: ['', Validators.required],
        telefonos: ['', Validators.required],
        direccion: ['', Validators.required],
        correoElectronico: ['', Validators.required],
        creado: [''],
        modificado: [''],
      });
    }
  }

  buscar() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Responsable) => {
          this.formulario.patchValue({
            empresaId: entidad.empresaId,
            id: entidad.id,
            tipo: entidad.tipo,
            numeroCedula: entidad.numeroCedula,
            nombreCompleto: entidad.nombreCompleto,
            cargo: entidad.cargo,
            telefonos: entidad.telefonos,
            direccion: entidad.direccion,
            correoElectronico: entidad.correoElectronico,
            creado: entidad.creado,
            modificado: entidad.modificado,
          });
        })
      )
      .subscribe();
  }

  importar() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Responsable) => {
          this.formulario.patchValue({
            tipo: [entidad.tipo, Validators.required],
            nombreCompleto: [entidad.nombreCompleto, Validators.required],
            cargo: [entidad.cargo, Validators.required],
            telefonos: [entidad.telefonos, Validators.required],
            direccion: [entidad.direccion, Validators.required],
            correoElectronico: [entidad.correoElectronico, Validators.required],
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let entidad: Responsable = this.formulario.value;
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
        codigo: this.formulario.value.numeroCedula,
        denominacion: this.formulario.value.nombreCompleto,
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