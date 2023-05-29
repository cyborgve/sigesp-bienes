import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractEntidadFunciones } from '@core/class/abstract-entidad-funciones';
import { OrigenService } from '@core/services/origen.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorOrigenComponent } from '../buscador-origen/buscador-origen.component';
import { Origen } from '@core/models/origen';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-singular-origen',
  templateUrl: './singular-origen.component.html',
  styleUrls: ['./singular-origen.component.scss'],
})
export class SingularOrigenComponent extends AbstractEntidadFunciones {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'Origen';
  formulario: FormGroup;
  modosAdquisicion: string[] = [];
  formasAdquisicion: string[] = [];
  //tiposMarca: string[] = ['marca 1', 'marca 2', 'marca 3'];

  constructor(
    private _entidad: OrigenService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog
  ) {
    super();
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  private actualizarFormulario() {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._entidad
        .buscarPorId(this.id)
        .pipe(
          take(1),
          tap(entidad => {
            this.formulario = this._formBuilder.group({
              empresaId: [entidad.empresaId],
              id: [entidad.id],
              codigo: [entidad.codigo, Validators.required],
              fechaOrigen: [entidad.fechaOrigen, Validators.required],
              fechaAdquisicion: [entidad.fechaAdquisicion, Validators.required],
              modoAdquisicion: [entidad.modoAdquisicion, Validators.required],
              formaAdquisicion: [entidad.formaAdquisicion, Validators.required],
              numeroFormaAdquisicion: [
                entidad.numeroFormaAdquisicion,
                Validators.required,
              ],
              nombreFormaAdquisicion: [
                entidad.nombreFormaAdquisicion,
                Validators.required,
              ],
              fechaFactura: [entidad.fechaFactura, Validators.required],
              numeroFactura: [entidad.numeroFactura, Validators.required],
              proveedorId: [entidad.proveedorId, Validators.required],
              tomo: [entidad.tomo, Validators.required],
              folio: [entidad.folio, Validators.required],
              nombrePropietarioAnterior: [
                entidad.nombrePropietarioAnterior,
                Validators.required,
              ],
              nombreBenefactor: [entidad.nombreBenefactor, Validators.required],
              nombreBeneficiario: [
                entidad.nombreBeneficiario,
                Validators.required,
              ],
              observaciones: [entidad.observaciones, Validators.required],
              creado: [entidad.creado],
              modificado: [entidad.modificado],
            });
          })
        )
        .subscribe();
    } else {
      this.formulario = this._formBuilder.group({
        empresaId: [''],
        id: [''],
        codigo: ['', Validators.required],
        fechaOrigen: ['', Validators.required],
        fechaAdquisicion: ['', Validators.required],
        modoAdquisicion: ['', Validators.required],
        formaAdquisicion: ['', Validators.required],
        numeroFormaAdquisicion: ['', Validators.required],
        nombreFormaAdquisicion: ['', Validators.required],
        fechaFactura: ['', Validators.required],
        numeroFactura: ['', Validators.required],
        proveedorId: ['', Validators.required],
        tomo: ['', Validators.required],
        folio: ['', Validators.required],
        nombrePropietarioAnterior: ['', Validators.required],
        nombreBenefactor: ['', Validators.required],
        nombreBeneficiario: ['', Validators.required],
        observaciones: ['', Validators.required],
        creado: [''],
        modificado: [''],
      });
    }
  }

  buscar() {
    let dialog = this._dialog.open(BuscadorOrigenComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Origen) => {
          this.formulario.patchValue({
            empresaId: entidad.empresaId,
            id: entidad.id,
            codigo: entidad.codigo,
            fechaOrigen: entidad.fechaOrigen,
            fechaAdquisicion: entidad.fechaAdquisicion,
            modoAdquisicion: entidad.modoAdquisicion,
            formaAdquisicion: entidad.formaAdquisicion,
            numeroFormaAdquisicion: entidad.numeroFormaAdquisicion,
            nombreFormaAdquisicion: entidad.nombreFormaAdquisicion,
            fechaFactura: entidad.fechaFactura,
            numeroFactura: entidad.numeroFactura,
            proveedorId: entidad.proveedorId,
            tomo: entidad.tomo,
            folio: entidad.folio,
            nombrePropietarioAnterior: entidad.nombrePropietarioAnterior,
            nombreBenefactor: entidad.nombreBenefactor,
            nombreBeneficiario: entidad.nombreBeneficiario,
            observaciones: entidad.observaciones,
            creado: entidad.creado,
            modificado: entidad.modificado,
          });
        })
      )
      .subscribe();
  }

  importar() {
    let dialog = this._dialog.open(BuscadorOrigenComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Origen) => {
          this.formulario.patchValue({
            empresaId: entidad.empresaId,
            id: entidad.id,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let entidad: Origen = this.formulario.value;
    entidad.modificado = new Date();
    if (this.modoFormulario === 'CREANDO') {
      entidad.creado = new Date();
      this._entidad.guardar(entidad).pipe(first()).subscribe();
    } else {
      this._entidad.actualizar(this.id, entidad).pipe(first()).subscribe();
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
        switchMap(() => this._entidad.eliminar(this.formulario.value.id)),
        take(1)
      )
      .subscribe();
  }

  imprimir() {
    throw new Error('Method not implemented.');
  }

  irAtras() {
    this._location.back();
  }
  irAlInicio() {
    this._router.navigate(['/definiciones']);
  }

  salir() {
    throw new Error('Method not implemented.');
  }
}