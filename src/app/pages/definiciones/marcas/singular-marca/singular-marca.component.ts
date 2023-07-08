import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from '@core/services/marca.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorMarcaComponent } from '../buscador-marca/buscador-marca.component';
import { Marca } from '@core/models/marca';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorTipoMarcaComponent } from '@pages/definiciones/tipos-marca/buscador-tipo-marca/buscador-tipo-marca.component';
import { TipoMarcaService } from '@core/services/tipo-marca.service';
import { Entidad } from '@core/models/auxiliares/entidad';
import { TipoMarca } from '@core/models/tipo-marca';
import { CorrelativoService } from '@core/services/correlativo.service';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { TIPOS_MARCA } from '@core/constants/tipos-marca';
import { Basica } from '@core/models/auxiliares/basica';

@Component({
  selector: 'app-singular-marca',
  templateUrl: './singular-marca.component.html',
  styleUrls: ['./singular-marca.component.scss'],
})
export class SingularMarcaComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[10].nombre;
  formulario: FormGroup;
  tiposMarca = TIPOS_MARCA;

  constructor(
    private _entidad: MarcaService,
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
      codigo: ['autogenerado'],
      denominacion: ['', Validators.required],
      tipo: [0],
      creado: [new Date()],
      modificado: [new Date()],
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
    } else {
      this._correlativo
        .buscarPorId(CORRELATIVOS.find(c => c.nombre === this.titulo).id)
        .pipe(
          take(1),
          tap(categoria =>
            this.formulario.patchValue({
              codigo:
                categoria.serie.toString().padStart(4, '0') +
                '-' +
                categoria.correlativo.toString().padStart(8, '0'),
            })
          )
        )
        .subscribe();
    }
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
            denominacion: entidad.denominacion,
            tipo: entidad.tipo,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let entidad: Marca = this.formulario.value;
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

  buscarTipoMarca() {
    let dialog = this._dialog.open(BuscadorTipoMarcaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .beforeClosed()
      .pipe(
        tap((tipoMarca: TipoMarca) =>
          this.formulario.patchValue({ tipo: tipoMarca.id })
        )
      )
      .subscribe();
  }

  buscarTipo() {
    let dialog = this._dialog.open(BuscadorTipoMarcaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Basica) =>
          this.formulario.patchValue({ tipo: entidad.id })
        )
      )
      .subscribe();
  }
}
