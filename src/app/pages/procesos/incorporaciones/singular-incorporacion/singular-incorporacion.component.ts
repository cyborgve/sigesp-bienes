import { CausaMovimiento } from '@core/models/definiciones/causa-movimiento';
import { tap, take, switchMap, first, filter, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { IncorporacionService } from '@core/services/procesos/incorporacion.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorIncorporacionComponent } from '../buscador-incorporacion/buscador-incorporacion.component';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorCausaMovimientoComponent } from '@pages/definiciones/causas-movimiento/buscador-causa-movimiento/buscador-causa-movimiento.component';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { BuscadorSedeComponent } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.component';
import { Sede } from '@core/models/definiciones/sede';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';
import { Responsable } from '@core/models/otros-modulos/responsable';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { prepararIncorporacion } from '@core/utils/funciones/preparar-incorporacion';
import { prepararActivoProceso } from '@core/utils/funciones/preparar-activo-proceso';
import { convertirActivoProceso } from '@core/utils/funciones/convertir-activo-proceso';
import { pipe, forkJoin } from 'rxjs';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { activoIncorporado } from '@core/utils/funciones/activo-incorporado';
import { Incorporacion } from '@core/models/procesos/incorporacion';

@Component({
  selector: 'app-singular-incorporacion',
  templateUrl: './singular-incorporacion.component.html',
  styleUrls: ['./singular-incorporacion.component.scss'],
})
export class SingularIncorporacionComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[35].nombre;
  formulario: FormGroup;
  dataSource: MatTableDataSource<ActivoProceso> = new MatTableDataSource([]);

  private;

  constructor(
    private _incorporacion: IncorporacionService,
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
      this._incorporacion
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
          tap(entidad =>
            entidad
              ? (this.dataSource = new MatTableDataSource(entidad.activos))
              : undefined
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

  private reiniciarFormulario() {
    this.formulario.reset();
    this.formulario.patchValue({
      causaMovimiento: '',
      unidadAdministrativa: '',
      sede: '',
      responsablePrimario: '',
      responsableUso: '',
      creado: new Date(),
      modificado: new Date(),
    });
    this.actualizarFormulario();
    this.dataSource = new MatTableDataSource([]);
  }

  formularioValido() {
    return this.formulario.valid && this.dataSource.data.length > 0;
  }

  importar() {
    let ordenarPorComprobanteAscendente = () =>
      pipe(
        map((incorporaciones: Incorporacion[]) =>
          incorporaciones.sort((a, b) =>
            a.comprobante > b.comprobante ? -1 : 1
          )
        )
      );
    let dialog = this._dialog.open(BuscadorIncorporacionComponent, {
      width: '95%',
      height: '85%',
      data: { filtros: [ordenarPorComprobanteAscendente()] },
    });
    dialog
      .afterClosed()
      .pipe(
        switchMap(incorporacion =>
          incorporacion
            ? this._incorporacion.buscarPorId(incorporacion.id)
            : undefined
        ),
        tap(incorporacion => {
          incorporacion
            ? this.formulario.patchValue({
                causaMovimiento: incorporacion.causaMovimiento,
                unidadAdministrativa: incorporacion.unidadAdministrativa,
                responsablePrimario: incorporacion.responsablePrimario,
                responsableUso: incorporacion.responsableUso,
                sede: incorporacion.sede,
                fechaEntrega: incorporacion.fechaEntrega,
                observaciones: incorporacion.observaciones,
                activos: [],
              })
            : undefined;
        }),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad = prepararIncorporacion(this.formulario.value);
    entidad.activos = this.dataSource.data.map(activo =>
      prepararActivoProceso(activo)
    );
    if (this.modoFormulario === 'CREANDO') {
      this._incorporacion
        .guardar(entidad, this.titulo, true)
        .pipe(first())
        .subscribe(incorporacion => {
          incorporacion ? this.reiniciarFormulario() : undefined;
        });
    } else {
      this._incorporacion
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
          this._incorporacion.eliminar(this.formulario.value.id, this.titulo)
        ),
        take(1)
      )
      .subscribe(() => this.irAtras());
  }

  buscar() {
    this._router.navigate(['/procesos/incorporaciones']);
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
    let filtrarNoIncorporados = () =>
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
          activos.filter(activo => !activoIncorporado(activo.ubicacion))
        )
      );
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      height: '95%',
      width: '85%',
      data: { filtros: [filtrarNoIncorporados()] },
    });
    dialog
      .afterClosed()
      .pipe(
        tap(activo => {
          activo
            ? (this.dataSource = new MatTableDataSource([
                ...this.dataSource.data,
                convertirActivoProceso(activo),
              ]))
            : undefined;
        }),
        take(1)
      )
      .subscribe();
  }

  eliminarActivo(event: any) {
    let activo: ActivoProceso = event;
    let data = this.dataSource.data;
    data.splice(data.indexOf(activo), 1);
    this.dataSource = new MatTableDataSource(data);
  }

  buscarCausaMovimiento() {
    const filtroCausasMovimiento = () =>
      pipe(
        map((causasMovimiento: CausaMovimiento[]) =>
          causasMovimiento.filter(cm => cm.tipo === 'I')
        )
      );
    let dialog = this._dialog.open(BuscadorCausaMovimientoComponent, {
      height: '95%',
      width: '85%',
      data: { filtros: [filtroCausasMovimiento()] },
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
