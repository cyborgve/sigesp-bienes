import { tap, take, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorDepreciacionComponent } from '../buscador-depreciacion/buscador-depreciacion.component';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Basica } from '@core/models/auxiliares/basica';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { Activo } from '@core/models/definiciones/activo';
import { convertirUnidadTiempo } from '@core/utils/funciones/convertir-unidad-tiempo';
import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';
import { calcularDepreciacion } from '@core/utils/funciones/depreciacion';
import moment from 'moment';
import { MonedaService } from '@core/services/otros-modulos/moneda.service';
import { filtrarActivosIncorporados } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-incoporados';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { ActivoDepreciacionService } from '@core/services/definiciones/activo-depreciacion.service';
import { filtrarActivosDepreciables } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-depreciables';
import { filtrarActivosSinDepreciacion } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-sin-depreciacion';
import { PDFService } from '@core/services/auxiliares/pdf.service';
import { normalizarMetodoDepreciacion } from '@core/utils/funciones/normalizar-metodo-depreciacion';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-singular-depreciacion',
  templateUrl: './singular-depreciacion.component.html',
  styleUrls: ['./singular-depreciacion.component.scss'],
})
export class SingularDepreciacionComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[32].nombre;
  formulario: UntypedFormGroup;
  metodosDepreciacion = METODOS_DEPRECIACION;
  dataSource: MatTableDataSource<DetalleDepreciacion> =
    new MatTableDataSource();
  monedaIso: string = 'VES';

  constructor(
    private _entidad: DepreciacionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: UntypedFormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _activo: ActivoService,
    private _activoUbicacion: ActivoUbicacionService,
    private _activoDepreciacion: ActivoDepreciacionService,
    private _moneda: MonedaService,
    private _depreciacion: DepreciacionService,
    private _pdf: PDFService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      comprobante: [undefined],
      activo: [undefined, Validators.required],
      serial: [undefined],
      identificador: [undefined],
      fechaCompra: [undefined],
      fechaIncorporacion: [undefined],
      metodo: [undefined],
      costo: [undefined],
      moneda: [undefined],
      valorRescate: [undefined],
      montoDepreciar: [undefined],
      vidaUtil: [undefined],
      depreciacionMensual: [undefined],
      depreciacionAnual: [undefined],
      observaciones: [undefined],
      detalles: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  private actualizarFormulario() {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._entidad
        .buscarPorId(this.id)
        .pipe(
          tap(entidad =>
            this.formulario.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              comprobante: entidad.comprobante,
              activo: entidad.activo,
              serial: entidad.serial,
              identificador: entidad.identificador,
              fechaCompra: entidad.fechaCompra,
              fechaIncorporacion: entidad.fechaIncorporacion,
              metodo: entidad.metodo,
              costo: entidad.costo,
              valorRescate: entidad.valorRescate,
              montoDepreciar: entidad.montoDepreciar,
              vidaUtil: entidad.vidaUtil,
              depreciacionMensual: entidad.depreciacionMensual,
              depreciacionAnual: entidad.depreciacionAnual,
              observaciones: entidad.observaciones,
              creado: entidad.creado,
              modificado: entidad.modificado,
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
            let doc = correlativo.correlativo.toString().padStart(8, '0');
            this.formulario.patchValue({
              empresaId: 0,
              id: 0,
              comprobante: `${ser}-${doc}`,
              activo: 0,
              serial: '',
              identificador: '',
              fechaCompra: undefined,
              fechaIncorporacion: undefined,
              metodo: '',
              costo: 0,
              valorRescate: 0,
              montoDepreciar: 0,
              vidaUtil: 0,
              depreciacionMensual: 0,
              depreciacionAnual: 0,
              observaciones: '',
              detalles: [],
              creado: new Date(),
              modificado: new Date(),
            });
          }),
          take(1)
        )
        .subscribe();
    }
  }

  deshabilitarGuardar = () => Number(this.formulario.value.activo) === 0;

  importar() {
    let dialog = this._dialog.open(BuscadorDepreciacionComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap((depreciacion: Basica) =>
          this._entidad.buscarPorId(depreciacion.id)
        ),
        tap(entidad =>
          this.formulario.patchValue({
            activo: entidad.activo,
            serial: entidad.serial,
            identificador: entidad.identificador,
            fechaCompra: entidad.fechaCompra,
            fechaIncorporacion: entidad.fechaIncorporacion,
            metodo: entidad.metodo,
            costo: entidad.costo,
            valorRescate: entidad.valorRescate,
            montoDepreciar: entidad.montoDepreciar,
            vidaUtil: entidad.vidaUtil,
            depreciacionMensual: entidad.depreciacionMensual,
            depreciacionAnual: entidad.depreciacionAnual,
            observaciones: entidad.observaciones,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad: Depreciacion = this.formulario.value;
    entidad.vidaUtil = Number(entidad.vidaUtil.toString().split(' ')[0]);
    entidad.detalles = this.dataSource.data;
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad, this.titulo)
        .pipe(
          switchMap(depreciacion =>
            this._pdf.abrirReporte(depreciacion, 'DEPRECIACIÓN')
          ),
          first()
        )
        .subscribe(depreciacion =>
          depreciacion ? this.reiniciarFormulario() : undefined
        );
    } else {
      this._entidad
        .actualizar(this.id, entidad, this.titulo)
        .pipe(first())
        .subscribe(() => this.irAtras());
    }
  }

  borrar() {
    let dialog = this._dialog.open(DialogoEliminarDefinicionComponent, {
      data: {
        codigo: this.formulario.value.codigo,
        denominacion: this.formulario.value.denominacion,
      },
    });
    dialog
      .beforeClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() =>
          this._entidad.eliminar(this.formulario.value.id, this.titulo)
        ),
        take(1)
      )
      .subscribe(() => this.irAtras());
  }

  buscar() {
    this._router.navigate(['/procesos/depreciaciones']);
  }

  imprimir() {
    throw new Error('Method not implemented.');
  }

  irAtras() {
    this._location.back();
  }
  irAlInicio() {
    this._router.navigate(['/procesos']);
  }

  salir() {
    throw new Error('Method not implemented.');
  }

  buscarActivo() {
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      height: '95%',
      width: '85%',
      data: {
        filtros: [
          filtrarActivosSinDepreciacion(this._depreciacion),
          filtrarActivosDepreciables(this._activoDepreciacion),
        ],
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.activo),
        switchMap((activoParcial: Activo) =>
          this._activo.buscarPorId(activoParcial.id)
        ),
        tap(activo => {
          let depreciacionCalculada = calcularDepreciacion(
            activo.valorAdquisicion,
            activo.fechaAdquisicion,
            activo.depreciacion.vidaUtil,
            activo.depreciacion.unidadVidaUtil,
            activo.depreciacion.valorRescate,
            normalizarMetodoDepreciacion(activo.depreciacion.metodoDepreciacion)
          );

          this.formulario.patchValue({
            activo: activo.id,
            serial: activo.serialFabrica,
            identificador: activo.serialRotulacion,
            fechaCompra: activo.fechaAdquisicion,
            fechaIncorporacion: activo.detalle.fechaRegistrado,
            metodo: activo.depreciacion.metodoDepreciacion,
            costo: activo.valorAdquisicion,
            valorRescate: activo.depreciacion.valorRescate,
            montoDepreciar:
              activo.valorAdquisicion - activo.depreciacion.valorRescate,
            vidaUtil:
              convertirUnidadTiempo(
                activo.depreciacion.vidaUtil,
                activo.depreciacion.unidadVidaUtil,
                'meses'
              ) + ' Meses',
            depreciacionMensual: depreciacionCalculada.mensual,
            depreciacionAnual: depreciacionCalculada.anual,
            observaciones:
              moment(new Date()).diff(
                activo.fechaAdquisicion,
                'months',
                false
              ) + ' meses trancurridos desde la fecha de compra.',
          });
          this.dataSource = new MatTableDataSource(
            depreciacionCalculada.detalles
          );
        }),
        switchMap(activo => this._moneda.buscarPorId(activo.monedaId)),
        tap(moneda => (this.monedaIso = moneda.iso)),
        take(1)
      )
      .subscribe();
  }

  private reiniciarFormulario() {
    this.formulario.reset();
    this.dataSource = new MatTableDataSource();
    this.actualizarFormulario();
  }
}
