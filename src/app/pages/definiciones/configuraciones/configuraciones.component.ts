import { Configuracion } from '@core/models/definiciones/configuracion';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NORMATIVAS_ACTIVO } from '@core/constants/normativas-activo';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { Id } from '@core/types/id';
import { first, take, tap, map } from 'rxjs/operators';
import { Entidad } from '@core/models/auxiliares/entidad';
import { Location } from '@angular/common';
import { ModoFormulario } from '@core/types/modo-formulario';
import { TIPOS_AFECTACION_DEPRECIACION } from '@core/constants/tipos-afectaciones-depreciacion';
import { prepararConfiguracion } from '@core/utils/funciones/preparar-configuracion';
import { adaptarConfiguracion } from '@core/utils/pipes-rxjs/adaptadores/adaptar-configuracion';

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
      empresaId: [undefined],
      id: [undefined],
      normativaActivos: [undefined],
      afectacionDepreciacion: [undefined],
      longitudCatalogoCuentas: [undefined],
      longitudCodigoInstitucional: [undefined],
      formatoCatalogoCuentaGeneral: [undefined],
      formatoCodigoInstitucional: [undefined],
      generarAsientosContables: [undefined],
      fechaIncorporacionAutomatica: [undefined],
      usarMascaraCodigoActivo: [undefined],
      activarPaginacion: [undefined],
      opcionesPaginacion: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  private actualizarFormulario(): void {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._entidad
        .buscarPorId(this.id)
        .pipe(
          adaptarConfiguracion(),
          tap(
            (ent: Configuracion) =>
              this.formulario.patchValue({
                empresaId: ent.empresaId,
                id: ent.id,
                normativaActivos: ent.normativaActivos,
                afectacionDepreciacion: ent.afectacionDepreciacion,
                longitudCatalogoCuentas: ent.longitudCatalogoCuentas,
                longitudCodigoInstitucional: ent.longitudCodigoInstitucional,
                formatoCatalogoCuentaGeneral: ent.formatoCatalogoCuentaGeneral,
                formatoCodigoInstitucional: ent.formatoCodigoInstitucional,
                generarAsientosContables: ent.generarAsientosContables,
                fechaIncorporacionAutomatica: ent.fechaIncorporacionAutomatica,
                usarMascaraCodigoActivo: ent.usarMascaraCodigoActivo,
                activarPaginacion: ent.activarPaginacion,
                opcionesPaginacion: ent.opcionesPaginacion,
                creado: ent.creado,
                modificado: ent.modificado,
              }),
            take(1)
          )
        )
        .subscribe();
    } else {
      this.formulario.patchValue({
        empresaId: 0,
        id: 0,
        normativaActivos: '',
        afectacionDepreciacion: '',
        longitudCatalogoCuentas: 0,
        longitudCodigoInstitucional: 0,
        formatoCatalogoCuentaGeneral: '',
        formatoCodigoInstitucional: '',
        generarAsientosContables: 0,
        fechaIncorporacionAutomatica: 0,
        usarMascaraCodigoActivo: 0,
        activarPaginacion: 0,
        opcionesPaginacion: [8, 20, 50, 100],
        creado: new Date(),
        modificado: new Date(),
      });
    }
  }

  importar(): void {
    throw new Error('Method not implemented.');
  }

  guardar(): void {
    let configuracion = prepararConfiguracion(this.formulario.value);
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(configuracion, this.titulo, false)
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._entidad
        .actualizar(this.id, configuracion, this.titulo, false)
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
