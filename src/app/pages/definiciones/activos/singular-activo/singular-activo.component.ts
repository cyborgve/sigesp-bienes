import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivoService } from '@core/services/activo.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorActivoComponent } from '../buscador-activo/buscador-activo.component';
import { Activo } from '@core/models/activo';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/correlativo.service';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Subscription } from 'rxjs';
import { ActivoComponenteService } from '@core/services/activo-componente.service';
import { ActivoDepreciacionService } from '@core/services/activo-depreciacion.service';
import { ActivoDetalleService } from '@core/services/activo-detalle.service';
import { ActivoUbicacionService } from '@core/services/activo-ubicacion.service';
import { ActivoDetalle } from '@core/models/activo-detalle';
import { ActivoComponente } from '@core/models/activo-componente';
import { ActivoDepreciacion } from '@core/models/activo-depreciacion';
import { ActivoUbicacion } from '@core/models/activo-ubicacion';

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
    private _activo: ActivoService,
    private _activoComponente: ActivoComponenteService,
    private _activoDepreciacion: ActivoDepreciacionService,
    private _activoDetalle: ActivoDetalleService,
    private _activoUbicacion: ActivoUbicacionService,
    private ActivatedRoute: ActivatedRoute,
    private Router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private Correlativo: CorrelativoService
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
      creado: [new Date()],
      modificado: [new Date()],
    });
    /* formulario detalles */
    this.formularioDetalles = this._formBuilder.group({
      empresaId: [0],
      activoId: [0],
      id: [0],
      garantia: [0],
      unidadGarantia: [''],
      inicioGarantia: [new Date()],
      finGarantia: [new Date()],
      origenId: [0],
      asegurado: [0],
      claseId: [0],
      descripcionOtraClase: [''],
      fuenteFinanciamiento: ['--'],
      codigoCentroCostos: [''],
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
      sedeUbicacionId: [0],
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
      genero: [''],
      propositoSemovienteId: [0],
      peso: [0],
      unidadMedidaPeso: [''],
      numeroHierro: [''],
      especificacionesAnimal: [''],
      tipoAnimalId: [0],
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
      depreciable: [''],
      //plantillaDepreciacion: [''],
      metodoDepreciacion: [''],
      cuentaContableGasto: [''],
      cuentaContableDepreciacion: [''],
      vidaUtil: [''],
      valorRescate: [''],
      monedaIdValorRescate: [''],
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
      this._activo
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
              modeloId: entidad.modeloId,
              anioFabricacion: entidad.anioFabricacion,
              serialFabrica: entidad.serialFabrica,
              colorId: entidad.colorId,
              categoriaId: entidad.categoriaId,
              rotulacionId: entidad.rotulacionId,
              creado: entidad.creado,
              modificado: entidad.modificado,
            })
          ),
          tap(entidad => this.formularioDetalles.patchValue({})),
          tap(entidad => this.formularioComponentes.patchValue({})),
          tap(entidad => this.formularioDepreciacion.patchValue({})),
          tap(entidad => this.formularioUbicacion.patchValue({}))
        )
        .subscribe();
    } else {
      this.Correlativo.buscarPorId(
        CORRELATIVOS.find(c => c.nombre === this.titulo).id
      )
        .pipe(
          take(1),
          tap(categoria =>
            this.formularioDatosGenerales.patchValue({
              codigo:
                categoria.serie.toString().padStart(4, '0') +
                '-' +
                categoria.correlativo.toString().padStart(8, '0'),
            })
          )
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
              monedaId: entidad.modeloId,
              modeloId: entidad.modeloId,
              anioFabricacion: entidad.anioFabricacion,
              serialFabrica: entidad.serialFabrica,
              colorId: entidad.colorId,
              rotulacionId: entidad.rotulacionId,
              categoriaId: entidad.categoriaId,
              creado: entidad.creado,
              modificado: entidad.modificado,
            })
          )
        )
        .subscribe()
    );
  }

  guardar() {
    const activoDatosGenerales: Activo = this.formularioDatosGenerales.value;
    const activoDetalle: ActivoDetalle = this.formularioDetalles.value;
    const activoComponentes: ActivoComponente =
      this.formularioComponentes.value;
    const activoDepreciacion: ActivoDepreciacion =
      this.formularioDepreciacion.value;
    const activoUbicacion: ActivoUbicacion = this.formularioUbicacion.value;

    if (this.modoFormulario === 'CREANDO') {
      this._activo
        .guardar(activoDatosGenerales)
        .pipe(
          first(),
          tap(activo => {
            activoDetalle.activoId = activo['id'];
            activoComponentes.activoId = activo['id'];
            activoDepreciacion.activoId = activo['id'];
            activoUbicacion.activoId = activo['id'];
          })
        )
        .subscribe(() => this.irAtras());
    } else {
      this._activo
        .actualizar(this.id, activoDatosGenerales)
        .pipe(
          first(),
          switchMap(() =>
            this._activoDetalle.actualizar(activoDetalle.id, activoDetalle)
          )
        )
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
