import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { Activo } from '@core/models/definiciones/activo';
import { CambioResponsable } from '@core/models/procesos/cambio-responsable';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { CambioResponsableService } from '@core/services/procesos/cambio-responsable.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';
import { BuscadorCambioResponsableComponent } from '../buscador-cambio-responsable/buscador-cambio-responsable.component';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { TIPOS_RESPONSABLE } from '@core/constants/tipos-responsable';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';
import { Responsable } from '@core/models/otros-modulos/responsable';

@Component({
  selector: 'app-singular-cambio-responsable',
  templateUrl: './singular-cambio-responsable.component.html',
  styleUrls: ['./singular-cambio-responsable.component.scss'],
})
export class SingularCambioResponsableComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[31].nombre;
  formulario: FormGroup;
  dataSource: MatTableDataSource<Activo> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES.CAMBIOS_RESPONSABLE;
  tiposResponsable = TIPOS_RESPONSABLE;

  constructor(
    private _entidad: CambioResponsableService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _activo: ActivoService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      comprobante: ['AUTOGENERADO'],
      activo: ['', Validators.required],
      identificador: ['', Validators.required],
      serial: ['', Validators.required],
      tipoResponsable: ['', Validators.required],
      responsableActual: ['', Validators.required],
      nuevoResponsable: ['', Validators.required],
      observaciones: ['', Validators.required],
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
          tap((entidad: CambioResponsable) =>
            this.formulario.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              comprobante: entidad.comprobante,
              activo: entidad.activo,
              identificador: entidad.identificador,
              serial: entidad.serial,
              tipoResponsable: entidad.tipoResponsable,
              responsableActual: entidad.responsableActual,
              nuevoResponsable: entidad.nuevoResponsable,
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
              comprobante: `${ser}-${doc}`,
            });
          }),
          take(1)
        )
        .subscribe();
    }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorCambioResponsableComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: CambioResponsable) =>
          entidad
            ? this.formulario.patchValue({
                tipoResponsable: entidad.tipoResponsable,
                responsableActual: entidad.responsableActual,
                nuevoResponsable: entidad.nuevoResponsable,
                observaciones: entidad.observaciones,
              })
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad: CambioResponsable = this.formulario.value;
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
    dialog
      .afterClosed()
      .pipe(
        tap((activo: Activo) => {
          if (activo) {
            this.formulario.patchValue({
              activo: activo.id,
              identificador: activo.serialRotulacion,
              serial: activo.serialFabrica,
            });
          }
        }),
        take(1)
      )
      .subscribe();
  }
  buscarResponsableActual() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((responsable: Responsable) => {
          if (responsable) {
            this.formulario.patchValue({ responsableActual: responsable.id });
          }
        })
      )
      .subscribe();
  }
  buscarNuevoResponsable() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((responsable: Responsable) => {
          if (responsable) {
            this.formulario.patchValue({ nuevoResponsable: responsable.id });
          }
        })
      )
      .subscribe();
  }
}
