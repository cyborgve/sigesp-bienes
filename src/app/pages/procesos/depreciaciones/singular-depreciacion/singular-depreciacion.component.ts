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
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';
import { MatTableDataSource } from '@angular/material/table';
import { DepreciacionDetalle } from '@core/models/procesos/depreciacion';
import { DepreciacionDetalleService } from '@core/services/procesos/depreciacion-detalle.service';
import { Basica } from '@core/models/auxiliares/basica';
import { ActivoCompleto } from '@core/models/auxiliares/activo-completo';

@Component({
  selector: 'app-singular-depreciacion',
  templateUrl: './singular-depreciacion.component.html',
  styleUrls: ['./singular-depreciacion.component.scss'],
})
export class SingularDepreciacionComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[31].nombre;
  formulario: FormGroup;
  metodosDepreciacion = METODOS_DEPRECIACION;
  dataSource: MatTableDataSource<DepreciacionDetalle> =
    new MatTableDataSource();

  constructor(
    private _entidad: DepreciacionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _depreciacionDetalle: DepreciacionDetalleService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      comprobante: ['AUTOGENERADO'],
      activo: ['', Validators.required],
      serial: [''],
      identificador: [''],
      fechaCompra: [''],
      fechaIncorporacion: [''],
      metodo: [''],
      costo: [0],
      valorRescate: [0],
      montoDepreciar: [0],
      vidaUtil: [0],
      depreciacionMensual: [0],
      depreciacionAnual: [0],
      observaciones: [''],
      detalles: [[]],
      creado: [new Date()],
      modificado: [new Date()],
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
            this._depreciacionDetalle.buscarPorId(depreciacion.id)
          ),
          tap(detalles => this.formulario.patchValue({ detalles: detalles })),
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
              comprobante: `${ser}-${doc}`,
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
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad, this.titulo.toUpperCase())
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._entidad
        .actualizar(this.id, entidad, this.titulo.toUpperCase())
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
        switchMap(() =>
          this._entidad.eliminar(
            this.formulario.value.id,
            this.titulo.toUpperCase()
          )
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
    dialog.afterClosed().pipe(
      tap((activo: ActivoCompleto) => {
        if (activo) {
          this.formulario.patchValue({
            activo: activo.id,
            identificador: activo.serialRotulacion,
            serial: activo.serialFabrica,
            fechaCompra: activo.fechaAdquisicion,
            costo: activo.valorAdquisicion,
            valorRescate: activo.valorRescate,
            vidaUtil: activo.vidaUtil,
          });
        }
      })
    );
  }
}
