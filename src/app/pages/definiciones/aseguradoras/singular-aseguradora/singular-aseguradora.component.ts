import { take, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractSingularFunciones } from '@core/class/abstract-singular-funciones';
import { Aseguradora } from '@core/models/aseguradora';
import { AseguradoraService } from '@core/services/aseguradora.service';
import { Id } from '@core/types/id';

@Component({
  selector: 'app-singular-aseguradora',
  templateUrl: './singular-aseguradora.component.html',
  styleUrls: ['./singular-aseguradora.component.scss'],
})
export class SingularAseguradoraComponent extends AbstractSingularFunciones<Aseguradora> {
  id: Id;
  titulo = 'aseguradora';
  formulario: FormGroup;
  constructor(
    private entidad: AseguradoraService,
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
      this.entidad
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
    throw new Error('Method not implemented.');
  }
  importar() {
    throw new Error('Method not implemented.');
  }
  guardar() {
    throw new Error('Method not implemented.');
  }
  eliminar() {
    throw new Error('Method not implemented.');
  }
  irAtras() {
    this._location.back();
  }
  irAlInicio() {
    this._router.navigate(['/']);
  }
}
