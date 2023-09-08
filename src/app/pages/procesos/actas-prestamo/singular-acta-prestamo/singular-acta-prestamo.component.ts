import { Activo } from '@core/models/definiciones/activo';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { ActaPrestamoService } from '@core/services/procesos/acta-prestamo.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { filter, first, switchMap, take, tap, map } from 'rxjs/operators';
import { forkJoin, pipe } from 'rxjs';
import { BuscadorActaPrestamoComponent } from '../buscador-acta-prestamo/buscador-acta-prestamo.component';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { prepararActaPrestamo } from '@core/utils/funciones/preparar-acta-prestamo';
import { adaptarActaPrestamo } from '@core/utils/adaptadores-rxjs/adaptar-acta-prestamo';
import { Entidad } from '@core/models/auxiliares/entidad';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { convertirActivoProceso } from '@core/utils/funciones/convertir-activo-proceso';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { activoIncorporado } from '@core/utils/funciones/activo-incorporado';

@Component({
  selector: 'app-singular-acta-prestamo',
  templateUrl: './singular-acta-prestamo.component.html',
  styleUrls: ['./singular-acta-prestamo.component.scss'],
})
export class SingularActaPrestamoComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[29].nombre;
  formulario: FormGroup;
  dataSource: MatTableDataSource<ActivoProceso> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES['ACTIVOS'];

  constructor(
    private _actaPrestamo: ActaPrestamoService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _activo: ActivoService,
    private _activoUbicacion: ActivoUbicacionService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      comprobante: ['AUTOGENERADO'],
      unidadAdministrativaCedente: ['', Validators.required],
      unidadCedenteResponsable: ['', Validators.required],
      unidadAdministrativaReceptora: ['', Validators.required],
      unidadReceptoraResponsable: ['', Validators.required],
      testigo: ['', Validators.required],
      notas: [undefined],
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
      this._actaPrestamo
        .buscarPorId(this.id)
        .pipe(
          adaptarActaPrestamo(),
          tap(actaPrestamo => {
            this.formulario.patchValue({
              empresaId: actaPrestamo.empresaId,
              id: actaPrestamo.id,
              comprobante: actaPrestamo.comprobante,
              unidadAdministrativaCedente:
                actaPrestamo.unidadAdministrativaCedente,
              unidadCedenteResponsable: actaPrestamo.unidadCedenteResponsable,
              unidadAdministrativaReceptora:
                actaPrestamo.unidadAdministrativaReceptora,
              unidadReceptoraResponsable:
                actaPrestamo.unidadReceptoraResponsable,
              testigo: actaPrestamo.testigo,
              creado: actaPrestamo.creado,
              modificado: actaPrestamo.modificado,
            });
          }),
          tap(
            actaPrestamo =>
              (this.dataSource = new MatTableDataSource(actaPrestamo.activos))
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
    let dialog = this._dialog.open(BuscadorActaPrestamoComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((actaPrestamo: ActaPrestamo) =>
          actaPrestamo
            ? this.formulario.patchValue({
                unidadAdministrativaCedente:
                  actaPrestamo.unidadAdministrativaCedente,
                unidadCedenteResponsable: actaPrestamo.unidadCedenteResponsable,
                unidadAdministrativaReceptora:
                  actaPrestamo.unidadAdministrativaReceptora,
                unidadReceptoraResponsable:
                  actaPrestamo.unidadReceptoraResponsable,
                testigo: actaPrestamo.testigo,
              })
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let actaPrestamo = prepararActaPrestamo(this.formulario.value);
    actaPrestamo.activos = this.dataSource.data;
    if (this.modoFormulario === 'CREANDO') {
      this._actaPrestamo
        .guardar(actaPrestamo, this.titulo)
        .pipe(first())
        .subscribe(actaPrestamo =>
          actaPrestamo ? this.reiniciarFormulario() : undefined
        );
    } else {
      this._actaPrestamo
        .actualizar(this.id, actaPrestamo, this.titulo)
        .pipe(first())
        .subscribe(actaPrestamo =>
          actaPrestamo ? this.reiniciarFormulario() : undefined
        );
    }
  }

  buscar() {
    this._router.navigate(['/procesos/actas-prestamo']);
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
          this._actaPrestamo.eliminar(
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

  buscarUnidadAdministrativaCedente() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      height: '95%',
      width: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap(unidadAdministrativa =>
          unidadAdministrativa
            ? this.formulario.patchValue({
                unidadAdministrativaCedente: unidadAdministrativa.id,
              })
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }

  buscarResponsableUnidadCedente() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap(responsable =>
          responsable
            ? this.formulario.patchValue({
                unidadCedenteResponsable: responsable.id,
              })
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }

  buscarUnidadAdministrativaReceptora() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      height: '95%',
      width: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap(unidadAdministrativa =>
          unidadAdministrativa
            ? this.formulario.patchValue({
                unidadAdministrativaReceptora: unidadAdministrativa.id,
              })
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }

  buscarResponsableUnidadReceptora() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap(responsable =>
          responsable
            ? this.formulario.patchValue({
                unidadReceptoraResponsable: responsable.id,
              })
            : undefined
        ),
        take(1)
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
        tap(responsable =>
          responsable
            ? this.formulario.patchValue({
                testigo: responsable.id,
              })
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }

  agregarActivo() {
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
        switchMap(activo =>
          activo ? this._activo.buscarPorId(activo.id) : activo
        ),
        tap((activo: Activo) =>
          activo
            ? (this.dataSource = new MatTableDataSource([
                ...this.dataSource.data,
                convertirActivoProceso(activo),
              ]))
            : undefined
        ),
        tap(activo =>
          this.formulario.patchValue({
            activos: [
              ...this.formulario.value.activos,
              <ActivoProceso>{
                empresaId: activo.id,
                id: undefined,
                proceso: undefined,
                activo: activo.id,
                codigo: activo.codigo,
                tipoActivo: activo.tipoActivo,
                denominacion: activo.denominacion,
                creado: new Date(),
                modificado: new Date(),
              },
            ],
          })
        ),
        take(1)
      )
      .subscribe();
  }

  eliminarActivo(activo: Activo) {
    let activos = this.formulario.value.activos as ActivoProceso[];
    activos.splice(activos.findIndex(a => a.activo === activo.id));
    this.dataSource = new MatTableDataSource(activos);
  }

  formularioActivo() {
    return this.formulario.valid && this.dataSource.data.length > 0;
  }

  reiniciarFormulario() {
    this.formulario.reset();
    this.formulario.patchValue({
      empresaId: '',
      id: '',
      comprobante: 'AUTOGENERADO',
      unidadAdministrativaCedente: '',
      unidadCedenteResponsable: '',
      unidadAdministrativaReceptora: '',
      unidadReceptoraResponsable: '',
      testigo: '',
      activos: [],
      creado: new Date(),
      modificado: new Date(),
    });
    this.dataSource = new MatTableDataSource();
    this.actualizarFormulario();
  }
}
