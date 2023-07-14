import { ActaPrestamoService } from '@core/services/procesos/acta-prestamo.service';
import { tap, take, switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';
import { Basica } from '@core/models/auxiliares/basica';
import { ModoFormulario } from '@core/types/modo-formulario';
import { Id } from '@core/types/id';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Activo } from '@core/models/definiciones/activo';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { ActivoService } from '@core/services/activo.service';

@Component({
  selector: 'app-acta-prestamo',
  templateUrl: './acta-prestamo.component.html',
  styleUrls: ['./acta-prestamo.component.scss'],
})
export class ActaPrestamoComponent {
  titulo = 'Acta de Préstamo';
  private modoFormulario: ModoFormulario = 'CREANDO';
  private id: Id;
  formulario: FormGroup;
  dataSource: MatTableDataSource<Activo> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES['ACTIVOS'];

  constructor(
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _actaPrestamo: ActaPrestamoService,
    private _activo: ActivoService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [''],
      comprobante: [1],
      unidadAdministrativaCedente: [undefined, Validators.required],
      unidadCedenteResponsable: [undefined, Validators.required],
      unidadAdministrativaReceptora: [undefined, Validators.required],
      unidadReceptoraResponsable: [undefined, Validators.required],
      testigo: [undefined, Validators.required],
      notas: [''],
      creado: [new Date()],
      modificado: [new Date()],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  private actualizarFormulario() {
    this._actaPrestamo
      .buscarPorId(this.id)
      .pipe(
        tap(actaPrestamo =>
          this.formulario.patchValue({
            empresaId: actaPrestamo.empresaId,
            comprobante: actaPrestamo.comprobante,
            unidadAdministrativaCedente:
              actaPrestamo.unidadAdministrativaCedente,
            unidadCedenteResponsable: actaPrestamo.unidadCedenteResponsable,
            unidadAdministrativaReceptora:
              actaPrestamo.unidadAdministrativaReceptora,
            unidadReceptoraResponsable: actaPrestamo.unidadReceptoraResponsable,
            testigo: actaPrestamo.testigo,
            notas: actaPrestamo.notas,
            creado: actaPrestamo.creado,
            modificado: actaPrestamo.modificado,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarUnidadAdministrativaCedente() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      height: '95%',
      width: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Basica) =>
          this.formulario.patchValue({
            unidadAdministrativaCedente: entidad.id,
          })
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
        tap((entidad: Basica) =>
          this.formulario.patchValue({
            unidadCedenteResponsable: entidad.id,
          })
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
        tap((unidadAdministrativa: UnidadAdministrativa) =>
          this.formulario.patchValue({
            unidadAdministrativaReceptora: unidadAdministrativa.id,
          })
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
        tap((entidad: Basica) =>
          this.formulario.patchValue({
            unidadReceptoraResponsable: entidad.id,
          })
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
        tap((entidad: Basica) =>
          this.formulario.patchValue({
            testigo: entidad.id,
          })
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
        switchMap((basica: Basica) => this._activo.buscarPorId(basica.id)),
        tap(
          activo =>
            (this.dataSource = new MatTableDataSource([
              ...this.dataSource.data,
              activo,
            ]))
        ),
        take(1)
      )
      .subscribe();
  }

  eliminarActivo(row: any) {}
}
