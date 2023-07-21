import { CausaMovimiento } from '@core/models/definiciones/causa-movimiento';
import { tap, take, switchMap, first, filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/correlativo.service';
import { IncorporacionService } from '@core/services/procesos/incorporacion.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorIncorporacionComponent } from '../buscador-incorporacion/buscador-incorporacion.component';
import { Basica } from '@core/models/auxiliares/basica';
import { Incorporacion } from '@core/models/procesos/incorporacion';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorCausaMovimientoComponent } from '@pages/definiciones/causas-movimiento/buscador-causa-movimiento/buscador-causa-movimiento.component';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { BuscadorSedeComponent } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.component';
import { Sede } from '@core/models/definiciones/sede';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';
import { Responsable } from '@core/models/otros-modulos/responsable';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { Activo } from '@core/models/definiciones/activo';

@Component({
  selector: 'app-singular-incorporacion',
  templateUrl: './singular-incorporacion.component.html',
  styleUrls: ['./singular-incorporacion.component.scss'],
})
export class SingularIncorporacionComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[34].nombre;
  formulario: FormGroup;

  constructor(
    private _entidad: IncorporacionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      comprobante: ['AUTOGENERADO'],
      causaMovimiento: ['', Validators.required],
      responsablePrimario: ['', Validators.required],
      responsableUso: ['', Validators.required],
      unidadAdministrativa: ['', Validators.required],
      sede: ['', Validators.required],
      fechaEntrega: ['', Validators.required],
      observaciones: [''],
      activos: [[]],
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
              causaMovimiento: entidad.causaMovimiento,
              unidadAdministrativa: entidad.unidadAdministrativa,
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
              comprobante: `${ser}-${doc}`,
            });
          }),
          take(1)
        )
        .subscribe();
    }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorIncorporacionComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        switchMap((depreciacion: Basica) =>
          this._entidad.buscarPorId(depreciacion.id)
        ),
        tap(entidad =>
          this.formulario.patchValue({
            causaMovimiento: entidad.causaMovimiento,
            responsablePrimario: entidad.responsablePrimario,
            responsableUso: entidad.responsableUso,
            unidadAdministrativa: entidad.unidadAdministrativa,
            sede: entidad.sede,
            fechaEntrega: entidad.fechaEntrega,
            observaciones: entidad.observaciones,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad: Incorporacion = this.formulario.value;
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

  agregarActivo() {
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((activo: Activo) => {
          if (activo) {
            this.formulario.patchValue({
              activos: [...this.formulario.value.activos, activo],
            });
          }
        }),
        take(1)
      )
      .subscribe();
  }

  buscarCausaMovimiento() {
    let dialog = this._dialog.open(BuscadorCausaMovimientoComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((causaMovimiento: CausaMovimiento) => {
          if (causaMovimiento) {
            this.formulario.patchValue({ causaMovimiento: causaMovimiento.id });
          }
        }),
        take(1)
      )
      .subscribe();
  }

  buscarUnidadAdministrativa() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((unidadAdministrativa: UnidadAdministrativa) => {
          if (unidadAdministrativa) {
            this.formulario.patchValue({
              unidadAdministrativa: unidadAdministrativa.id,
            });
          }
        }),
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
        tap((sede: Sede) => {
          if (sede) {
            this.formulario.patchValue({
              sede: sede.id,
            });
          }
        }),
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
        tap((responsable: Responsable) => {
          if (responsable) {
            this.formulario.patchValue({
              responsablePrimario: responsable.id,
            });
          }
        }),
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
        tap((responsable: Responsable) => {
          if (responsable) {
            this.formulario.patchValue({
              responsableUso: responsable.id,
            });
          }
        }),
        take(1)
      )
      .subscribe();
  }
}
