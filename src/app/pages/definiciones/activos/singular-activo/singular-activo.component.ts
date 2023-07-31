import { tap, first, take, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivoService } from '@core/services/activo.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/correlativo.service';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoDetalle } from '@core/models/definiciones/activo-detalle';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

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
      empresaId: [''],
      id: [''],
      codigo: ['AUTOGENERADO'],
      tipoActivo: ['', Validators.required],
      fechaRegistro: [new Date()],
      catalogoCuentas: ['Seleccionar'],
      serialRotulacion: [''],
      denominacion: ['', Validators.required],
      observaciones: [''],
      fechaAdquisicion: [new Date()],
      valorAdquisicion: [0],
      monedaId: ['0'],
      modeloId: [0],
      anioFabricacion: [new Date().getFullYear()],
      serialFabrica: [''],
      colorId: [0],
      rotulacionId: [0],
      categoriaId: [0],
      detalle: [{}],
      componentes: [[]],
      depreciacion: [{}],
      ubicacion: [{}],
      creado: [new Date()],
      modificado: [new Date()],
    });

    this.formularioDetalles = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      activoId: [0],
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
      tipoAnimalId: [0],
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

    this.formularioComponentes = this._formBuilder.group({
      componentes: [[]],
    });

    this.formularioDepreciacion = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      activoId: [0],
      depreciable: [0],
      metodoDepreciacion: ['SELECCIONAR', Validators.required],
      cuentaContableGasto: ['--', Validators.required],
      cuentaContableDepreciacion: ['--', Validators.required],
      vidaUtil: [0, Validators.required],
      unidadVidaUtil: ['', Validators.required],
      valorRescate: [0, Validators.required],
      monedaValorRescate: ['0', Validators.required],
      creado: [new Date()],
      modificado: [new Date()],
    });

    this.formularioUbicacion = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      activoId: [0],
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

    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
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
              detalle: activo.detalle,
              componentes: activo.componentes,
              depreciacion: activo.depreciacion,
              ubicacion: activo.ubicacion,
              creado: activo.creado,
              modificado: activo.modificado,
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
              codigo: `${ser}-${cor}`,
            });
          }),
          take(1)
        )
        .subscribe();
    }
  }

  importar(): void {
    throw new Error('Method not implemented.');
  }

  guardar(): void {
    let activo = this.formularioDatosGenerales.value as Activo;
    activo.detalle = this.formularioDetalles.value as ActivoDetalle;
    activo.depreciacion = this.formularioDepreciacion
      .value as ActivoDepreciacion;
    activo.ubicacion = this.formularioUbicacion.value as ActivoUbicacion;
    if (this.modoFormulario === 'CREANDO') {
      this._activo
        .guardar(activo, this.titulo)
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
          this._activo.eliminar(
            this.formularioDatosGenerales.value.id,
            this.titulo.toUpperCase()
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
