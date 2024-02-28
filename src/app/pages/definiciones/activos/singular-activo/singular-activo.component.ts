import { locale } from 'moment';
import { Basica } from '@core/models/auxiliares/basica';
import { tap, first, take, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoDetalle } from '@core/models/definiciones/activo-detalle';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorActivoComponent } from '../buscador-activo/buscador-activo.component';
import { ActivoIntegracion } from '@core/models/definiciones/activo-integracion';

@Component({
  selector: 'app-singular-activo',
  templateUrl: './singular-activo.component.html',
  styleUrls: ['./singular-activo.component.scss'],
})
export class SingularActivoComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[0]['nombre'];

  formularioDatosGenerales: UntypedFormGroup;
  formularioDetalles: UntypedFormGroup;
  formularioComponentes: UntypedFormGroup;
  formularioDepreciacion: UntypedFormGroup;
  formularioUbicacion: UntypedFormGroup;
  formularioIntegracion: UntypedFormGroup;
  formularioEspecial: UntypedFormGroup;

  tabLabels = [
    'datos generales',
    'detalles',
    'componentes',
    'depreciación',
    'ubicación',
    'integración',
  ];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _activo: ActivoService,
    private _correlativo: CorrelativoService,
    private _dialog: MatDialog,
    private _formBuilder: UntypedFormBuilder,
    private _location: Location
  ) {
    this.formularioDatosGenerales = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      codigo: [undefined],
      tipoActivo: [undefined, Validators.required],
      fechaRegistro: [undefined],
      catalogoCuentas: [undefined],
      serialRotulacion: undefined,
      denominacion: [undefined, Validators.required],
      observaciones: [undefined],
      fechaAdquisicion: [undefined],
      valorAdquisicion: [undefined],
      monedaId: [undefined],
      modeloId: [undefined],
      anioFabricacion: [undefined],
      serialFabrica: undefined,
      colorId: [undefined],
      rotulacionId: [undefined],
      categoriaId: [undefined],
      detalle: [undefined],
      componentes: [undefined],
      depreciacion: [undefined],
      ubicacion: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });

    this.formularioDetalles = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      activoId: [undefined],
      garantia: [undefined],
      unidadGarantia: [undefined],
      inicioGarantia: [undefined],
      finGarantia: [undefined],
      asegurado: [undefined],
      claseId: [undefined],
      origenId: [undefined],
      descripcionOtraClase: [undefined],
      fuenteFinanciamiento: [undefined],
      codigoCentroCostos: [undefined],
      especificacionesTecnicas: [undefined],
      oficinaRegistro: [undefined],
      referenciaRegistro: [undefined],
      tomo: [undefined],
      folio: [undefined],
      protocolo: [undefined],
      numeroRegistro: [undefined],
      fechaRegistrado: [undefined],
      propietarioAnterior: [undefined],
      dependencias: [undefined],
      areaConstruccion: [undefined],
      unidadAreaConstruccion: [undefined],
      areaTerreno: [undefined],
      unidadAreaTerreno: [undefined],
      especificacionesInmueble: [undefined],
      perteneceASede: [undefined],
      sedeUbicacionId: [undefined],
      especificacionesColor: [undefined],
      serialCarroceria: [undefined],
      serialMotor: [undefined],
      placas: [undefined],
      numeroTituloPropiedad: [undefined],
      capacidad: [undefined],
      nombre: [undefined],
      usoId: [undefined],
      tieneGps: [undefined],
      especificacionesGps: [undefined],
      tipoAnimalId: [undefined],
      tipoSemovienteId: [undefined],
      genero: [undefined],
      propositoSemovienteId: [undefined],
      peso: [undefined],
      unidadMedidaPeso: [undefined],
      numeroHierro: [undefined],
      especificacionesAnimal: [undefined],
      fechaNacimientoAnimal: [undefined],
      razaId: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });

    this.formularioComponentes = this._formBuilder.group({
      componentes: [[]],
    });

    this.formularioDepreciacion = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      activoId: [undefined],
      depreciable: [undefined],
      metodoDepreciacion: [undefined, Validators.required],
      cuentaContableDebe: [undefined, Validators.required],
      cuentaContableHaber: [undefined, Validators.required],
      vidaUtil: [undefined, Validators.required],
      unidadVidaUtil: [undefined, Validators.required],
      valorRescate: [undefined, Validators.required],
      monedaValorRescate: [undefined, Validators.required],
      creado: [undefined],
      modificado: [undefined],
    });

    this.formularioUbicacion = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      activoId: [undefined],
      sedeId: [undefined, Validators.required],
      unidadAdministrativaId: [undefined, Validators.required],
      fechaIngreso: [undefined, Validators.required],
      estadoUsoId: [undefined],
      estadoConservacionId: [undefined],
      descripcionEstadoConservacion: [undefined],
      responsableId: [undefined, Validators.required],
      responsableUsoId: [undefined, Validators.required],
      referenciaEstado: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });

    this.formularioIntegracion = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      activoId: [undefined],
      modCuentaContableDebe: [undefined],
      modCuentaContableHaber: [undefined],
      desCuentaContableDebe: [undefined],
      desCuentaContableHaber: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });

    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();

    this.formularioEspecial = this._formBuilder.group({
      generarIncorporacion: [false],
      generarDepreciacion: [false],
      causaMovimiento: [0],
    });
  }

  private actualizarFormulario() {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._activo
        .buscarPorId(this.id)
        .pipe(
          tap(activo =>
            this.formularioDatosGenerales.patchValue({
              empresaId: activo.empresaId,
              id: activo.id,
              codigo: activo.codigo,
              tipoActivo: activo.tipoActivo,
              fechaRegistro: activo.fechaRegistro,
              catalogoCuentas: activo.catalogoCuentas,
              serialRotulacion: activo.serialRotulacion,
              denominacion: activo.denominacion,
              observaciones: activo.observaciones,
              fechaAdquisicion: activo.fechaAdquisicion,
              valorAdquisicion: activo.valorAdquisicion,
              monedaId: activo.monedaId,
              modeloId: activo.modeloId,
              anioFabricacion: activo.anioFabricacion,
              serialFabrica: activo.serialFabrica,
              colorId: activo.colorId,
              rotulacionId: activo.rotulacionId,
              categoriaId: activo.categoriaId,
              creado: activo.creado,
              modificado: activo.modificado,
            })
          ),
          tap(activo => {
            let { detalle } = activo;
            this.formularioDetalles.patchValue({
              empresaId: detalle.empresaId,
              id: detalle.id,
              activoId: detalle.activoId,
              garantia: detalle.garantia,
              unidadGarantia: detalle.unidadGarantia,
              inicioGarantia: detalle.inicioGarantia,
              finGarantia: detalle.finGarantia,
              asegurado: detalle.asegurado,
              claseId: detalle.claseId,
              origenId: detalle.origenId,
              descripcionOtraClase: detalle.descripcionOtraClase,
              fuenteFinanciamiento: detalle.fuenteFinanciamiento,
              codigoCentroCostos: detalle.codigoCentroCostos,
              especificacionesTecnicas: detalle.especificacionesTecnicas,
              oficinaRegistro: detalle.oficinaRegistro,
              referenciaRegistro: detalle.referenciaRegistro,
              tomo: detalle.tomo,
              folio: detalle.folio,
              protocolo: detalle.protocolo,
              numeroRegistro: detalle.numeroRegistro,
              fechaRegistrado: detalle.fechaRegistrado,
              propietarioAnterior: detalle.propietarioAnterior,
              dependencias: detalle.dependencias,
              areaConstruccion: detalle.areaConstruccion,
              unidadAreaConstruccion: detalle.unidadAreaConstruccion,
              areaTerreno: detalle.areaTerreno,
              unidadAreaTerreno: detalle.unidadAreaTerreno,
              especificacionesInmueble: detalle.especificacionesTecnicas,
              perteneceASede: detalle.perteneceASede,
              sedeUbicacionId: detalle.sedeUbicacionId,
              especificacionesColor: detalle.especificacionesColor,
              serialCarroceria: detalle.serialCarroceria,
              serialMotor: detalle.serialMotor,
              placas: detalle.placas,
              numeroTituloPropiedad: detalle.numeroTituloPropiedad,
              capacidad: detalle.capacidad,
              nombre: detalle.nombre,
              usoId: detalle.usoId,
              tieneGps: detalle.tieneGps,
              especificacionesGps: detalle.especificacionesGps,
              tipoAnimalId: detalle.tipoAnimalId,
              tipoSemovienteId: detalle.tipoSemovienteId,
              genero: detalle.genero,
              propositoSemovienteId: detalle.propositoSemovienteId,
              peso: detalle.peso,
              unidadMedidaPeso: detalle.unidadMedidaPeso,
              numeroHierro: detalle.numeroHierro,
              especificacionesAnimal: detalle.especificacionesAnimal,
              fechaNacimientoAnimal: detalle.fechaNacimientoAnimal,
              razaId: detalle.razaId,
              creado: detalle.creado,
              modificado: detalle.modificado,
            });
          }),
          tap(activo =>
            this.formularioComponentes.patchValue({
              componentes: activo.componentes,
            })
          ),
          tap(activo => {
            let { depreciacion } = activo;
            this.formularioDepreciacion.patchValue({
              empresaId: depreciacion.empresaId,
              id: depreciacion.id,
              activoId: depreciacion.activoId,
              depreciable: depreciacion.depreciable,
              metodoDepreciacion: depreciacion.metodoDepreciacion,
              cuentaContableDebe: depreciacion.cuentaContableDebe,
              cuentaContableHaber: depreciacion.cuentaContableHaber,
              vidaUtil: depreciacion.vidaUtil,
              unidadVidaUtil: depreciacion.unidadVidaUtil,
              valorRescate: depreciacion.valorRescate,
              monedaValorRescate: depreciacion.monedaValorRescate,
              creado: depreciacion.creado,
              modificado: depreciacion.modificado,
            });
          }),
          tap(activo => {
            let { ubicacion } = activo;
            this.formularioUbicacion.patchValue({
              empresaId: ubicacion.empresaId,
              id: ubicacion.id,
              activoId: ubicacion.activoId,
              sedeId: ubicacion.sedeId,
              unidadAdministrativaId: ubicacion.unidadAdministrativaId,
              fechaIngreso: ubicacion.fechaIngreso,
              estadoUsoId: ubicacion.estadoUsoId,
              estadoConservacionId: ubicacion.estadoConservacionId,
              descripcionEstadoConservacion:
                ubicacion.descripcionEstadoConservacion,
              responsableId: ubicacion.responsableId,
              responsableUsoId: ubicacion.responsableUsoId,
              referenciaEstado: ubicacion.referenciaEstado,
              creado: ubicacion.creado,
              modificado: ubicacion.modificado,
            });
          }),
          tap(activo => {
            let { integracion } = activo;
            this.formularioIntegracion.patchValue({
              empresaId: integracion.empresaId,
              id: integracion.id,
              activoId: integracion.activoId,
              modCuentaContableDebe: integracion.modCuentaContableDebe,
              modCuentaContableHaber: integracion.modCuentaContableHaber,
              desCuentaContableDebe: integracion.desCuentaContableDebe,
              desCuentaContableHaber: integracion.desCuentaContableHaber,
              creado: integracion.creado,
              modificado: integracion.modificado,
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
            let cor = correlativo.correlativo.toString().padStart(8, '0');
            this.formularioDatosGenerales.patchValue({
              empresaId: 0,
              id: 0,
              codigo: `${ser}-${cor}`,
              tipoActivo: '',
              fechaRegistro: new Date(),
              catalogoCuentas: 0,
              serialRotulacion: 'Autogenerado',
              denominacion: '',
              observaciones: '',
              fechaAdquisicion: new Date(),
              valorAdquisicion: 0,
              monedaId: '0',
              modeloId: 0,
              anioFabricacion: new Date().getFullYear(),
              serialFabrica: '',
              colorId: 0,
              rotulacionId: 0,
              categoriaId: 0,
              detalle: {},
              componentes: [],
              depreciacion: {},
              ubicacion: {},
              creado: new Date(),
              modificado: new Date(),
            });
          }),
          tap(() =>
            this.formularioDetalles.patchValue({
              empresaId: 0,
              id: 0,
              activoId: 0,
              garantia: 0,
              unidadGarantia: '',
              inicioGarantia: undefined,
              finGarantia: undefined,
              asegurado: 0,
              claseId: 0,
              origenId: 0,
              descripcionOtraClase: '',
              fuenteFinanciamiento: '---',
              codigoCentroCostos: '---',
              especificacionesTecnicas: '',
              oficinaRegistro: '',
              referenciaRegistro: '',
              tomo: '',
              folio: '',
              protocolo: '',
              numeroRegistro: '',
              fechaRegistrado: undefined,
              propietarioAnterior: '',
              dependencias: '',
              areaConstruccion: 0,
              unidadAreaConstruccion: '',
              areaTerreno: 0,
              unidadAreaTerreno: '',
              especificacionesInmueble: '',
              perteneceASede: 0,
              sedeUbicacionId: 0,
              especificacionesColor: '',
              serialCarroceria: '',
              serialMotor: '',
              placas: '',
              numeroTituloPropiedad: '',
              capacidad: '',
              nombre: '',
              usoId: 0,
              tieneGps: 0,
              especificacionesGps: '',
              tipoAnimalId: 0,
              tipoSemovienteId: 0,
              genero: 'S',
              propositoSemovienteId: 0,
              peso: 0,
              unidadMedidaPeso: '',
              numeroHierro: '',
              especificacionesAnimal: '',
              fechaNacimientoAnimal: undefined,
              razaId: 0,
              creado: new Date(),
              modificado: new Date(),
            })
          ),
          tap(() =>
            this.formularioDepreciacion.patchValue({
              empresaId: 0,
              id: 0,
              activoId: 0,
              depreciable: 0,
              metodoDepreciacion: '',
              cuentaContableDebe: '--',
              cuentaContableHaber: '--',
              vidaUtil: 0,
              unidadVidaUtil: '',
              valorRescate: 0,
              monedaValorRescate: '0',
              creado: new Date(),
              modificado: new Date(),
            })
          ),
          tap(() =>
            this.formularioUbicacion.patchValue({
              empresaId: 0,
              id: 0,
              activoId: 0,
              sedeId: 0,
              unidadAdministrativaId: 0,
              fechaIngreso: undefined,
              estadoUsoId: 0,
              estadoConservacionId: 0,
              descripcionEstadoConservacion: '',
              responsableId: '---',
              responsableUsoId: '---',
              referenciaEstado: undefined,
              creado: new Date(),
              modificado: new Date(),
            })
          ),
          tap(() =>
            this.formularioIntegracion.patchValue({
              empresaId: 0,
              id: 0,
              activoId: 0,
              modCuentaContableDebe: '--',
              modCuentaContableHaber: '--',
              desCuentaContableDebe: '--',
              desCuentaContableHaber: '--',
              creado: new Date(),
              modificado: new Date(),
            })
          ),
          take(1)
        )
        .subscribe();
    }
  }

  importar(): void {
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap((activo: Basica) => this._activo.buscarPorId(activo.id)),
        tap(activo =>
          this.formularioDatosGenerales.patchValue({
            tipoActivo: activo.tipoActivo,
            catalogoCuentas: activo.catalogoCuentas,
            denominacion: activo.denominacion,
            observaciones: activo.observaciones,
            fechaAdquisicion: activo.fechaAdquisicion,
            valorAdquisicion: activo.valorAdquisicion,
            monedaId: activo.monedaId,
            modeloId: activo.modeloId,
            anioFabricacion: activo.anioFabricacion,
            colorId: activo.colorId,
            rotulacionId: activo.rotulacionId,
            categoriaId: activo.categoriaId,
          })
        ),
        tap(activo => {
          let { detalle } = activo;
          this.formularioDetalles.patchValue({
            garantia: detalle.garantia,
            unidadGarantia: detalle.unidadGarantia,
            claseId: detalle.claseId,
            origenId: detalle.origenId,
            descripcionOtraClase: detalle.descripcionOtraClase,
            fuenteFinanciamiento: detalle.fuenteFinanciamiento,
            codigoCentroCostos: detalle.codigoCentroCostos,
            especificacionesTecnicas: detalle.especificacionesTecnicas,
            oficinaRegistro: detalle.oficinaRegistro,
            referenciaRegistro: detalle.referenciaRegistro,
            tomo: detalle.tomo,
            folio: detalle.folio,
            protocolo: detalle.protocolo,
            numeroRegistro: detalle.numeroRegistro,
            fechaRegistrado: detalle.fechaRegistrado,
            propietarioAnterior: detalle.propietarioAnterior,
            dependencias: detalle.dependencias,
            areaConstruccion: detalle.areaConstruccion,
            unidadAreaConstruccion: detalle.unidadAreaConstruccion,
            areaTerreno: detalle.areaTerreno,
            unidadAreaTerreno: detalle.unidadAreaTerreno,
            especificacionesInmueble: detalle.especificacionesTecnicas,
            perteneceASede: detalle.perteneceASede,
            sedeUbicacionId: detalle.sedeUbicacionId,
            especificacionesColor: detalle.especificacionesColor,
            numeroTituloPropiedad: detalle.numeroTituloPropiedad,
            capacidad: detalle.capacidad,
            nombre: detalle.nombre,
            usoId: detalle.usoId,
            tieneGps: detalle.tieneGps,
            especificacionesGps: detalle.especificacionesGps,
            tipoAnimalId: detalle.tipoAnimalId,
            tipoSemovienteId: detalle.tipoSemovienteId,
            genero: detalle.genero,
            propositoSemovienteId: detalle.propositoSemovienteId,
            peso: detalle.peso,
            unidadMedidaPeso: detalle.unidadMedidaPeso,
            numeroHierro: detalle.numeroHierro,
            especificacionesAnimal: detalle.especificacionesAnimal,
            fechaNacimientoAnimal: detalle.fechaNacimientoAnimal,
            razaId: detalle.razaId,
          });
        }),
        tap(activo => {
          let { depreciacion } = activo;
          this.formularioDepreciacion.patchValue({
            depreciable: depreciacion.depreciable,
            metodoDepreciacion: depreciacion.metodoDepreciacion,
            cuentaContableDebe: depreciacion.cuentaContableDebe,
            cuentaContableHaber: depreciacion.cuentaContableHaber,
            vidaUtil: depreciacion.vidaUtil,
            unidadVidaUtil: depreciacion.unidadVidaUtil,
            valorRescate: depreciacion.valorRescate,
            monedaValorRescate: depreciacion.monedaValorRescate,
          });
        }),
        tap(activo => {
          let { ubicacion } = activo;
          this.formularioUbicacion.patchValue({
            sedeId: ubicacion.sedeId,
            unidadAdministrativaId: ubicacion.unidadAdministrativaId,
            estadoUsoId: ubicacion.estadoUsoId,
            estadoConservacionId: ubicacion.estadoConservacionId,
            descripcionEstadoConservacion:
              ubicacion.descripcionEstadoConservacion,
            responsableId: ubicacion.responsableId,
            responsableUsoId: ubicacion.responsableUsoId,
          });
        }),
        tap(activo => {
          let { integracion } = activo;
          this.formularioIntegracion = this._formBuilder.group({
            modCuentaContableDebe: integracion.modCuentaContableDebe,
            modCuentaContableHaber: integracion.modCuentaContableHaber,
            desCuentaContableDebe: integracion.desCuentaContableDebe,
            desCuentaContableHaber: integracion.desCuentaContableHaber,
          });
        }),
        take(1)
      )
      .subscribe();
  }

  guardar(): void {
    let activo = this.formularioDatosGenerales.value as Activo;
    activo.detalle = this.formularioDetalles.value as ActivoDetalle;
    activo.depreciacion = this.formularioDepreciacion
      .value as ActivoDepreciacion;
    activo.ubicacion = this.formularioUbicacion.value as ActivoUbicacion;
    activo.integracion = this.formularioIntegracion.value as ActivoIntegracion;
    if (this.modoFormulario === 'CREANDO') {
      let { generarIncorporacion, generarDepreciacion, causaMovimiento } =
        this.formularioEspecial.value;
      this._activo
        .guardar(activo, this.titulo, true, {
          generarIncorporacion,
          generarDepreciacion,
          causaMovimiento,
        })
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._activo
        .actualizar(this.id, activo, this.titulo)
        .pipe(first())
        .subscribe(() => this.irAtras());
    }
  }

  borrar(): void {
    let dialog = this._dialog.open(DialogoEliminarDefinicionComponent, {
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
          this._activo.eliminar(
            this.formularioDatosGenerales.value.id,
            this.titulo,
            true
          )
        ),
        take(1)
      )
      .subscribe(() => this.irAtras());
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
