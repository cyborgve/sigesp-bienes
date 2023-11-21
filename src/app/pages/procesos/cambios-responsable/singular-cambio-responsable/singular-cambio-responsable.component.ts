import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { Activo } from '@core/models/definiciones/activo';
import { CambioResponsable } from '@core/models/procesos/cambio-responsable';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { CambioResponsableService } from '@core/services/procesos/cambio-responsable.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';
import { BuscadorCambioResponsableComponent } from '../buscador-cambio-responsable/buscador-cambio-responsable.component';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { TIPOS_RESPONSABLE } from '@core/constants/tipos-responsable';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';
import { Responsable } from '@core/models/otros-modulos/responsable';
import { Subscription, forkJoin } from 'rxjs';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { filtrarActivosIncorporados } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-incoporados';

@Component({
  selector: 'app-singular-cambio-responsable',
  templateUrl: './singular-cambio-responsable.component.html',
  styleUrls: ['./singular-cambio-responsable.component.scss'],
})
export class SingularCambioResponsableComponent
  implements Entidad, OnInit, OnDestroy
{
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[31].nombre;
  formulario: FormGroup;
  dataSource: MatTableDataSource<Activo> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES.CAMBIOS_RESPONSABLE;
  tiposResponsable = TIPOS_RESPONSABLE;

  activoUbicacionActual: ActivoUbicacion = <ActivoUbicacion>{};

  constructor(
    private _cambioResponsable: CambioResponsableService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _activoUbicacion: ActivoUbicacionService,
    private _activo: ActivoService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      comprobante: [undefined],
      activo: [undefined],
      identificador: [undefined],
      serial: [undefined],
      tipoResponsable: [undefined, Validators.required],
      responsableActual: [undefined],
      nuevoResponsable: [undefined, Validators.required],
      observaciones: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  ngOnInit(): void {
    this.subscripciones.push(
      this.formulario.controls['tipoResponsable'].valueChanges
        .pipe(
          tap((tipoResponsable: any) =>
            tipoResponsable === 1
              ? this.formulario.patchValue({
                  responsableActual:
                    this.activoUbicacionActual.responsableUsoId,
                })
              : tipoResponsable === 0
              ? this.formulario.patchValue({
                  responsableActual: this.activoUbicacionActual.responsableId,
                })
              : undefined
          )
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(sub => sub.unsubscribe());
  }

  formularioInvalido = () =>
    this.formulario.value.activo === 0 ||
    this.formulario.value.tipoResponsable === '' ||
    this.formulario.value.nuevoResponsable === '---';

  private actualizarFormulario() {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._cambioResponsable
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
              empresaId: 0,
              id: 0,
              comprobante: `${ser}-${doc}`,
              activo: 0,
              identificador: '',
              serial: '',
              tipoResponsable: '',
              responsableActual: '',
              nuevoResponsable: '---',
              observaciones: '',
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
    let dialog = this._dialog.open(BuscadorCambioResponsableComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((entidad: CambioResponsable) =>
          this.formulario.patchValue({
            activo: entidad.activo,
            identificador: entidad.identificador,
            serial: entidad.serial,
            tipoResponsable: entidad.tipoResponsable,
            responsableActual: entidad.responsableActual,
            nuevoResponsable: entidad.nuevoResponsable,
            observaciones: entidad.observaciones,
          })
        ),
        switchMap(cambioResponsable => {
          if (cambioResponsable) {
            let buscarUbicacion = this._activoUbicacion.buscarPorActivo(
              cambioResponsable.activo
            );
            return forkJoin([buscarUbicacion]);
          } else return undefined;
        }),
        tap(([ubicacionActivo]) => {
          if (ubicacionActivo) {
            this.activoUbicacionActual = ubicacionActivo;
          }
        }),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let cambioResponsable: CambioResponsable = this.formulario.value;

    if (this.modoFormulario === 'CREANDO') {
      this._cambioResponsable
        .guardar(cambioResponsable, this.titulo)
        .pipe(first())
        .subscribe(cambioResponsable => {
          if (cambioResponsable) this.reiniciarFormulario();
        });
    } else {
      this._cambioResponsable
        .actualizar(this.id, cambioResponsable, this.titulo)
        .pipe(first())
        .subscribe(cambioResponsable => {
          if (cambioResponsable) this.reiniciarFormulario();
        });
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
          this._cambioResponsable.eliminar(
            this.formulario.value.id,
            this.titulo
          )
        ),
        take(1)
      )
      .subscribe(() => this.irAtras());
  }

  buscar() {
    this._router.navigate(['/procesos/cambios-responsable']);
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
      data: { filtros: [filtrarActivosIncorporados(this._activoUbicacion)] },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((activo: Activo) => {
          this.formulario.patchValue({
            activo: activo.id,
            identificador: activo.serialRotulacion,
            serial: activo.serialFabrica,
            tipoResponsable: '',
            responsableActual: '---',
          });
        }),
        switchMap((activo: Activo) => {
          if (activo) {
            return this._activoUbicacion.buscarPorActivo(activo.id);
          } else return undefined;
        }),
        tap(ubicacionActivo => {
          if (ubicacionActivo) {
            this.activoUbicacionActual = ubicacionActivo;
          }
        }),
        take(1)
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
        filter(todo => !!todo),
        tap((responsable: Responsable) => {
          if (responsable) {
            this.formulario.patchValue({ nuevoResponsable: responsable.id });
          }
        }),
        take(1)
      )
      .subscribe();
  }

  private reiniciarFormulario() {
    this.formulario.reset();
    this.activoUbicacionActual = <ActivoUbicacion>{};
    this.actualizarFormulario();
  }
}
