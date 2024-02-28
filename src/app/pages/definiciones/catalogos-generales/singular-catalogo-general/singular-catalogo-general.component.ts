import { take, tap, first, filter, switchMap, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CatalogoGeneralService } from '@core/services/definiciones/catalogo-general.service';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { Subscription, pipe } from 'rxjs';
import { BuscadorCatalogoGeneralComponent } from '../buscador-catalogo-general/buscador-catalogo-general.component';
import { CatalogoGeneral } from '@core/models/definiciones/catalogo-general';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { ESTADOS_MOVIMIENTO_CATALOGO } from '@core/constants/estado-movimiento-catalogo';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-singular-catalogo-general',
  templateUrl: './singular-catalogo-general.component.html',
  styleUrls: ['./singular-catalogo-general.component.scss'],
})
export class SingularCatalogoGeneralComponent implements Entidad, OnDestroy {
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[3].nombre;
  formulario: UntypedFormGroup;
  estadosMovimiento = ESTADOS_MOVIMIENTO_CATALOGO;
  deshabilitarCuentaReferencia: boolean;

  constructor(
    private _entidad: CatalogoGeneralService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: UntypedFormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService
  ) {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      codigo: [undefined],
      denominacion: [undefined, Validators.required],
      catalogoCuentas: [undefined, Validators.required],
      cuentaReferencia: [undefined],
      estadoMovimiento: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });
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
              catalogoCuentas: entidad.catalogoCuentas,
              cuentaReferencia: entidad.cuentaReferencia,
              estadoMovimiento: entidad.estadoMovimiento,
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
              empresaId: 0,
              id: 0,
              codigo: `${ser}-${cor}`,
              denominacion: '',
              catalogoCuentas: '',
              cuentaReferencia: 0,
              estadoMovimiento: '',
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
    let dialog = this._dialog.open(BuscadorCatalogoGeneralComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          tap((entidad: CatalogoGeneral) => {
            this.formulario.patchValue({
              denominacion: entidad.denominacion,
              catalogoCuentas: entidad.catalogoCuentas,
              cuentaReferencia: entidad.cuentaReferencia,
              estadoMovimiento: entidad.estadoMovimiento,
            });
          })
        )
        .subscribe()
    );
  }

  guardar() {
    let entidad: CatalogoGeneral = this.formulario.value;
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
          )
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

  buscarCuentaReferencia() {
    const filtroCuentas = () =>
      pipe(
        map((catalogos: CatalogoGeneral[]) =>
          catalogos.filter(catalogo => catalogo.estadoMovimiento === 'S')
        )
      );
    let dialog = this._dialog.open(BuscadorCatalogoGeneralComponent, {
      height: '95%',
      width: '85%',
      data: { filtros: [filtroCuentas()] },
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.cuentaReferencia),
          tap((catalogoGeneral: CatalogoGeneral) => {
            if (catalogoGeneral) {
              this.formulario.patchValue({
                cuentaReferencia: catalogoGeneral.id,
              });
            }
          })
        )
        .subscribe()
    );
  }

  reiniciarBuscarCuentaReferencia() {
    this.formulario.patchValue({ cuentaReferencia: 0 });
  }
}
