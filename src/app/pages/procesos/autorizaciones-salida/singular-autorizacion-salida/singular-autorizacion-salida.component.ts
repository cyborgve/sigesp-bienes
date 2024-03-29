import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { Activo } from '@core/models/definiciones/activo';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { AutorizacionSalidaService } from '@core/services/procesos/autorizacion-salida.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';
import { BuscadorAutorizacionSalidaComponent } from '../buscador-autorizacion-salida/buscador-autorizacion-salida.component';
import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { Basica } from '@core/models/auxiliares/basica';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { convertirActivoProceso } from '@core/utils/funciones/convertir-activo-proceso';
import { BuscadorProveedorComponent } from '@shared/components/buscador-proveedor/buscador-proveedor.component';
import { Proveedor } from '@core/models/otros-modulos/proveedor';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { Subscription } from 'rxjs';
import { chequearUnidadConActivos } from '@core/utils/funciones/chequear-unidad-con-activos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { filtrarActivosIncorporados } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-incoporados';
import { filtrarActivosPorUnidadAdministrativa } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-unidad-administrativa';
import { filtrarActivosNoSeleccionados } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-no-seleccionados';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';

@Component({
  selector: 'app-singular-autorizacion-salida',
  templateUrl: './singular-autorizacion-salida.component.html',
  styleUrls: ['./singular-autorizacion-salida.component.scss'],
})
export class SingularAutorizacionSalidaComponent
  implements OnInit, OnDestroy, Entidad
{
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[30].nombre;
  formulario: UntypedFormGroup;
  dataSource: MatTableDataSource<ActivoProceso> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES.AUTORIZACIONES_SALIDA;

  constructor(
    private _entidad: AutorizacionSalidaService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: UntypedFormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _activo: ActivoService,
    private _activoUbicacion: ActivoUbicacionService,
    private _snackBar: MatSnackBar
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      comprobante: [undefined],
      unidadAdministrativa: [undefined, Validators.required],
      empresaAutorizada: [undefined, Validators.required],
      personaAutorizada: [undefined, Validators.required],
      testigo: [undefined, Validators.required],
      explicacion: [undefined, Validators.required],
      observaciones: [undefined],
      activos: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  ngOnInit(): void {
    this.subscripciones.push(
      this.formulario.controls.unidadAdministrativa.valueChanges
        .pipe(
          switchMap((unidadAdministrativa: Id) =>
            chequearUnidadConActivos(
              unidadAdministrativa,
              this._activo,
              this._activoUbicacion,
              this._snackBar
            )
          )
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
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
              unidadAdministrativa: entidad.unidadAdministrativa,
              empresaAutorizada: entidad.empresaAutorizada,
              personaAutorizada: entidad.personaAutorizada,
              testigo: entidad.testigo,
              explicacion: entidad.explicacion,
              observaciones: entidad.observaciones,
              activos: [],
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
              unidadAdministrativa: 0,
              empresaAutorizada: '---',
              personaAutorizada: '',
              testigo: '',
              explicacion: '',
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

  formularioInvalido = () =>
    this.formulario.value.unidadAdministrativa === 0 ||
    this.formulario.value.empresaAutorizada === '---' ||
    this.formulario.value.personaAutorizada === '' ||
    this.formulario.value.testigo === '' ||
    this.formulario.value.explicacion === '';

  deshabilitarGuardar = () =>
    this.formularioInvalido() || this.dataSource.data.length === 0;

  importar() {
    let dialog = this._dialog.open(BuscadorAutorizacionSalidaComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((entidad: AutorizacionSalida) =>
          this.formulario.patchValue({
            unidadAdministrativa: entidad.unidadAdministrativa,
            empresaAutorizada: entidad.empresaAutorizada,
            personaAutorizada: entidad.personaAutorizada,
            testigo: entidad.testigo,
            explicacion: entidad.explicacion,
            observaciones: entidad.observaciones,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  buscar() {
    this._router.navigate(['/procesos/autorizaciones-salida']);
  }

  guardar() {
    let entidad: AutorizacionSalida = this.formulario.value;
    entidad.activos = this.dataSource.data;
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad, this.titulo.toUpperCase())
        .pipe(first())
        .subscribe(autorizacion => {
          if (autorizacion) this.reiniciarFormulario();
        });
    } else {
      this._entidad
        .actualizar(this.id, entidad, this.titulo.toUpperCase())
        .pipe(first())
        .subscribe();
    }
  }

  borrar() {
    let dialog = this._dialog.open(DialogoEliminarDefinicionComponent, {
      data: {
        codigo: this.formulario.value.codigo,
        denominacion: this.titulo,
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
      data: {
        filtros: [
          filtrarActivosNoSeleccionados(this.dataSource.data),
          filtrarActivosIncorporados(this._activoUbicacion),
          filtrarActivosPorUnidadAdministrativa(
            this.formulario.value.unidadAdministrativa,
            this._activoUbicacion
          ),
        ],
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((activo: Activo) => {
          if (activo) {
            this.dataSource = new MatTableDataSource([
              ...this.dataSource.data,
              convertirActivoProceso(activo),
            ]);
          }
        }),
        take(1)
      )
      .subscribe();
  }

  eliminarActivo(row: any) {
    let activos = this.dataSource.data;
    activos.splice(activos.indexOf(row), 1);
    this.dataSource = new MatTableDataSource(activos);
  }

  buscarUnidadAdministrativa() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      height: '95%',
      width: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.unidadAdministrativa),
        tap((entidad: Basica) =>
          this.formulario.patchValue({
            unidadAdministrativa: entidad.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarEmpresaAutorizada() {
    let dialog = this._dialog.open(BuscadorProveedorComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.empresaAutorizada),
        tap((proveedor: Proveedor) =>
          this.formulario.patchValue({ empresaAutorizada: proveedor.id })
        )
      )
      .subscribe();
  }

  buscarTestigo() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.testigo),
        tap(responsable =>
          this.formulario.patchValue({
            testigo: responsable.id,
          })
        ),
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
