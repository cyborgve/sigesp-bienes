import { tap, take, filter, first, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';
import { UNIDADES_MEDIDA } from '@core/constants/unidades-medida';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { Subscription } from 'rxjs';
import { PlantillaIntegracion } from '@core/models/definiciones/plantilla-integracion';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorCuentaContableComponent } from '@shared/components/buscador-cuenta-contable/buscador-cuenta-contable.component';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';
import { BuscadorPlantillaIntegracionComponent } from '../buscador-plantilla-integracion/buscador-plantilla-integracion.component';
import { PlantillaIntegracionService } from '@core/services/definiciones/plantilla-integracion.service';

@Component({
  selector: 'app-singular-plantilla-integracion',
  templateUrl: './singular-plantilla-integracion.component.html',
  styleUrls: ['./singular-plantilla-integracion.component.scss'],
})
export class SingularPlantillaIntegracionComponent
  implements Entidad, OnDestroy
{
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[14].nombre;
  formulario: FormGroup;
  metodosDepreciacion = METODOS_DEPRECIACION;
  unidades = UNIDADES_MEDIDA['TIEMPO'];

  constructor(
    private _entidad: PlantillaIntegracionService,
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
      metodoDepreciacion: [undefined],
      cuentaContableGasto: [undefined],
      cuentaContableDepreciacion: [undefined],
      vidaUtil: [undefined],
      unidadVidaUtil: [undefined],
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
          tap(console.log),
          tap(entidad => {
            this.formulario.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              codigo: entidad.codigo,
              denominacion: entidad.denominacion,
              metodoDepreciacion: entidad.metodoDepreciacion,
              cuentaContableGasto: entidad.cuentaContableGasto,
              cuentaContableDepreciacion: entidad.cuentaContableDepreciacion,
              vidaUtil: entidad.vidaUtil,
              unidadVidaUtil: entidad.unidadVidaUtil,
              creado: entidad.creado,
              modificado: entidad.modificado,
            });
          }),
          take(1)
        )
        .subscribe();
    } else {
      this._correlativo
        .buscarPorId(CORRELATIVOS.find(c => c.nombre === this.titulo).id)
        .pipe(
          tap(correlativo => {
            let ser = correlativo.serie.toString().padStart(4, '0');
            let doc = correlativo.correlativo.toString().padStart(8, '0');
            this.formulario.patchValue({
              empresaId: 0,
              id: 0,
              codigo: `${ser}-${doc}`,
              denominacion: '',
              metodoDepreciacion: '',
              cuentaContableGasto: '---',
              cuentaContableDepreciacion: '---',
              vidaUtil: 0,
              unidadVidaUtil: '',
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
    let dialog = this._dialog.open(BuscadorPlantillaIntegracionComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          tap((entidad: PlantillaIntegracion) =>
            this.formulario.patchValue({
              denominacion: entidad.denominacion,
              metodoDepreciacion: entidad.metodoDepreciacion,
              cuentaContableGasto: entidad.cuentaContableGasto,
              cuentaContableDepreciacion: entidad.cuentaContableDepreciacion,
              vidaUtil: entidad.vidaUtil,
              unidadVidaUtil: entidad.unidadVidaUtil,
            })
          )
        )
        .subscribe()
    );
  }

  guardar() {
    let entidad: PlantillaIntegracion = this.formulario.value;
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

  buscarCuentaContableGasto() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          tap((cc: CuentaContable) =>
            this.formulario.patchValue({
              cuentaContableGasto: cc.id,
            })
          )
        )
        .subscribe()
    );
  }

  buscarCuentaContableDepreciacion() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          tap((cc: CuentaContable) =>
            this.formulario.patchValue({
              cuentaContableDepreciacion: cc.id,
            })
          )
        )
        .subscribe()
    );
  }
}
