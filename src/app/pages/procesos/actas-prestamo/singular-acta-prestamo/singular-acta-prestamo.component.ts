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
import { BuscadorActaPrestamoComponent } from '../buscador-acta-prestamo/buscador-acta-prestamo.component';
import {
  ActaPrestamo,
  ActaPrestamoActivo,
} from '@core/models/procesos/acta-prestamo';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { Basica } from '@core/models/auxiliares/basica';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { prepararActaPrestamo } from '@core/utils/funciones/preparar-acta-prestamo';
import { adaptarActaPrestamo } from '@core/utils/adaptadores-rxjs.ts/adaptar-acta-prestamo';
import { convertirActaPrestamoActivo } from '@core/utils/funciones/convertir-acta-prestamo-activo';
import { Entidad } from '@core/models/auxiliares/entidad';

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
  dataSource: MatTableDataSource<ActaPrestamoActivo> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES['ACTIVOS'];

  constructor(
    private _actaPrestamo: ActaPrestamoService,
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
      comprobante: ['AUTOGENERADO'],
      unidadAdministrativaCedente: [undefined, Validators.required],
      unidadCedenteResponsable: [undefined, Validators.required],
      unidadAdministrativaReceptora: [undefined, Validators.required],
      unidadReceptoraResponsable: [undefined, Validators.required],
      testigo: [undefined, Validators.required],
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
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      height: '95%',
      width: '85%',
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
                convertirActaPrestamoActivo(activo),
              ]))
            : undefined
        ),
        tap(activo =>
          this.formulario.patchValue({
            activos: [
              ...this.formulario.value.activos,
              <ActaPrestamoActivo>{
                empresaId: activo.id,
                id: undefined,
                actaPrestamo: undefined,
                activo: activo.id,
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
    let activos = this.formulario.value.activos as ActaPrestamoActivo[];
    activos.splice(activos.findIndex(a => a.activo === activo.id));
    this.dataSource = new MatTableDataSource(activos);
  }

  formularioActivo() {
    return this.formulario.valid && this.dataSource.data.length > 0;
  }

  reiniciarFormulario() {
    this.formulario.reset();
    this.formulario.patchValue({
      creado: [new Date()],
      modificado: [new Date()],
    });
    this.dataSource = new MatTableDataSource();
    this.actualizarFormulario();
  }
}
