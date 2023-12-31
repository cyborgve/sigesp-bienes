import { TipoAnimal } from '@core/models/definiciones/tipo-animal';
import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RazaService } from '@core/services/definiciones/raza.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorRazaComponent } from '../buscador-raza/buscador-raza.component';
import { Raza } from '@core/models/definiciones/raza';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { BuscadorTipoAnimalComponent } from '@pages/definiciones/tipos-animal/buscador-tipo-animal/buscador-tipo-animal.component';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-singular-raza',
  templateUrl: './singular-raza.component.html',
  styleUrls: ['./singular-raza.component.scss'],
})
export class SingularRazaComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[16].nombre;
  formulario: FormGroup;

  constructor(
    private _entidad: RazaService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      codigo: [undefined],
      tipoAnimalId: [undefined],
      denominacion: [undefined, Validators.required],
      creado: [undefined],
      modificado: [undefined],
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
              tipoAnimalId: entidad.tipoAnimalId,
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
            this.formulario.patchValue({
              empresaId: 0,
              id: 0,
              codigo: `${ser}-${cor}`,
              tipoAnimalId: 0,
              denominacion: '',
              creado: new Date(),
              modificado: new Date(),
            });
          }),
          take(1)
        )
        .subscribe();
    }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorRazaComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((entidad: Raza) =>
          this.formulario.patchValue({
            tipoAnimalId: entidad.tipoAnimalId,
            denominacion: entidad.denominacion,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad: Raza = this.formulario.value;
    entidad.modificado = new Date();
    if (this.modoFormulario === 'CREANDO') {
      entidad.creado = new Date();
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

  buscarTipoAnimal() {
    let dialog = this._dialog.open(BuscadorTipoAnimalComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.tipoAnimalId),
        tap((tipoAnimal: TipoAnimal) =>
          this.formulario.patchValue({ tipoAnimalId: tipoAnimal.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
