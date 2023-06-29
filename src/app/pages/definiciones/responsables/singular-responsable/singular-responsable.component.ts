import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsableService } from '@core/services/responsable.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorResponsableComponent } from '../buscador-responsable/buscador-responsable.component';
import { Responsable } from '@core/models/responsable';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { Entidad } from '@core/models/entidad';
import { CorrelativoService } from '@core/services/correlativo.service';
import { Subscription } from 'rxjs';
import { CORRELATIVOS } from '@core/constants/correlativos';

@Component({
  selector: 'app-singular-responsable',
  templateUrl: './singular-responsable.component.html',
  styleUrls: ['./singular-responsable.component.scss'],
})
export class SingularResponsableComponent implements Entidad, OnDestroy {
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'Responsable';
  formulario: FormGroup;

  tipos = ['Tipo 1', 'Tipo 2', 'Tipo 3'];
  cargos = ['Cargo 1', 'Cargo 2', 'Cargo 3'];

  constructor(
    private _entidad: ResponsableService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService
  ) {
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
      creado: [new Date()],
      modificado: [new Date()],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
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
  }

  importar() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((entidad: Responsable) => {
            this.formulario.patchValue({
              tipo: entidad.tipo,
              nombreCompleto: entidad.nombreCompleto,
              cargo: entidad.cargo,
              telefonos: entidad.telefonos,
              direccion: entidad.direccion,
              correoElectronico: entidad.correoElectronico,
            });
          })
        )
        .subscribe()
    );
  }

  guardar() {
    let entidad: Responsable = this.formulario.value;
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad)
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._entidad
        .actualizar(this.id, entidad)
        .pipe(first())
        .subscribe(() => this.irAtras());
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
}
