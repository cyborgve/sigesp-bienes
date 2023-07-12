import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NORMATIVAS_ACTIVO } from '@core/constants/normativas-activo';
import { ConfiguracionService } from '@core/services/configuracion.service';
import { Id } from '@core/types/id';
import { first, take, tap, map } from 'rxjs/operators';
import { Entidad } from '@core/models/auxiliares/entidad';
import { Location } from '@angular/common';
import { Configuracion } from '@core/models/configuracion';
import { ModoFormulario } from '@core/types/modo-formulario';
import { TIPOS_AFECTACION_DEPRECIACION } from '@core/constants/tipos-afectaciones-depreciacion';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss'],
})
export class ConfiguracionesComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  titulo = 'Configuraciones';
  formulario: FormGroup;

  tiposAfectacionDepreciacion = TIPOS_AFECTACION_DEPRECIACION;
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
      normativaActivos: [''],
      afectacionDepreciacion: [''],
      longitudCatalogoCuentas: [0],
      longitudCodigoInstitucional: [0],
      formatoCatalogoCuentaGeneral: [''],
      formatoCodigoInstitucional: [''],
      generarAsientosContables: [false],
      fechaIncorporacionAutomatica: [false],
      usarMascaraCodigoActivo: [false],
      activarPaginacion: [false],
      opcionesPaginacion: [[]],
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
              normativaActivos: entidad.normativaActivos,
              afectacionDepreciacion: entidad.afectacionDepreciacion,
              longitudCatalogoCuentas: entidad.longitudCatalogoCuentas,
              longitudCodigoInstitucional: entidad.longitudCodigoInstitucional,
              formatoCatalogoCuentaGeneral:
                entidad.formatoCatalogoCuentaGeneral,
              formatoCodigoInstitucional: entidad.formatoCodigoInstitucional,
              generarAsientosContables: entidad.generarAsientosContables,
              fechaIncorporacionAutomatica:
                entidad.fechaIncorporacionAutomatica,
              usarMascaraCodigoActivo: entidad.usarMascaraCodigoActivo,
              activarPaginacion: entidad.activarPaginacion,
              opcionesPaginacion: entidad.opcionesPaginacion,
              creado: entidad.creado,
              modificado: entidad.modificado,
            })
          ),
          tap(() => console.log('objeto recuparedo:', this.formulario.value))
        )
        .subscribe();
    }
  }

  importar(): void {
    throw new Error('Method not implemented.');
  }

  guardar(): void {
    let configuracion = this.formulario.value as Configuracion;
    if (this.modoFormulario === 'CREANDO') {
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
