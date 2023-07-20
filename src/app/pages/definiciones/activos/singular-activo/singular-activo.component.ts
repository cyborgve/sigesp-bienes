import { AdaptadorBoolean } from '@core/types/adaptadorBoolean';
import { take, tap, first, filter, switchMap, mergeMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivoService } from '@core/services/activo.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorActivoComponent } from '../buscador-activo/buscador-activo.component';
import { Activo } from '@core/models/definiciones/activo';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/correlativo.service';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Subscription } from 'rxjs';
import { ActivoComponenteService } from '@core/services/activo-componente.service';
import { ActivoDepreciacionService } from '@core/services/activo-depreciacion.service';
import { ActivoDetalleService } from '@core/services/activo-detalle.service';
import { ActivoUbicacionService } from '@core/services/activo-ubicacion.service';
import { ActivoDetalle } from '@core/models/definiciones/activo-detalle';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';

type DepreciacionAdaptada = AdaptadorBoolean<ActivoDepreciacion, 'depreciable'>;

@Component({
  selector: 'app-singular-activo',
  templateUrl: './singular-activo.component.html',
  styleUrls: ['./singular-activo.component.scss'],
})
export class SingularActivoComponent implements Entidad, OnDestroy {
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[0]['nombre'];

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
    private ActivatedRoute: ActivatedRoute,
    private Router: Router,
    private _activo: ActivoService,
    private _activoComponente: ActivoComponenteService,
    private _activoDepreciacion: ActivoDepreciacionService,
    private _activoDetalle: ActivoDetalleService,
    private _activoUbicacion: ActivoUbicacionService,
    private _correlativo: CorrelativoService,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _location: Location
  ) {
    this.id = this.ActivatedRoute.snapshot.params['id'];

    /* formulario datos generales */
    this.formularioDatosGenerales = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      codigo: ['autogenerado'],
      tipoActivo: ['', Validators.required],
      fechaRegistro: [new Date()],
      catalogoCuentas: ['Seleccionar'],
      serialRotulacion: [''],
      denominacion: ['', Validators.required],
      observaciones: [''],
      fechaAdquisicion: [new Date()],
      valorAdquisicion: [0],
      monedaId: [0],
      modeloId: [0],
      anioFabricacion: [String(new Date().getFullYear())],
      serialFabrica: [''],
      colorId: [0],
      rotulacionId: [0],
      categoriaId: [0],
      activosDetalleId: [0],
      activosDepreciacionId: [0],
      activosUbicacionId: [0],
      creado: [new Date()],
      modificado: [new Date()],
    });

    /* formulario detalles */
    this.formularioDetalles = this._formBuilder.group({
      empresaId: [0],
      id: [0],
      garantia: [0],
      unidadGarantia: [''],
      inicioGarantia: [new Date()],
      finGarantia: [new Date()],
      asegurado: [0],
      claseId: [0],
      origenId: [0],
      descripcionOtraClase: [''],
      fuenteFinanciamiento: ['--'],
      codigoCentroCostos: ['--'],
      especificacionesTecnicas: [''],
      oficinaRegistro: [''],
      referenciaRegistro: [''],
      tomo: [''],
      folio: [''],
      protocolo: [''],
      numeroRegistro: [''],
      fechaRegistrado: [new Date()],
      propietarioAnterior: [''],
      dependencias: [''],
      areaConstruccion: [0],
      unidadAreaConstruccion: [''],
      areaTerreno: [0],
      unidadAreaTerreno: [''],
      especificacionesInmueble: [''],
      perteneceASede: [0],
      especificacionesColor: [''],
      serialCarroceria: [''],
      serialMotor: [''],
      placas: [''],
      numeroTituloPropiedad: [''],
      capacidad: [''],
      nombre: [''],
      usoId: [0],
      tieneGps: [0],
      especificacionesGps: [''],
      tipoSemovienteId: [0],
      genero: ['S'],
      propositoSemovienteId: [0],
      peso: [0],
      unidadMedidaPeso: [''],
      numeroHierro: [''],
      especificacionesAnimal: [''],
      fechaNacimientoAnimal: [new Date()],
      razaId: [0],
      creado: [new Date()],
      modificado: [new Date()],
    });

    /* formulario componentes */
    this.formularioComponentes = this._formBuilder.group({
      componentes: [[]],
    });

    /* formulario depreciacion */
    this.formularioDepreciacion = this._formBuilder.group({
      empresaId: [0],
      id: [0],
      depreciable: [false],
      metodoDepreciacion: [''],
      cuentaContableGasto: ['---'],
      cuentaContableDepreciacion: ['---'],
      vidaUtil: [0],
      unidadVidaUtil: [''],
      valorRescate: [0],
      monedaIdValorRescate: [0],
      creado: [new Date()],
      modificado: [new Date()],
    });

    /* formulario ubicacion */
    this.formularioUbicacion = this._formBuilder.group({
      empresaId: [0],
      id: [0],
      sedeId: [0],
      unidadAdministrativaId: [0],
      fechaIngreso: [new Date()],
      estadoUsoId: [0],
      estadoConservacionId: [0],
      descripcionEstadoConservacion: [''],
      responsableId: [0],
      responsableUsoId: [0],
      creado: [new Date()],
      modificado: [new Date()],
    });
    this.actualizarFormularios();
  }

  private actualizarFormularios() {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._activo
        .buscarPorId(this.id)
        .pipe(
          take(1),
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
              categoriaId: activo.categoriaId,
              rotulacionId: activo.rotulacionId,
              activosDetalleId: activo.activosDetalleId,
              activosDepreciacionId: activo.activosDepreciacionId,
              activosUbicacionId: activo.activosUbicacionId,
              creado: activo.creado,
              modificado: activo.modificado,
            })
          ),
          switchMap((activo: Activo) =>
            this._activoDetalle.buscarPorId(activo.activosDetalleId)
          ),
          tap(detalle =>
            this.formularioDetalles.patchValue({
              empresaId: detalle.empresaId,
              id: detalle.id,
              garantia: detalle.garantia,
              unidadGarantia: detalle.unidadGarantia,
              inicioGarantia: detalle.iniciogarantia,
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
              especificacionesInmueble: detalle.especificacionesInmueble,
              perteneceASede: detalle.perteneceASede,
              especificacionesColor: detalle.especificacionesColor,
              serialCarroceria: detalle.serialCarroceria,
              serialMotor: detalle.serialMotor,
              placas: detalle.placas,
              numeroTituloPropiedad: detalle.numeroTituloPropiedad,
              capacidad: detalle.capacidad,
              nombre: detalle.nombre,
              usoId: detalle.usoId,
              tieneGPS: detalle.tieneGps,
              especificacionesGPS: detalle.especificacionesGps,
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
            })
          ),
          switchMap(() =>
            this._activoDepreciacion.buscarPorId(
              this.formularioDatosGenerales.value
            )
          )
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
              codigo: `${ser}-${cor}`,
            });
          }),
          take(1)
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  importar() {
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((entidad: Activo) =>
            entidad
              ? this.formularioDatosGenerales.patchValue({
                  tipoActivo: entidad.tipoActivo,
                  fechaRegistro: entidad.fechaRegistro,
                  catalogoCuentas: entidad.catalogoCuentas,
                  serialRotulacion: entidad.serialRotulacion,
                  denominacion: entidad.denominacion,
                  observaciones: entidad.observaciones,
                  fechaAdquisicion: entidad.fechaAdquisicion,
                  valorAdquisicion: entidad.valorAdquisicion,
                  monedaId: entidad.modeloId,
                  modeloId: entidad.modeloId,
                  anioFabricacion: entidad.anioFabricacion,
                  serialFabrica: entidad.serialFabrica,
                  colorId: entidad.colorId,
                  rotulacionId: entidad.rotulacionId,
                  categoriaId: entidad.categoriaId,
                })
              : undefined
          )
        )
        .subscribe()
    );
  }

  guardar() {
    const activoDatosGenerales = this.formularioDatosGenerales.value;
    if (this.modoFormulario === 'CREANDO') {
      this._activo
        .guardar(activoDatosGenerales, this.titulo)
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._activo
        .actualizar(this.id, activoDatosGenerales)
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
          this._activo.eliminar(this.formularioDatosGenerales.value.id)
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
    this.Router.navigate(['/definiciones']);
  }

  salir() {
    throw new Error('Method not implemented.');
  }
}
