import { take, tap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AbstractToolbarFunciones } from '@core/class/abstract-toolbar-funciones';
import { CategoriaUnidadAdministrativaService } from '@core/services/categoria-unidad-administrativa.service';
import { Id } from '@core/types/id';

@Component({
  selector: 'app-singular-categoria-unidad-administrativa',
  templateUrl: './singular-categoria-unidad-administrativa.component.html',
  styleUrls: ['./singular-categoria-unidad-administrativa.component.scss'],
})
export class SingularCategoriaUnidadAdministrativaComponent extends AbstractToolbarFunciones {
  titulo = 'categoria unidad administrativa';
  private id: Id;
  formulario: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _entidad: CategoriaUnidadAdministrativaService
  ) {
    super();
    this.id = this._activatedRoute.snapshot.params.id;
    this.actualizarFormulario();
  }

  private actualizarFormulario() {
    if (this.id) {
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

  crear() {
    throw new Error('Method not implemented.');
  }

  guardar() {
    throw new Error('Method not implemented.');
  }

  borrar() {
    throw new Error('Method not implemented.');
  }

  buscar() {
    throw new Error('Method not implemented.');
  }

  imprimir() {
    throw new Error('Method not implemented.');
  }

  salir() {
    throw new Error('Method not implemented.');
  }
}
