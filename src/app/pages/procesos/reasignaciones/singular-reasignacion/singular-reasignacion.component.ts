import { tap, take, switchMap, first, filter, map } from 'rxjs/operators';
import { pipe } from 'rxjs';
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
import { ReasignacionService } from '@core/services/procesos/reasignacion.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorReasignacionComponent } from '../buscador-reasignacion/buscador-reasignacion.component';
import { Basica } from '@core/models/auxiliares/basica';
import { Reasignacion } from '@core/models/procesos/reasignacion';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorCausaMovimientoComponent } from '@pages/definiciones/causas-movimiento/buscador-causa-movimiento/buscador-causa-movimiento.component';
import { CausaMovimiento } from '@core/models/definiciones/causa-movimiento';
import { BuscadorSedeComponent } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.component';
import { Sede } from '@core/models/definiciones/sede';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';
import { Responsable } from '@core/models/otros-modulos/responsable';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';
import { ActivoProcesoReasignacion } from '@core/models/auxiliares/activo-proceso-reasignacion';
import { convertirActivoProcesoReasignacion } from '@core/utils/funciones/convertir-activo-proceso-reasignacion';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';

@Component({
  selector: 'app-singular-reasignacion',
  templateUrl: './singular-reasignacion.component.html',
  styleUrls: ['./singular-reasignacion.component.scss'],
})
export class SingularReasignacionComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[37].nombre;
  formulario: UntypedFormGroup;
  dataSource: MatTableDataSource<ActivoProcesoReasignacion> =
    new MatTableDataSource();

  constructor(
    private _entidad: ReasignacionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: UntypedFormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _activoUbicacion: ActivoUbicacionService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      comprobante: [undefined],
      causaMovimiento: [undefined, Validators.required],
      responsablePrimario: [undefined, Validators.required],
      responsableUso: [undefined, Validators.required],
      sede: [undefined, Validators.required],
      fechaEntrega: [undefined],
      observaciones: [undefined],
      activos: [[]],
      creado: [undefined],
      modificado: [undefined],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  agregarActivosDeshabilitado = () =>
    this.formulario.value.causaMovimiento === 0 ||
    this.formulario.value.sede === 0 ||
    this.formulario.value.responsablePrimario === '---' ||
    this.formulario.value.responsableUsi === '---';

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
              causaMovimiento: entidad.causaMovimiento,
              responsablePrimario: entidad.responsablePrimario,
              responsableUso: entidad.responsableUso,
              sede: entidad.sede,
              fechaEntrega: entidad.fechaEntrega,
              observaciones: entidad.observaciones,
              activos: entidad.activos,
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
              causaMovimiento: 0,
              responsablePrimario: '---',
              responsableUso: '---',
              sede: 0,
              fechaEntrega: new Date(),
              observaciones: '',
              activos: [],
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
    let dialog = this._dialog.open(BuscadorReasignacionComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap((modificacion: Basica) =>
          this._entidad.buscarPorId(modificacion.id)
        ),
        tap(entidad =>
          this.formulario.patchValue({
            causaMovimiento: entidad.causaMovimiento,
            responsablePrimario: entidad.responsablePrimario,
            responsableUso: entidad.responsableUso,
            sede: entidad.sede,
            observaciones: entidad.observaciones,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad: Reasignacion = this.formulario.value;
    entidad.activos = this.dataSource.data;
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad, this.titulo.toUpperCase())
        .pipe(first(), tap())
        .subscribe(() => this.reiniciarFormulario());
    } else {
      this._entidad
        .actualizar(this.id, entidad, this.titulo.toUpperCase())
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
          this._entidad.eliminar(
            this.formulario.value.id,
            this.titulo.toUpperCase()
          )
        ),
        take(1)
      )
      .subscribe(() => this.irAtras());
  }

  buscar() {
    this._router.navigate(['/procesos/reasignaciones']);
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

  reiniciarFormulario() {
    this.formulario.reset();
    this.dataSource = new MatTableDataSource();
    this.actualizarFormulario();
  }

  agregarActivo() {
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap((activo: Activo) =>
          this._activoUbicacion.buscarPorActivo(activo.id).pipe(
            tap(activoUbicacion => {
              this.dataSource = new MatTableDataSource([
                ...this.dataSource.data,
                convertirActivoProcesoReasignacion(activo, {
                  responsableAnterior: activoUbicacion.responsableId,
                  responsableUsoAnterior: activoUbicacion.responsableUsoId,
                }),
              ]);
            })
          )
        ),
        take(1)
      )
      .subscribe();
  }

  removerActivo(activoProceso: ActivoProcesoReasignacion) {
    this.dataSource.data.splice(this.dataSource.data.indexOf(activoProceso), 1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  buscarCausaMovimiento() {
    const filtroCausas = () =>
      pipe(
        map((causas: CausaMovimiento[]) =>
          causas.filter(causa => causa.tipo === 'R')
        )
      );
    let dialog = this._dialog.open(BuscadorCausaMovimientoComponent, {
      height: '95%',
      width: '85%',
      data: { filtros: [filtroCausas()] },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.causaMovimiento),
        tap((causaMovimiento: CausaMovimiento) =>
          this.formulario.patchValue({ causaMovimiento: causaMovimiento.id })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarSede() {
    let dialog = this._dialog.open(BuscadorSedeComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.sede),
        tap((sede: Sede) =>
          this.formulario.patchValue({
            sede: sede.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarResponsablePrimario() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.responsablePrimario),
        tap((responsable: Responsable) =>
          this.formulario.patchValue({
            responsablePrimario: responsable.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarResponsableUso() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.responsableUso),
        tap((responsable: Responsable) =>
          this.formulario.patchValue({
            responsableUso: responsable.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }
}
