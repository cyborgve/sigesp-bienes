import { Basica } from '@core/models/auxiliares/basica';
import { tap, first, take, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

@Component({
  selector: 'app-singular-activo',
  templateUrl: './singular-activo.component.html',
  styleUrls: ['./singular-activo.component.scss'],
})
export class SingularActivoComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[0]['nombre'];

  formularioDatosGenerales: FormGroup;
  formularioDetalles: FormGroup;
  formularioComponentes: FormGroup;
  formularioDepreciacion: FormGroup;
  formularioUbicacion: FormGroup;
  formularioEspecial: FormGroup;

  tabLabels = [
    'datos generales',
    'detalles',
    'componentes',
    'depreciación',
    'ubicación',
  ];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _activo: ActivoService,
    private _correlativo: CorrelativoService,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
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
      cuentaContableGasto: [undefined, Validators.required],
      cuentaContableDepreciacion: [undefined, Validators.required],
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
          tap(activo =>
            this.formularioDetalles.patchValue({
              empresaId: activo.detalle.empresaId,
              id: activo.detalle.id,
              activoId: activo.detalle.activoId,
              garantia: activo.detalle.garantia,
              unidadGarantia: activo.detalle.unidadGarantia,
              inicioGarantia: activo.detalle.inicioGarantia,
              finGarantia: activo.detalle.finGarantia,
              asegurado: activo.detalle.asegurado,
              claseId: activo.detalle.claseId,
              origenId: activo.detalle.origenId,
              descripcionOtraClase: activo.detalle.descripcionOtraClase,
              fuenteFinanciamiento: activo.detalle.fuenteFinanciamiento,
              codigoCentroCostos: activo.detalle.codigoCentroCostos,
              especificacionesTecnicas: activo.detalle.especificacionesTecnicas,
              oficinaRegistro: activo.detalle.oficinaRegistro,
              referenciaRegistro: activo.detalle.referenciaRegistro,
              tomo: activo.detalle.tomo,
              folio: activo.detalle.folio,
              protocolo: activo.detalle.protocolo,
              numeroRegistro: activo.detalle.numeroRegistro,
              fechaRegistrado: activo.detalle.fechaRegistrado,
              propietarioAnterior: activo.detalle.propietarioAnterior,
              dependencias: activo.detalle.dependencias,
              areaConstruccion: activo.detalle.areaConstruccion,
              unidadAreaConstruccion: activo.detalle.unidadAreaConstruccion,
              areaTerreno: activo.detalle.areaTerreno,
              unidadAreaTerreno: activo.detalle.unidadAreaTerreno,
              especificacionesInmueble: activo.detalle.especificacionesTecnicas,
              perteneceASede: activo.detalle.perteneceASede,
              sedeUbicacionId: activo.detalle.sedeUbicacionId,
              especificacionesColor: activo.detalle.especificacionesColor,
              serialCarroceria: activo.detalle.serialCarroceria,
              serialMotor: activo.detalle.serialMotor,
              placas: activo.detalle.placas,
              numeroTituloPropiedad: activo.detalle.numeroTituloPropiedad,
              capacidad: activo.detalle.capacidad,
              nombre: activo.detalle.nombre,
              usoId: activo.detalle.usoId,
              tieneGps: activo.detalle.tieneGps,
              especificacionesGps: activo.detalle.especificacionesGps,
              tipoAnimalId: activo.detalle.tipoAnimalId,
              tipoSemovienteId: activo.detalle.tipoSemovienteId,
              genero: activo.detalle.genero,
              propositoSemovienteId: activo.detalle.propositoSemovienteId,
              peso: activo.detalle.peso,
              unidadMedidaPeso: activo.detalle.unidadMedidaPeso,
              numeroHierro: activo.detalle.numeroHierro,
              especificacionesAnimal: activo.detalle.especificacionesAnimal,
              fechaNacimientoAnimal: activo.detalle.fechaNacimientoAnimal,
              razaId: activo.detalle.razaId,
              creado: activo.detalle.creado,
              modificado: activo.detalle.modificado,
            })
          ),
          tap(activo =>
            this.formularioComponentes.patchValue({
              componentes: activo.componentes,
            })
          ),
          tap(activo =>
            this.formularioDepreciacion.patchValue({
              empresaId: activo.depreciacion.empresaId,
              id: activo.depreciacion.id,
              activoId: activo.depreciacion.activoId,
              depreciable: activo.depreciacion.depreciable,
              metodoDepreciacion: activo.depreciacion.metodoDepreciacion,
              cuentaContableGasto: activo.depreciacion.cuentaContableGasto,
              cuentaContableDepreciacion:
                activo.depreciacion.cuentaContableDepreciacion,
              vidaUtil: activo.depreciacion.vidaUtil,
              unidadVidaUtil: activo.depreciacion.unidadVidaUtil,
              valorRescate: activo.depreciacion.valorRescate,
              monedaValorRescate: activo.depreciacion.monedaValorRescate,
              creado: activo.depreciacion.creado,
              modificado: activo.depreciacion.modificado,
            })
          ),
          tap(activo =>
            this.formularioUbicacion.patchValue({
              empresaId: activo.ubicacion.empresaId,
              id: activo.ubicacion.id,
              activoId: activo.ubicacion.activoId,
              sedeId: activo.ubicacion.sedeId,
              unidadAdministrativaId: activo.ubicacion.unidadAdministrativaId,
              fechaIngreso: activo.ubicacion.fechaIngreso,
              estadoUsoId: activo.ubicacion.estadoUsoId,
              estadoConservacionId: activo.ubicacion.estadoConservacionId,
              descripcionEstadoConservacion:
                activo.ubicacion.descripcionEstadoConservacion,
              responsableId: activo.ubicacion.responsableId,
              responsableUsoId: activo.ubicacion.responsableUsoId,
              creado: activo.ubicacion.creado,
              modificado: activo.ubicacion.modificado,
            })
          ),
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
            return this.formularioDatosGenerales.patchValue({
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
              cuentaContableGasto: '--',
              cuentaContableDepreciacion: '--',
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
        tap(activo =>
          this.formularioDetalles.patchValue({
            garantia: activo.detalle.garantia,
            unidadGarantia: activo.detalle.unidadGarantia,
            claseId: activo.detalle.claseId,
            origenId: activo.detalle.origenId,
            descripcionOtraClase: activo.detalle.descripcionOtraClase,
            fuenteFinanciamiento: activo.detalle.fuenteFinanciamiento,
            codigoCentroCostos: activo.detalle.codigoCentroCostos,
            especificacionesTecnicas: activo.detalle.especificacionesTecnicas,
            oficinaRegistro: activo.detalle.oficinaRegistro,
            referenciaRegistro: activo.detalle.referenciaRegistro,
            tomo: activo.detalle.tomo,
            folio: activo.detalle.folio,
            protocolo: activo.detalle.protocolo,
            numeroRegistro: activo.detalle.numeroRegistro,
            fechaRegistrado: activo.detalle.fechaRegistrado,
            propietarioAnterior: activo.detalle.propietarioAnterior,
            dependencias: activo.detalle.dependencias,
            areaConstruccion: activo.detalle.areaConstruccion,
            unidadAreaConstruccion: activo.detalle.unidadAreaConstruccion,
            areaTerreno: activo.detalle.areaTerreno,
            unidadAreaTerreno: activo.detalle.unidadAreaTerreno,
            especificacionesInmueble: activo.detalle.especificacionesTecnicas,
            perteneceASede: activo.detalle.perteneceASede,
            sedeUbicacionId: activo.detalle.sedeUbicacionId,
            especificacionesColor: activo.detalle.especificacionesColor,
            numeroTituloPropiedad: activo.detalle.numeroTituloPropiedad,
            capacidad: activo.detalle.capacidad,
            nombre: activo.detalle.nombre,
            usoId: activo.detalle.usoId,
            tieneGps: activo.detalle.tieneGps,
            especificacionesGps: activo.detalle.especificacionesGps,
            tipoAnimalId: activo.detalle.tipoAnimalId,
            tipoSemovienteId: activo.detalle.tipoSemovienteId,
            genero: activo.detalle.genero,
            propositoSemovienteId: activo.detalle.propositoSemovienteId,
            peso: activo.detalle.peso,
            unidadMedidaPeso: activo.detalle.unidadMedidaPeso,
            numeroHierro: activo.detalle.numeroHierro,
            especificacionesAnimal: activo.detalle.especificacionesAnimal,
            fechaNacimientoAnimal: activo.detalle.fechaNacimientoAnimal,
            razaId: activo.detalle.razaId,
          })
        ),
        tap(activo =>
          this.formularioDepreciacion.patchValue({
            depreciable: activo.depreciacion.depreciable,
            metodoDepreciacion: activo.depreciacion.metodoDepreciacion,
            cuentaContableGasto: activo.depreciacion.cuentaContableGasto,
            cuentaContableDepreciacion:
              activo.depreciacion.cuentaContableDepreciacion,
            vidaUtil: activo.depreciacion.vidaUtil,
            unidadVidaUtil: activo.depreciacion.unidadVidaUtil,
            valorRescate: activo.depreciacion.valorRescate,
            monedaValorRescate: activo.depreciacion.monedaValorRescate,
          })
        ),
        tap(activo =>
          this.formularioUbicacion.patchValue({
            sedeId: activo.ubicacion.sedeId,
            unidadAdministrativaId: activo.ubicacion.unidadAdministrativaId,
            estadoUsoId: activo.ubicacion.estadoUsoId,
            estadoConservacionId: activo.ubicacion.estadoConservacionId,
            descripcionEstadoConservacion:
              activo.ubicacion.descripcionEstadoConservacion,
            responsableId: activo.ubicacion.responsableId,
            responsableUsoId: activo.ubicacion.responsableUsoId,
          })
        ),
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
