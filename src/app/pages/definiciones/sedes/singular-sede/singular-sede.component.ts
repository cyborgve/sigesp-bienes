import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractEntidadFunciones } from '@core/class/abstract-entidad-funciones';
import { SedeService } from '@core/services/sede.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorSedeComponent } from '../buscador-sede/buscador-sede.component';
import { Sede } from '@core/models/sede';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorTipoSedeComponent } from '@pages/definiciones/tipos-sede/buscador-tipo-sede/buscador-tipo-sede.component';

@Component({
  selector: 'app-singular-sede',
  templateUrl: './singular-sede.component.html',
  styleUrls: ['./singular-sede.component.scss'],
})
export class SingularSedeComponent extends AbstractEntidadFunciones {
  modoFormulario: ModoFormulario = 'CREANDO';

  id: Id;
  titulo = 'sede';
  formulario: FormGroup;
  tipos = ['Tipo 1', 'Tipo 2', 'Tipo 3'];
  localizaciones = ['Nacional', 'Internacional'];

  constructor(
    private _entidad: SedeService,
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
              localizacion: [entidad.localizacion, Validators.required],
              paisId: [entidad.paisId, Validators.required],
              estadoId: [entidad.estadoId, Validators.required],
              municipioId: [entidad.municipioId, Validators.required],
              parroquiaId: [entidad.parroquiaId, Validators.required],
              ciudadId: [entidad.ciudadId, Validators.required],
              urbanizacion: [entidad.urbanizacion, Validators.required],
              calleAvenida: [entidad.calleAvenida, Validators.required],
              casaEdificio: [entidad.casaEdificio, Validators.required],
              piso: [entidad.piso, Validators.required],
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
        localizacion: ['', Validators.required],
        paisId: ['', Validators.required],
        estadoId: ['', Validators.required],
        municipioId: ['', Validators.required],
        parroquiaId: ['', Validators.required],
        ciudadId: ['', Validators.required],
        urbanizacion: ['', Validators.required],
        calleAvenida: ['', Validators.required],
        casaEdificio: ['', Validators.required],
        piso: ['', Validators.required],
        creado: [''],
        modificado: [''],
      });
    }
  }

  buscar() {
    let dialog = this._dialog.open(BuscadorSedeComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Sede) => {
          this.formulario.patchValue({
            empresaId: entidad.empresaId,
            id: entidad.id,
            codigo: entidad.creado,
            denominacion: entidad.denominacion,
            tipo: entidad.tipo,
            localizacion: entidad.localizacion,
            paisId: entidad.paisId,
            estadoId: entidad.estadoId,
            municipioId: entidad.municipioId,
            parroquiaId: entidad.parroquiaId,
            ciudadId: entidad.ciudadId,
            urbanizacion: entidad.urbanizacion,
            calleAvenida: entidad.calleAvenida,
            casaEdificio: entidad.casaEdificio,
            piso: entidad.piso,
            creado: entidad.creado,
            modificado: entidad.modificado,
          });
        })
      )
      .subscribe();
  }

  importar() {
    let dialog = this._dialog.open(BuscadorSedeComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Sede) => {
          this.formulario.patchValue({
            denominacion: entidad.denominacion,
            tipo: entidad.tipo,
            localizacion: entidad.localizacion,
            paisId: entidad.paisId,
            estadoId: entidad.estadoId,
            municipioId: entidad.municipioId,
            parroquiaId: entidad.parroquiaId,
            ciudadId: entidad.ciudadId,
            urbanizacion: entidad.urbanizacion,
            calleAvenida: entidad.calleAvenida,
            casaEdificio: entidad.casaEdificio,
            piso: entidad.piso,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let entidad: Sede = this.formulario.value;
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

  buscarPais() {
    throw new Error('Method not implemented.');
  }

  buscarEstado() {
    throw new Error('Method not implemented.');
  }

  buscarMunicipio() {
    throw new Error('Method not implemented.');
  }

  buscarParroquia() {
    throw new Error('Method not implemented.');
  }

  buscarCiudad() {
    throw new Error('Method not implemented.');
  }

  buscarTipoSede() {
    let dialog = this._dialog.open(BuscadorTipoSedeComponent, {
      width: '85%',
      height: '95%',
    });
  }
}
