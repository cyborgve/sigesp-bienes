import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivoService } from '@core/services/activo.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorActivoComponent } from '../buscador-activo/buscador-activo.component';
import { Activo } from '@core/models/activo';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { Entidad } from '@core/models/entidad';

@Component({
  selector: 'app-singular-activo',
  templateUrl: './singular-activo.component.html',
  styleUrls: ['./singular-activo.component.scss'],
})
export class SingularActivoComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'activo';
  formulario: FormGroup;

  formularioDatosGenerales: FormGroup;
  formularioComponentes: FormGroup;
  formularioDepreciacion: FormGroup;
  formularioDocumentacion: FormGroup;
  formularioOrigen: FormGroup;
  formularioResponsable: FormGroup;
  formularioSeguro: FormGroup;
  formularioUbicacion: FormGroup;

  tabLabels = [
    'datos generales',
    'componentes',
    'depreciación',
    'documentación',
    'origen',
    'responsable',
    'seguro',
    'ubicación',
  ];
  constructor(
    private _entidad: ActivoService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog
  ) {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.formularioComponentes = this._formBuilder.group({
      poseeComponentes: ['', Validators.required],
    });
    this.formularioDatosGenerales = this.formulario = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      codigo: ['', Validators.required],
      denominacion: ['', Validators.required],
      catalogoCuentas: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
      tipoActivo: ['', Validators.required],
      fechaAdquisicion: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      observaciones: ['', Validators.required],
      origenId: ['', Validators.required],
      unidadAdministrativaId: ['', Validators.required],
      sedeId: ['', Validators.required],
      peso: ['', Validators.required],
      valorAdquisicion: ['', Validators.required],
      monedaId: ['', Validators.required],
      serial: ['', Validators.required],
      marcaId: ['', Validators.required],
      modeloId: ['', Validators.required],
      anioFabricacion: ['', Validators.required],
      colorId: ['', Validators.required],
      descripcionComponente: ['', Validators.required],
      especificacionesTecnicas: ['', Validators.required],
      diasGarantia: ['', Validators.required],
      fechaInicioGarantia: ['', Validators.required],
      fechaFinGarantia: ['', Validators.required],
      claseId: ['', Validators.required],
      descripcionOtraClase: ['', Validators.required],
      serialCarroceria: ['', Validators.required],
      serialMotor: ['', Validators.required],
      placas: ['', Validators.required],
      numeroTituloPropiedad: ['', Validators.required],
      capacidad: ['', Validators.required],
      nombre: ['', Validators.required],
      usoId: ['', Validators.required],
      tieneGPS: ['', Validators.required],
      especificacionesGPS: ['', Validators.required],
      tipoSemovienteId: ['', Validators.required],
      genero: ['', Validators.required],
      raza: ['', Validators.required],
      propositoSemovienteId: ['', Validators.required],
      unidadMedidaId: ['', Validators.required],
      numeroHierro: ['', Validators.required],
      especificacionesAnimal: ['', Validators.required],
      tipoAnimalId: ['', Validators.required],
      fechaNacimientoAnimal: ['', Validators.required],
      rotulacionId: ['', Validators.required],
      categoriaId: ['', Validators.required],
      tipoComponenteId: ['', Validators.required],
      razaId: ['', Validators.required],
      valorRescate: ['', Validators.required],
      fuenteFinanciamientoId: ['', Validators.required],
      codigoCentroCostos: ['', Validators.required],
      creado: [''],
      modificado: [''],
    });
    this.formularioDepreciacion = this._formBuilder.group({
      depreciable: ['', Validators.required],
      metodoDepreciacion: ['', Validators.required],
      cuentaContableGasto: ['', Validators.required],
      cuentaContableDepreciacion: ['', Validators.required],
      vidaUtil: ['', Validators.required],
    });
    this.formularioDocumentacion = this._formBuilder.group({
      oficinaRegistro: ['', Validators.required],
      referenciaRegistro: ['', Validators.required],
      tomo: ['', Validators.required],
      folio: ['', Validators.required],
      protocolo: ['', Validators.required],
      numeroRegistro: ['', Validators.required],
      fechaRegistrado: ['', Validators.required],
      propietarioAnterior: ['', Validators.required],
      dependencias: ['', Validators.required],
      areaConstruccionM2: ['', Validators.required],
      areaTerrenoM2: ['', Validators.required],
      especificacionesInmueble: ['', Validators.required],
      perteneceASede: ['', Validators.required],
      sedeUbicacionId: ['', Validators.required],
      especificacionesColor: ['', Validators.required],
    });
    this.formularioOrigen = this._formBuilder.group({});
    this.formularioSeguro = this._formBuilder.group({
      asegurado: ['', Validators.required],
      seguroId: ['', Validators.required],
    });
    this.formularioResponsable = this._formBuilder.group({
      responsableId: ['', Validators.required],
      responsableUsoId: ['', Validators.required],
      estadoUsoId: ['', Validators.required],
      conservacion: ['', Validators.required],
      descripcionEstadoConservacion: ['', Validators.required],
    });
    this.formularioUbicacion = this._formBuilder.group({});
    this.actualizarFormulario();
  }

  private actualizarFormulario() {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._entidad
        .buscarPorId(this.id)
        .pipe(
          take(1),
          tap(entidad =>
            this.formularioComponentes.patchValue({
              poseeComponentes: entidad.poseeComponentes,
            })
          ),
          tap(entidad =>
            this.formularioDatosGenerales.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              codigo: entidad.codigo,
              denominacion: entidad.denominacion,
              catalogoCuentas: entidad.catalogoCuentas,
              fechaRegistro: entidad.fechaRegistro,
              tipoActivo: entidad.tipoActivo,
              fechaAdquisicion: entidad.fechaAdquisicion,
              fechaIngreso: entidad.fechaIngreso,
              observaciones: entidad.observaciones,
              origenId: entidad.origenId,
              unidadAdministrativaId: entidad.unidadAdministrativaId,
              sedeId: entidad.sedeId,
              peso: entidad.peso,
              valorAdquisicion: entidad.valorAdquisicion,
              monedaId: entidad.modeloId,
              serial: entidad.serial,
              marcaId: entidad.marcaId,
              modeloId: entidad.modeloId,
              anioFabricacion: entidad.anioFabricacion,
              colorId: entidad.colorId,
              descripcionComponente: entidad.descripcionComponente,
              especificacionesTecnicas: entidad.especificacionesTecnicas,
              diasGarantia: entidad.diasGarantia,
              fechaInicioGarantia: entidad.fechaInicioGarantia,
              fechaFinGarantia: entidad.fechaFinGarantia,
              claseId: entidad.claseId,
              descripcionOtraClase: entidad.descripcionOtraClase,
              serialCarroceria: entidad.serialCarroceria,
              serialMotor: entidad.serialMotor,
              placas: entidad.placas,
              numeroTituloPropiedad: entidad.numeroTituloPropiedad,
              capacidad: entidad.capacidad,
              nombre: entidad.nombre,
              usoId: entidad.usoId,
              tieneGPS: entidad.tieneGPS,
              especificacionesGPS: entidad.especificacionesGPS,
              tipoSemovienteId: entidad.tipoSemovienteId,
              genero: entidad.genero,
              raza: entidad.raza,
              propositoSemovienteId: entidad.propositoSemovienteId,
              unidadMedidaId: entidad.unidadMedidaId,
              numeroHierro: entidad.numeroHierro,
              especificacionesAnimal: entidad.especificacionesAnimal,
              tipoAnimalId: entidad.tipoAnimalId,
              fechaNacimientoAnimal: entidad.fechaNacimientoAnimal,
              rotulacionId: entidad.rotulacionId,
              categoriaId: entidad.categoriaId,
              tipoComponenteId: entidad.tipoComponenteId,
              asegurado: entidad.asegurado,
              seguroId: entidad.seguroId,
              razaId: entidad.razaId,
              valorRescate: entidad.valorRescate,
              fuenteFinanciamientoId: entidad.fuenteFinanciamientoId,
              codigoCentroCostos: entidad.codigoCentroCostos,
              creado: entidad.creado,
              modificado: entidad.modificado,
            })
          ),
          tap(entidad =>
            this.formularioDepreciacion.patchValue({
              depreciable: entidad.depreciable,
              metodoDepreciacion: entidad.metodoDepreciacion,
              cuentaContableGasto: entidad.cuentaContableGasto,
              cuentaContableDepreciacion: entidad.cuentaContableDepreciacion,
              vidaUtil: entidad.vidaUtil,
            })
          ),
          tap(entidad =>
            this.formularioDocumentacion.patchValue({
              oficinaRegistro: entidad.oficinaRegistro,
              referenciaRegistro: entidad.referenciaRegistro,
              tomo: entidad.tomo,
              folio: entidad.folio,
              protocolo: entidad.protocolo,
              numeroRegistro: entidad.numeroRegistro,
              fechaRegistrado: entidad.fechaRegistrado,
              popietarioAnterior: entidad.propietarioAnterior,
              dependencias: entidad.dependencias,
              areaConstruccionM2: entidad.areaConstruccionM2,
              areaTerrenoM2: entidad.areaTerrenoM2,
              especificacionesInmueble: entidad.especificacionesInmueble,
              perteneceASede: entidad.perteneceASede,
              sedeUbicacionId: entidad.sedeUbicacionId,
              especificacionesColor: entidad.especificacionesColor,
            })
          ),
          tap(entidad => this.formularioOrigen.patchValue({})),
          tap(entidad =>
            this.formularioResponsable.patchValue({
              responsableId: entidad.responsableId,
              responsableUsoId: entidad.responsableUsoId,
              estadoUsoId: entidad.estadoUsoId,
              conservacion: entidad.conservacion,
              descripcionEstadoConservacion:
                entidad.descripcionEstadoConservacion,
            })
          ),
          tap(entidad => this.formularioSeguro.patchValue({})),
          tap(entidad => this.formularioUbicacion.patchValue({}))
        )
        .subscribe();
    }
  }

  deshabilitarGuardar = () => {
    return (
      this.formularioDatosGenerales.invalid &&
      this.formularioComponentes.invalid &&
      this.formularioDepreciacion.invalid &&
      this.formularioDocumentacion.invalid &&
      this.formularioOrigen.invalid &&
      this.formularioOrigen.invalid &&
      this.formularioResponsable.invalid &&
      this.formularioSeguro.invalid &&
      this.formularioUbicacion.invalid
    );
  };

  importar() {
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Activo) => {
          this.formulario.patchValue({
            empresaId: entidad.empresaId,
            id: entidad.id,
            denominacion: entidad.denominacion,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let entidad: Activo = this.formulario.value;
    entidad.modificado = new Date();
    if (this.modoFormulario === 'CREANDO') {
      entidad.creado = new Date();
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
}
