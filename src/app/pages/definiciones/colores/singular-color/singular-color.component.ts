import { take, tap, filter, switchMap, first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractEntidadFunciones } from '@core/class/abstract-entidad-funciones';
import { ColorService } from '@core/services/color.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorColorComponent } from '../buscador-color/buscador-color.component';
import { Color } from '@core/models/color';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-singular-color',
  templateUrl: './singular-color.component.html',
  styleUrls: ['./singular-color.component.scss'],
})
export class SingularColorComponent extends AbstractEntidadFunciones {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'color';
  formulario: FormGroup;

  constructor(
    private _entidad: ColorService,
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
    let dialog = this._dialog.open(BuscadorColorComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((color: Color) => {
          this.formulario.patchValue({
            empresaId: color.empresaId,
            id: color.id,
            codigo: color.creado,
            denominacion: color.denominacion,
            creado: color.creado,
            modificado: color.modificado,
          });
        })
      )
      .subscribe();
  }

  importar() {
    let dialog = this._dialog.open(BuscadorColorComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((color: Color) => {
          this.formulario.patchValue({
            empresaId: color.empresaId,
            id: color.id,
            denominacion: color.denominacion,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let color: Color = this.formulario.value;
    color.modificado = new Date();
    if (this.modoFormulario === 'CREANDO') {
      color.creado = new Date();
      this._entidad.guardar(color).pipe(first()).subscribe();
    } else {
      this._entidad.actualizar(this.id, color).pipe(first()).subscribe();
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