import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractEntidadFunciones } from '@core/class/abstract-entidad-funciones';
import { CondicionCompraService } from '@core/services/condicion-compra.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorCondicionCompraComponent } from '../buscador-condicion-compra/buscador-condicion-compra.component';
import { CondicionCompra } from '@core/models/condicion-compra';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-singular-condicion-compra',
  templateUrl: './singular-condicion-compra.component.html',
  styleUrls: ['./singular-condicion-compra.component.scss'],
})
export class SingularCondicionCompraComponent extends AbstractEntidadFunciones {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'condicion de compra';
  formulario: FormGroup;

  constructor(
    private _entidad: CondicionCompraService,
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
              explicacion: [entidad.explicacion],
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
        explicacion: [''],
        creado: [''],
        modificado: [''],
      });
    }
  }

  buscar() {
    let dialog = this._dialog.open(BuscadorCondicionCompraComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((condicionCompra: CondicionCompra) => {
          this.formulario.patchValue({
            empresaId: condicionCompra.empresaId,
            id: condicionCompra.id,
            codigo: condicionCompra.creado,
            denominacion: condicionCompra.denominacion,
            explicacion: condicionCompra.explicacion,
            creado: condicionCompra.creado,
            modificado: condicionCompra.modificado,
          });
        })
      )
      .subscribe();
  }

  importar() {
    let dialog = this._dialog.open(BuscadorCondicionCompraComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((condicionCompra: CondicionCompra) => {
          this.formulario.patchValue({
            empresaId: condicionCompra.empresaId,
            id: condicionCompra.id,
            denominacion: condicionCompra.denominacion,
            explicacion: condicionCompra.explicacion,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let condicionCompra: CondicionCompra = this.formulario.value;
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
