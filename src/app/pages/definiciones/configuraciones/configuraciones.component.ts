import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AFECTACIONES_DEPRECIACION } from '@core/constants/afectaciones-depreciacion';
import { NORMATIVAS_ACTIVO } from '@core/constants/normativas-activo';
import { ConfiguracionService } from '@core/services/configuracion.service';
import { Id } from '@core/types/id';
import { first, take, tap } from 'rxjs/operators';
import { Entidad } from '@core/models/entidad';
import { Location } from '@angular/common';
import { Configuracion } from '@core/models/configuracion';
import { ModoFormulario } from '@core/types/modo-formulario';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss'],
})
export class ConfiguracionesComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  titulo = 'Configuraciones';
  formulario: FormGroup;

  afectacionesDepreciacion = AFECTACIONES_DEPRECIACION;
  normativasActivo = NORMATIVAS_ACTIVO;

  private id: Id;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _entidad: ConfiguracionService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      generarAsientosContables: [false],
      fechaIncorporacionAutomatica: [false],
      separadorMascaraCodigo: [false],
      afectacionDepreciacion: ['', Validators.required],
      normativaActivos: ['', Validators.required],
      longitudMaximaCatalogoCuenta: [
        8,
        [Validators.max(32), Validators.min(1)],
      ],
      longitudMaximaCodigoInstituc: [
        8,
        [Validators.max(32), Validators.min(1)],
      ],
      formatoCatalogoCuentaGeneral: [
        '########',
        [Validators.max(32), Validators.min(8)],
      ],
      formatoCodigoInstitucional: [
        '########',
        [Validators.max(32), Validators.min(8)],
      ],
      creado: [new Date()],
      modificado: [new Date()],
    });
    this.id = this._activatedRoute.snapshot.params['id'];

    /* Verifica que exista una configuracion almacenada, si no existe
    entonces re-enruta la solicitud al mismo end-point pero sin id */
    this._entidad
      .existe(this.id)
      .pipe(
        first(),
        tap(existe => {
          if (!existe) {
            this._router.navigate(['/definiciones/configuraciones']);
          }
        })
      )
      .subscribe();
    this.actualizarFormulario();
  }

  private actualizarFormulario(): void {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._entidad
        .buscarPorId(this.id)
        .pipe(
          take(1),
          tap(entidad =>
            this.formulario.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              generarAsientosContables: entidad.generarAsientosContables,
              fechaIncorporacionAutomatica:
                entidad.fechaIncorporacionAutomatica,
              separadorMascaraCodigo: entidad.separadorMascaraCodigo,
              afectacionDepreciacion: entidad.afectacionDepreciacion,
              normativaActivos: entidad.normativaActivos,
              longitudMaximaCatalogoCuenta:
                entidad.longitudMaximaCatalogoCuenta,
              longitudMaximaCodigoInstituc:
                entidad.longitudMaximaCodigoInstituc,
              formatoCatalogoCuentaGeneral:
                entidad.formatoCatalogoCuentaGeneral,
              formatoCodigoInstitucional: entidad.formatoCodigoInstitucional,
              creado: entidad.creado,
              modificado: entidad.modificado,
            })
          )
        )
        .subscribe();
    }
  }

  importar(): void {
    throw new Error('Method not implemented.');
  }

  guardar(): void {
    let configuracion: Configuracion = this.formulario.value as Configuracion;
    configuracion.modificado = new Date();
    if (this.modoFormulario === 'CREANDO') {
      configuracion.creado = new Date();
      this._entidad
        .guardar(configuracion)
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._entidad
        .actualizar(this.id, configuracion)
        .pipe(first())
        .subscribe(() => this.irAtras());
    }
  }

  borrar(): void {
    throw new Error('Method not implemented.');
  }

  imprimir(): void {
    throw new Error('Method not implemented.');
  }

  irAtras(): void {
    this._location.back();
  }

  irAlInicio(): void {
    this._router.navigate(['/definiciones']);
  }

  salir(): void {
    throw new Error('Method not implemented.');
  }
}
