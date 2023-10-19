import { Correlativo } from '@core/models/definiciones/correlativo';
import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { Subscription } from 'rxjs';
import { BuscadorUnidadAdministrativaComponent } from '../buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorCategoriaUnidadComponent } from '@pages/definiciones/categorias-unidad-administrativa/buscador-categoria-unidad/buscador-categoria-unidad.component';
import { CategoriaUnidadAdministrativa } from '@core/models/definiciones/categoria-unidad-administrativa';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';
import { Responsable } from '@core/models/otros-modulos/responsable';
import { BuscadorUnidadOrganizativaComponent } from '@shared/components/buscador-unidad-organizativa/buscador-unidad-organizativa.component';
import { UnidadOrganizativa } from '@core/models/otros-modulos/unidad-organizativa';

@Component({
  selector: 'app-singular-unidad-administrativa',
  templateUrl: './singular-unidad-administrativa.component.html',
  styleUrls: ['./singular-unidad-administrativa.component.scss'],
})
export class SingularUnidadAdministrativaComponent
  implements Entidad, OnDestroy
{
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[28].nombre;
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
      empresaId: [undefined],
      id: [undefined],
      codigo: [undefined],
      denominacion: [undefined, Validators.required],
      categoria: [undefined],
      unidadOrganizativa: [undefined, Validators.required],
      responsable: [undefined],
      creado: [undefined],
      modificado: [undefined],
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
              codigo: entidad.codigo,
              denominacion: entidad.denominacion,
              categoria: entidad.categoria,
              responsable: entidad.responsable,
              unidadOrganizativa: entidad.unidadOrganizativa,
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
          tap((correlativo: Correlativo) => {
            let ser = correlativo.serie.toString().padStart(4, '0');
            let cor = correlativo.correlativo.toString().padStart(8, '0');
            this.formulario.patchValue({
              empresaId: 0,
              id: 0,
              codigo: `${ser}-${cor}`,
              denominacion: '',
              categoria: 0,
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
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          tap((entidad: UnidadAdministrativa) =>
            this.formulario.patchValue({
              denominacion: entidad.denominacion,
              categoria: entidad.categoria,
            })
          )
        )
        .subscribe()
    );
  }

  guardar() {
    let entidad: UnidadAdministrativa = this.formulario.value;
    console.log(entidad);
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
    this.subscripciones.push(
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
        .subscribe(() => this.irAtras())
    );
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
    let dialog = this._dialog.open(BuscadorCategoriaUnidadComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          tap((categoria: CategoriaUnidadAdministrativa) =>
            this.formulario.patchValue({ categoria: categoria.id })
          )
        )
        .subscribe()
    );
  }

  buscarResponsable() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          tap((responsable: Responsable) =>
            this.formulario.patchValue({ responsable: responsable.id })
          )
        )
        .subscribe()
    );
  }

  buscarUnidadOrganizativa() {
    let dialog = this._dialog.open(BuscadorUnidadOrganizativaComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          tap((unidadOrganizativa: UnidadOrganizativa) =>
            this.formulario.patchValue({
              unidadOrganizativa: unidadOrganizativa.id,
            })
          )
        )
        .subscribe()
    );
  }
}
