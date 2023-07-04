import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadAdministrativaService } from '@core/services/unidad-administrativa.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorUnidadAdministrativaComponent } from '../buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { UnidadAdministrativa } from '@core/models/unidad-administrativa';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorCategoriaUnidadAdministrativaComponent } from '@pages/definiciones/categorias-unidad-administrativa/buscador-categoria-unidad-administrativa/buscador-categoria-unidad-administrativa.component';
import { Entidad } from '@core/models/entidad';
import { CorrelativoService } from '@core/services/correlativo.service';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Categoria } from '@core/models/categoria';

@Component({
  selector: 'app-singular-unidad-administrativa',
  templateUrl: './singular-unidad-administrativa.component.html',
  styleUrls: ['./singular-unidad-administrativa.component.scss'],
})
export class SingularUnidadAdministrativaComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[23].nombre;
  formulario: FormGroup;

  constructor(
    private _entidad: UnidadAdministrativaService,
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
      categoria: [0],
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
              categoria: entidad.categoria,
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
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        take(1),
        tap((entidad: UnidadAdministrativa) => {
          this.formulario.patchValue({
            denominacion: entidad.denominacion,
            categoria: entidad.categoria,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let entidad: UnidadAdministrativa = this.formulario.value;
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

  buscarCategoria() {
    let dialog = this._dialog.open(
      BuscadorCategoriaUnidadAdministrativaComponent,
      {
        width: '85%',
        height: '95%',
      }
    );
    dialog
      .afterClosed()
      .pipe(
        take(1),
        tap((categoria: Categoria) =>
          this.formulario.patchValue({ categoria: categoria.id })
        )
      )
      .subscribe();
  }
}
