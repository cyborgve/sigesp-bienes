import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractEntidadFunciones } from '@core/class/abstract-entidad-funciones';
import { UnidadAdministrativaService } from '@core/services/unidad-administrativa.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorUnidadAdministrativaComponent } from '../buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { UnidadAdministrativa } from '@core/models/unidad-administrativa';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorCategoriaComponent } from '@pages/definiciones/categorias/buscador-categoria/buscador-categoria.component';
import { BuscadorCategoriaUnidadAdministrativaComponent } from '@pages/definiciones/categorias-unidad-administrativa/buscador-categoria-unidad-administrativa/buscador-categoria-unidad-administrativa.component';

@Component({
  selector: 'app-singular-unidad-administrativa',
  templateUrl: './singular-unidad-administrativa.component.html',
  styleUrls: ['./singular-unidad-administrativa.component.scss'],
})
export class SingularUnidadAdministrativaComponent extends AbstractEntidadFunciones {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'Unidad Administrativa';
  formulario: FormGroup;

  constructor(
    private _entidad: UnidadAdministrativaService,
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
              categoriaId: [entidad.categoriaId, Validators.required],
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
        categoriaId: ['', Validators.required],
        creado: [''],
        modificado: [''],
      });
    }
  }

  buscar() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: UnidadAdministrativa) => {
          this.formulario.patchValue({
            empresaId: entidad.empresaId,
            id: entidad.id,
            codigo: entidad.creado,
            denominacion: entidad.denominacion,
            categoriaId: entidad.categoriaId,
            creado: entidad.creado,
            modificado: entidad.modificado,
          });
        })
      )
      .subscribe();
  }

  importar() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: UnidadAdministrativa) => {
          this.formulario.patchValue({
            empresaId: entidad.empresaId,
            id: entidad.id,
            denominacion: entidad.denominacion,
            categoriaId: entidad.categoriaId,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let entidad: UnidadAdministrativa = this.formulario.value;
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

  buscarCategoria() {
    let dialog = this._dialog.open(
      BuscadorCategoriaUnidadAdministrativaComponent,
      {
        width: '85%',
        height: '95%',
      }
    );
  }
}
