import { tap, take, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
import { MatTableDataSource } from '@angular/material/table';
import { Basica } from '@core/models/auxiliares/basica';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { Activo } from '@core/models/definiciones/activo';
import { convertirUnidadTiempo } from '@core/utils/funciones/convertir-unidad-tiempo';
import {
  calcularDepreciacion,
  proyectarDepreciacion,
} from '@core/utils/funciones/calcular-depreciacion';
import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';

@Component({
  selector: 'app-singular-depreciacion',
  templateUrl: './singular-depreciacion.component.html',
  styleUrls: ['./singular-depreciacion.component.scss'],
})
export class SingularDepreciacionComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[32].nombre;
  formulario: FormGroup;
  metodosDepreciacion = METODOS_DEPRECIACION;
  dataSource: MatTableDataSource<DetalleDepreciacion> =
    new MatTableDataSource();

  constructor(
    private _entidad: DepreciacionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _activo: ActivoService
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
          switchMap(depreciacion =>
            this._entidad.buscarTodosPorActivo(depreciacion.activo)
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

  importar() {
    let dialog = this._dialog.open(BuscadorDepreciacionComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        switchMap((depreciacion: Basica) =>
          depreciacion ? this._entidad.buscarPorId(depreciacion.id) : undefined
        ),
        tap(entidad =>
          entidad
            ? this.formulario.patchValue({
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
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad: Depreciacion = this.formulario.value;
    entidad.vidaUtil = Number(entidad.vidaUtil.toString().split(' ')[0]);
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad, this.titulo)
        .pipe(first())
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
    });
    dialog
      .afterClosed()
      .pipe(
        switchMap((activoParcial: Activo) =>
          this._activo.buscarPorId(activoParcial.id)
        ),
        tap(activo => {
          let vidaUtilMeses = convertirUnidadTiempo(
            activo.depreciacion.vidaUtil,
            activo.depreciacion.unidadVidaUtil,
            'MESES'
          );
          let vidaUtilAnios = convertirUnidadTiempo(
            activo.depreciacion.vidaUtil,
            activo.depreciacion.unidadVidaUtil,
            'AÑOS'
          );
          let metodoDepreciacionAux = METODOS_DEPRECIACION.find(
            md => md.substring(0, 3) === activo.depreciacion.metodoDepreciacion
          );
          let tiempoAux =
            (new Date().getTime() -
              new Date(activo.fechaAdquisicion).getTime()) /
            (1000 * 60 * 60 * 24 * 30.44);
          let depreciacionTotal = calcularDepreciacion(
            activo.valorAdquisicion,
            vidaUtilAnios,
            metodoDepreciacionAux,
            tiempoAux,
            true,
            activo.depreciacion.valorRescate
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
            montoDepreciar: depreciacionTotal,
            vidaUtil: vidaUtilMeses + ' Meses',
            depreciacionMensual: depreciacionTotal / tiempoAux,
            depreciacionAnual: (depreciacionTotal / tiempoAux) * 12,
            observaciones:
              tiempoAux.toFixed(2) +
              ' meses trancurridos desde la fecha de compra.',
          });
          let proyeccion = proyectarDepreciacion(
            activo.valorAdquisicion,
            vidaUtilMeses,
            metodoDepreciacionAux,
            true,
            activo.depreciacion.valorRescate
          );
          this.dataSource = new MatTableDataSource(proyeccion);
        }),
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
