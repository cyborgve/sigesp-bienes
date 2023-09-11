import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Entidad } from '@core/models/auxiliares/entidad';
import { RotulacionService } from '@core/services/definiciones/rotulacion.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';
import { BuscadorRotulacionComponent } from '../buscador-rotulacion/buscador-rotulacion.component';
import { Rotulacion } from '@core/models/definiciones/rotulacion';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { CORRELATIVOS } from '@core/constants/correlativos';

@Component({
  selector: 'app-singular-rotulacion',
  templateUrl: './singular-rotulacion.component.html',
  styleUrls: ['./singular-rotulacion.component.scss'],
})
export class SingularRotulacionComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[17].nombre;
  formulario: FormGroup;
  constructor(
    private _entidad: RotulacionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService
  ) {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.formulario = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      codigo: ['autogenerado'],
      denominacion: ['', Validators.required],
      creado: [new Date()],
      modificado: [new Date()],
    });
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
              creado: entidad.creado,
              modificado: entidad.modificado,
            });
          })
        )
        .subscribe();
    } else {
      this._correlativo
        .buscarPorId(CORRELATIVOS.find(c => c.nombre === this.titulo).id)
        .pipe(
          tap(correlativo => {
            let ser = correlativo.serie.toString().padStart(4, '0');
            let cor = correlativo.correlativo.toString().padStart(8, '0');
            return this.formulario.patchValue({
              codigo: `${ser}-${cor}`,
            });
          }),
          take(1)
        )
        .subscribe();
    }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorRotulacionComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Rotulacion) =>
          entidad
            ? this.formulario.patchValue({
                codigo: entidad.denominacion,
              })
            : undefined
        )
      )
      .subscribe();
  }

  guardar() {
    let entidad: Rotulacion = this.formulario.value;
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad, this.titulo.toUpperCase())
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._entidad
        .actualizar(this.id, entidad, this.titulo.toUpperCase())
        .pipe(first())
        .subscribe(() => this.irAtras());
    }
  }

  borrar() {
    let dialog = this._dialog.open(DialogoEliminarDefinicionComponent, {
      data: {
        codigo: this.formulario.value.codigo,
        denominacion: this.formulario.value.denominacion,
      },
    });
    dialog
      .beforeClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() =>
          this._entidad.eliminar(
            this.formulario.value.id,
            this.titulo.toUpperCase()
          )
        ),
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
