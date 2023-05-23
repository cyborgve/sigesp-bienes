import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractEntidadFunciones } from '@core/class/abstract-entidad-funciones';
import { MarcaService } from '@core/services/marca.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorMarcaComponent } from '../buscador-marca/buscador-marca.component';
import { Marca } from '@core/models/marca';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorTipoMarcaComponent } from '@pages/definiciones/tipos-marca/buscador-tipo-marca/buscador-tipo-marca.component';

@Component({
  selector: 'app-singular-marca',
  templateUrl: './singular-marca.component.html',
  styleUrls: ['./singular-marca.component.scss'],
})
export class SingularMarcaComponent extends AbstractEntidadFunciones {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'marca';
  formulario: FormGroup;
  tiposMarca: string[] = ['tipo 1', 'tipo 2', 'tipo 3'];

  constructor(
    private _entidad: MarcaService,
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
        creado: [''],
        modificado: [''],
      });
    }
  }

  buscar() {
    let dialog = this._dialog.open(BuscadorMarcaComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Marca) => {
          this.formulario.patchValue({
            empresaId: entidad.empresaId,
            id: entidad.id,
            codigo: entidad.creado,
            creado: entidad.creado,
            denominacion: entidad.denominacion,
            tipo: entidad.tipo,
            modificado: entidad.modificado,
          });
        })
      )
      .subscribe();
  }

  importar() {
    let dialog = this._dialog.open(BuscadorMarcaComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Marca) => {
          this.formulario.patchValue({
            empresaId: entidad.empresaId,
            id: entidad.id,
            denominacion: entidad.denominacion,
            tipo: entidad.tipo,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let entidad: Marca = this.formulario.value;
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

  buscarTipoMarca() {
    let dialog = this._dialog.open(BuscadorTipoMarcaComponent, {
      width: '85%',
      height: '95%',
    });
  }
}
