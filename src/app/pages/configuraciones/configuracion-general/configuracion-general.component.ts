import { tap, take, first } from 'rxjs/operators';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NORMATIVAS_ACTIVO } from '@core/constants/normativas-activo';
import { TIPOS_AFECTACION_DEPRECIACION } from '@core/constants/tipos-afectaciones-depreciacion';
import { Entidad } from '@core/models/auxiliares/entidad';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { Configuracion } from '@core/models/definiciones/configuracion';
import { prepararConfiguracion } from '@core/utils/funciones/preparar-configuracion';
import { Location } from '@angular/common';

@Component({
  selector: 'app-configuracion-general',
  templateUrl: './configuracion-general.component.html',
  styleUrls: ['./configuracion-general.component.scss'],
})
export class ConfiguracionGeneralComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  titulo = 'Configuración General';
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
      mostrarBotonesInicioFinal: [undefined],
      mostrarOpcionesPaginacion: [undefined],
      decorarFiltros: [undefined],
      serialRotulacionAutogenerado: [undefined],
      prefijoSerialRotulacion: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  private actualizarFormulario(): void {
    this._entidad
      .buscarPorId(1)
      .pipe(
        tap((ent: Configuracion) =>
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
            mostrarBotonesInicioFinal: ent.mostrarBotonesInicioFinal,
            mostrarOpcionesPaginacion: ent.mostrarOpcionesPaginacion,
            decorarFiltros: ent.decorarFiltros,
            serialRotulacionAutogenerado: ent.serialRotulacionAutogenerado,
            prefijoSerialRotulacion: ent.prefijoSerialRotulacion,
            creado: ent.creado,
            modificado: ent.modificado,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  importar(): void {
    throw new Error('Method not implemented.');
  }

  guardar(): void {
    let configuracion: any = prepararConfiguracion(this.formulario.value);
    this._entidad
      .actualizar(this.id, configuracion, this.titulo, false)
      .pipe(first())
      .subscribe(() => this.irAtras());
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
    this._router.navigate(['/']);
  }

  salir(): void {
    throw new Error('Method not implemented.');
  }
}
