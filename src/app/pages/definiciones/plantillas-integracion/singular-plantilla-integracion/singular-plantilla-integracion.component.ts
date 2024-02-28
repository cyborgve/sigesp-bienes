import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';
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
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { PlantillaIntegracionService } from '@core/services/definiciones/plantilla-integracion.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { Subscription } from 'rxjs';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';
import { BuscadorPlantillaIntegracionComponent } from '../buscador-plantilla-integracion/buscador-plantilla-integracion.component';
import { PlantillaIntegracion } from '@core/models/definiciones/plantilla-integracion';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';
import { UNIDADES_MEDIDA } from '@core/constants/unidades-medida';
import { BuscadorCuentaContableComponent } from '@shared/components/buscador-cuenta-contable/buscador-cuenta-contable.component';
import { TIPOS_PLANTILLA_INTEGRACION } from '@core/constants/tipos-plantilla-integracion';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

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
  formulario: UntypedFormGroup;

  metodosDepreciacion = METODOS_DEPRECIACION;
  unidadesVidaUtil = UNIDADES_MEDIDA.TIEMPO;
  tiposPlantillaIntegracion = TIPOS_PLANTILLA_INTEGRACION;

  constructor(
    private _entidad: PlantillaIntegracionService,
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
      tipoPlantilla: [undefined, Validators.required],
      metodoDepreciacion: [undefined],
      vidaUtil: [undefined],
      unidadVidaUtil: [undefined],
      cuentaContableDebe: [undefined],
      cuentaContableHaber: [undefined],
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
              tipoPlantilla: entidad.tipoPlantilla,
              metodoDepreciacion: entidad.metodoDepreciacion,
              vidaUtil: entidad.vidaUtil,
              unidadVidaUtil: entidad.unidadVidaUtil,
              cuentaContableDebe: entidad.cuentaContableDebe,
              cuentaContableHaber: entidad.cuentaContableHaber,
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
              tipoPlantilla: '',
              metodoDepreciacion: '',
              vidaUtil: 0,
              unidadVidaUtil: '',
              cuentaContableDebe: '---',
              cuentaContableHaber: '---',
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
          tap((entidad: PlantillaIntegracion) => {
            this.formulario.patchValue({
              denominacion: entidad.denominacion,
            });
          })
        )
        .subscribe()
    );
  }

  guardar() {
    let entidad: PlantillaIntegracion = this.formulario.value;
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

  buscarCuentaContableDebe() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.cuentaContableDebe),
        tap((cuentaContable: CuentaContable) =>
          this.formulario.patchValue({ cuentaContableDebe: cuentaContable.id })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarCuentaContableHaber() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.cuentaContableHaber),
        tap((cuentaContable: CuentaContable) =>
          this.formulario.patchValue({
            cuentaContableHaber: cuentaContable.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }
}
