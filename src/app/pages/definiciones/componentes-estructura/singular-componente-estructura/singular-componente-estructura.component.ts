import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponenteEstructuraService } from '@core/services/componente-estructura.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorComponenteEstructuraComponent } from '../buscador-componente-estructura/buscador-componente-estructura.component';
import { ComponenteEstructura } from '@core/models/componente-estructura';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorTipoEstructuraComponent } from '@pages/definiciones/tipos-estructura/buscador-tipo-estructura/buscador-tipo-estructura.component';
import { Entidad } from '@core/models/entidad';
import { TipoEstructura } from '@core/models/tipo-estructura';

@Component({
  selector: 'app-singular-componente-estructura',
  templateUrl: './singular-componente-estructura.component.html',
  styleUrls: ['./singular-componente-estructura.component.scss'],
})
export class SingularComponenteEstructuraComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'componente de estructura';
  formulario: FormGroup;

  constructor(
    private _entidad: ComponenteEstructuraService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      codigo: ['', Validators.required],
      denominacion: ['', Validators.required],
      tipo: ['', Validators.required],
      creado: [''],
      modificado: [''],
    });
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
            this.formulario.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              codigo: entidad.codigo,
              denominacion: entidad.denominacion,
              tipo: entidad.tipo,
              creado: entidad.creado,
              modificado: entidad.modificado,
            });
          })
        )
        .subscribe();
    }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorComponenteEstructuraComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((componenteEstructura: ComponenteEstructura) => {
          this.formulario.patchValue({
            denominacion: componenteEstructura.denominacion,
            tipo: componenteEstructura.tipo,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let componenteEstructura: ComponenteEstructura = this.formulario.value;
    componenteEstructura.modificado = new Date();
    if (this.modoFormulario === 'CREANDO') {
      componenteEstructura.creado = new Date();
      this._entidad
        .guardar(componenteEstructura)
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._entidad
        .actualizar(this.id, componenteEstructura)
        .pipe(first())
        .subscribe(() => this.irAtras());
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
      .subscribe(() => this.irAtras());
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

  buscarTipo() {
    let dialog = this._dialog.open(BuscadorTipoEstructuraComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((tipo: TipoEstructura) =>
          this.formulario.patchValue({ tipo: tipo.id })
        )
      )
      .subscribe();
  }
}
