import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { TipoResponsable } from '@core/types/tipo-responsable';
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
import { ActivoService } from '@core/services/definiciones/activo.service';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { CambioResponsableService } from '@core/services/procesos/cambio-responsable.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { filter, first, switchMap, take, tap, map } from 'rxjs/operators';
import { BuscadorCambioResponsableComponent } from '../buscador-cambio-responsable/buscador-cambio-responsable.component';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { TIPOS_RESPONSABLE } from '@core/constants/tipos-responsable';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';
import { Responsable } from '@core/models/otros-modulos/responsable';
import { Subscription, forkJoin, pipe } from 'rxjs';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
import { activoIncorporado } from '@core/utils/funciones/activo-incorporado';

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
    private _activoUbicacion: ActivoUbicacionService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      comprobante: ['AUTOGENERADO'],
      activo: ['', Validators.required],
      identificador: [''],
      serial: [''],
      tipoResponsable: ['', Validators.required],
      responsableActual: [''],
      nuevoResponsable: ['', Validators.required],
      observaciones: [''],
      creado: [new Date()],
      modificado: [new Date()],
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
                activo: entidad.activo,
                identificador: entidad.identificador,
                serial: entidad.serial,
                tipoResponsable: entidad.tipoResponsable,
                responsableActual: entidad.responsableActual,
                nuevoResponsable: entidad.nuevoResponsable,
                observaciones: entidad.observaciones,
              })
            : undefined
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
          this._cambioResponsable.eliminar(
            this.formulario.value.id,
            this.titulo
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
    let filtrarIncorporados = () =>
      pipe(
        switchMap((activos: Activo[]) => {
          let ubicacionesPeticiones = activos.map(activo =>
            this._activoUbicacion.buscarPorActivo(activo.id)
          );
          return forkJoin(ubicacionesPeticiones).pipe(
            map(ubicaciones => {
              return activos.map(activo => {
                activo.ubicacion = ubicaciones.find(
                  ubicacion => ubicacion.activoId === activo.id
                );
                return activo;
              });
            })
          );
        }),
        map(activos =>
          activos.filter(activo => activoIncorporado(activo.ubicacion))
        )
      );
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      height: '95%',
      width: '85%',
      data: { filtros: [filtrarIncorporados()] },
    });
    dialog
      .afterClosed()
      .pipe(
        tap((activo: Activo) => {
          activo
            ? this.formulario.patchValue({
                activo: activo.id,
                identificador: activo.serialRotulacion,
                serial: activo.serialFabrica,
              })
            : undefined;
        }),
        switchMap((activo: Activo) => {
          if (activo) {
            let buscarUbicacion = this._activoUbicacion.buscarPorActivo(
              activo.id
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

  private reiniciarFormulario() {
    this.formulario.reset({
      empresaId: '',
      id: '',
      comprobante: 'AUTOGENERADO',
      activo: '',
      identificador: '',
      serial: '',
      tipoResponsable: '',
      responsableActual: '',
      nuevoResponsable: '',
      observaciones: '',
      creado: new Date(),
      modificado: new Date(),
    });
    this.activoUbicacionActual = <ActivoUbicacion>{};
    this.actualizarFormulario();
  }
}
