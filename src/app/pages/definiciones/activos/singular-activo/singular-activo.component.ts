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

  formularioDatosGenerales: FormGroup;
  formularioDetalles: FormGroup;
  formularioComponentes: FormGroup;
  formularioDepreciacion: FormGroup;
  formularioUbicacion: FormGroup;

  tabLabels = [
    'datos generales',
    'detalles',
    'componentes',
    'depreciación',
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
    /* formulario datos generales */
    this.formularioDatosGenerales = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      codigo: ['', Validators.required],
      tipoActivo: [''],
      fechaRegistro: [''],
      catalogoCuentas: [''],
      serialRotulacion: [''],
      denominacion: [''],
      observaciones: [''],
      fechaAdquisicion: [''],
      valorAdquisicion: [''],
      monedaId: [''],
      marcaId: [''],
      modeloId: [''],
      anioFabricacion: [''],
      serialFabrica: [''],
      colorId: [''],
      diasGarantia: [''],
      fechaInicioGarantia: [''],
      fechaFinGarantia: [''],
      origenId: [''],
      asegurado: [''],
      seguroId: [''],
      claseId: [''],
      descripcionOtraClase: [''],
      rotulacionId: [''],
      categoriaId: [''],
      valorRescate: [''],
      fuenteFinanciamientoId: [''],
      codigoCentroCostos: [''],
      especificacionesTecnicas: [''],
      creado: [''],
      modificado: [''],
    });
    /* formulario detalles */
    this.formularioDetalles = this._formBuilder.group({
      oficinaRegistro: [''],
      referenciaRegistro: [''],
      tomo: [''],
      folio: [''],
      protocolo: [''],
      numeroRegistro: [''],
      fechaRegistrado: [''],
      propietarioAnterior: [''],
      dependencias: [''],
      areaConstruccionM2: [''],
      areaTerrenoM2: [''],
      especificacionesInmueble: [''],
      perteneceASede: [''],
      sedeUbicacionId: [''],
      especificacionesColor: [''],
      serialCarroceria: [''],
      serialMotor: [''],
      placas: [''],
      numeroTituloPropiedad: [''],
      capacidad: [''],
      nombre: [''],
      usoId: [''],
      tieneGPS: [''],
      especificacionesGPS: [''],
      tipoSemovienteId: [''],
      genero: [''],
      raza: [''],
      propositoSemovienteId: [''],
      peso: [''],
      unidadMedidaId: [''],
      numeroHierro: [''],
      especificacionesAnimal: [''],
      tipoAnimalId: [''],
      fechaNacimientoAnimal: [''],
      razaId: [''],
    });
    /* formulario componentes */
    this.formularioComponentes = this._formBuilder.group({
      componentes: [[]],
    });
    /* formulario depreciacion */
    this.formularioDepreciacion = this._formBuilder.group({
      depreciable: [''],
      plantillaDepreciacion: [''],
      metodoDepreciacion: [''],
      cuentaContableGasto: [''],
      cuentaContableDepreciacion: [''],
      vidaUtil: [''],
    });
    /* formulario ubicacion */
    this.formularioUbicacion = this._formBuilder.group({
      sedeId: [''],
      unidadAdministrativaId: [''],
      fechaIngreso: [''],
      responsableId: [''],
      responsableUsoId: [''],
      estadoUsoId: [''],
      conservacion: [''],
      descripcionEstadoConservacion: [''],
    });
    this.actualizarFormularios();
  }

  private actualizarFormularios() {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._entidad
        .buscarPorId(this.id)
        .pipe(
          take(1),
          tap(entidad =>
            this.formularioDatosGenerales.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              codigo: entidad.codigo,
              tipoActivo: entidad.tipoActivo,
              fechaRegistro: entidad.fechaRegistro,
              catalogoCuentas: entidad.catalogoCuentas,
              serialRotulacion: entidad.serialRotulacion,
              denominacion: entidad.denominacion,
              observaciones: entidad.observaciones,
              fechaAdquisicion: entidad.fechaAdquisicion,
              valorAdquisicion: entidad.valorAdquisicion,
              monedaId: entidad.monedaId,
              marcaId: entidad.marcaId,
              modeloId: entidad.modeloId,
              anioFabricacion: entidad.anioFabricacion,
              serialFabrica: entidad.serialFabrica,
              colorId: entidad.colorId,
              diasGarantia: entidad.diasGarantia,
              fechaInicioGarantia: entidad.fechaInicioGarantia,
              fechaFinGarantia: entidad.fechaFinGarantia,
              origenId: entidad.origenId,
              asegurado: entidad.asegurado,
              seguroId: entidad.seguroId,
              claseId: entidad.claseId,
              descripcionOtraClase: entidad.descripcionOtraClase,
              categoriaId: entidad.categoriaId,
              rotulacionId: entidad.rotulacionId,
              valorRescate: entidad.valorRescate,
              fuenteFinanciamientoId: entidad.fuenteFinanciamientoId,
              codigoCentroCostos: entidad.codigoCentroCostos,
              especificacionesTecnicas: entidad.especificacionesTecnicas,
              creado: entidad.creado,
              modificado: entidad.modificado,
            })
          ),
          tap(entidad =>
            this.formularioDetalles.patchValue({
              oficinaRegistro: entidad.oficinaRegistro,
              referenciaRegistro: entidad.referenciaRegistro,
              tomo: entidad.tomo,
              folio: entidad.folio,
              protocolo: entidad.protocolo,
              numeroRegistro: entidad.numeroRegistro,
              fechaRegistrado: entidad.fechaRegistrado,
              propietarioAnterior: entidad.propietarioAnterior,
              dependencias: entidad.dependencias,
              areaConstruccionM2: entidad.areaConstruccionM2,
              areaTerrenoM2: entidad.areaTerrenoM2,
              especificacionesInmueble: entidad.especificacionesInmueble,
              perteneceASede: entidad.perteneceASede,
              sedeUbicacionId: entidad.sedeUbicacionId,
              especificacionesColor: entidad.especificacionesColor,
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
              peso: entidad.peso,
              unidadMedidaId: entidad.unidadMedidaId,
              numeroHierro: entidad.numeroHierro,
              especificacionesAnimal: entidad.especificacionesAnimal,
              tipoAnimalId: entidad.tipoAnimalId,
              fechaNacimientoAnimal: entidad.fechaNacimientoAnimal,
              razaId: entidad.razaId,
            })
          ),
          tap(entidad =>
            this.formularioComponentes.patchValue({
              componentes: entidad.componentes,
            })
          ),
          tap(entidad =>
            this.formularioDepreciacion.patchValue({
              depreciable: entidad.depreciable,
              plantillaDepreciacion: entidad.plantillaDepreciacion,
              metodoDepreciacion: entidad.metodoDepreciacion,
              cuentaContableGasto: entidad.cuentaContableGasto,
              cuentaContableDepreciacion: entidad.cuentaContableDepreciacion,
              vidaUtil: entidad.vidaUtil,
            })
          ),
          tap(entidad =>
            this.formularioUbicacion.patchValue({
              sedeId: entidad.sedeId,
              unidadAdministrativaId: entidad.unidadAdministrativaId,
              fechaIngreso: entidad.fechaIngreso,
              responsableId: entidad.responsableId,
              responsableUsoId: entidad.responsableUsoId,
              estadoUsoId: entidad.estadoUsoId,
              conservacion: entidad.conservacion,
              descripcionEstadoConservacion:
                entidad.descripcionEstadoConservacion,
            })
          )
        )
        .subscribe();
    }
  }

  deshabilitarGuardar = () => {
    return (
      this.formularioDatosGenerales.invalid &&
      this.formularioComponentes.invalid &&
      this.formularioDepreciacion.invalid &&
      this.formularioDetalles.invalid &&
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
        tap((entidad: Activo) =>
          this.formularioDatosGenerales.patchValue({
            codigo: entidad.codigo,
            tipoActivo: entidad.tipoActivo,
            fechaRegistro: entidad.fechaRegistro,
            catalogoCuentas: entidad.catalogoCuentas,
            serialRotulacion: entidad.serialRotulacion,
            denominacion: entidad.denominacion,
            observaciones: entidad.observaciones,
            fechaAdquisicion: entidad.fechaAdquisicion,
            valorAdquisicion: entidad.valorAdquisicion,
            monedaId: entidad.monedaId,
            marcaId: entidad.marcaId,
            modeloId: entidad.modeloId,
            anioFabricacion: entidad.anioFabricacion,
            peso: entidad.peso,
            serialFabrica: entidad.serialFabrica,
            colorId: entidad.colorId,
            diasGarantia: entidad.diasGarantia,
            fechaInicioGarantia: entidad.fechaInicioGarantia,
            fechaFinGarantia: entidad.fechaFinGarantia,
            origenId: entidad.origenId,
            asegurado: entidad.asegurado,
            seguroId: entidad.seguroId,
            claseId: entidad.claseId,
            descripcionOtraClase: entidad.descripcionOtraClase,
            especificacionesTecnicas: entidad.especificacionesTecnicas,
          })
        ),
        tap(entidad =>
          this.formularioDetalles.patchValue({
            oficinaRegistro: entidad.oficinaRegistro,
            referenciaRegistro: entidad.referenciaRegistro,
            tomo: entidad.tomo,
            folio: entidad.folio,
            protocolo: entidad.protocolo,
            numeroRegistro: entidad.numeroRegistro,
            fechaRegistrado: entidad.fechaRegistrado,
            propietarioAnterior: entidad.propietarioAnterior,
            dependencias: entidad.dependencias,
            areaConstruccionM2: entidad.areaConstruccionM2,
            areaTerrenoM2: entidad.areaTerrenoM2,
            especificacionesInmueble: entidad.especificacionesInmueble,
            perteneceASede: entidad.perteneceASede,
            sedeUbicacionId: entidad.sedeUbicacionId,
            especificacionesColor: entidad.especificacionesColor,
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
            razaId: entidad.razaId,
            valorRescate: entidad.valorRescate,
            fuenteFinanciamientoId: entidad.fuenteFinanciamientoId,
            codigoCentroCostos: entidad.codigoCentroCostos,
          })
        ),
        tap(entidad =>
          this.formularioComponentes.patchValue({
            componentes: entidad.componentes,
          })
        ),
        tap(entidad =>
          this.formularioDepreciacion.patchValue({
            depreciable: entidad.depreciable,
            plantillaDepreciacion: entidad.plantillaDepreciacion,
            metodoDepreciacion: entidad.metodoDepreciacion,
            cuentaContableGasto: entidad.cuentaContableGasto,
            cuentaContableDepreciacion: entidad.cuentaContableDepreciacion,
            vidaUtil: entidad.vidaUtil,
          })
        ),
        tap(entidad =>
          this.formularioUbicacion.patchValue({
            sedeId: entidad.sedeId,
            unidadAdministrativaId: entidad.unidadAdministrativaId,
            fechaIngreso: entidad.fechaIngreso,
            responsableId: entidad.responsableId,
            responsableUsoId: entidad.responsableUsoId,
            estadoUsoId: entidad.estadoUsoId,
            conservacion: entidad.conservacion,
            descripcionEstadoConservacion:
              entidad.descripcionEstadoConservacion,
          })
        )
      )
      .subscribe();
  }

  guardar() {
    let entidad: Activo = {
      ...this.formularioDatosGenerales.value,
      ...this.formularioDetalles.value,
      ...this.formularioComponentes.value,
      ...this.formularioDepreciacion.value,
      ...this.formularioUbicacion.value,
    };
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
        codigo: this.formularioDatosGenerales.value.codigo,
        denominacion: this.formularioDatosGenerales.value.denominacion,
      },
    });
    dialog
      .beforeClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() =>
          this._entidad.eliminar(this.formularioDatosGenerales.value.id)
        ),
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
