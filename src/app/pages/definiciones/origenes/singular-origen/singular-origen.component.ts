import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OrigenService } from '@core/services/definiciones/origen.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorOrigenComponent } from '../buscador-origen/buscador-origen.component';
import { Origen } from '@core/models/definiciones/origen';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Subscription } from 'rxjs';
import { MODOS_ADQUISICION } from '@core/constants/modos-adquisicion';
import { BuscadorProveedorComponent } from '@shared/components/buscador-proveedor/buscador-proveedor.component';
import { Proveedor } from '@core/models/otros-modulos/proveedor';

@Component({
  selector: 'app-singular-origen',
  templateUrl: './singular-origen.component.html',
  styleUrls: ['./singular-origen.component.scss'],
})
export class SingularOrigenComponent implements Entidad, OnDestroy {
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[13].nombre;
  formulario: FormGroup;
  modosAdquisicion = MODOS_ADQUISICION;

  constructor(
    private _entidad: OrigenService,
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
      codigo: ['autogenerado'],
      denominacion: ['', Validators.required],
      fechaOrigen: [new Date()],
      fechaAdquisicion: [new Date()],
      modoAdquisicion: [''],
      formaAdquisicion: [''],
      numeroFormaAdquisicion: [''],
      nombreFormaAdquisicion: [''],
      fechaFactura: [new Date()],
      numeroFactura: [''],
      proveedorId: ['---'],
      tomo: [''],
      folio: [''],
      nombrePropietarioAnterior: [''],
      nombreBenefactor: [''],
      nombreBeneficiario: [''],
      observaciones: [''],
      creado: [new Date()],
      modificado: [new Date()],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
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
          take(1),
          tap(entidad => {
            this.formulario.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              codigo: entidad.codigo,
              denominacion: entidad.denominacion,
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
    } else {
      this._correlativo
        .buscarPorId(CORRELATIVOS.find(c => c.nombre === this.titulo).id)
        .pipe(
          tap(correlativo => {
            let ser = correlativo.serie.toString().padStart(4, '0');
            let doc = correlativo.correlativo.toString().padStart(8, '0');
            this.formulario.patchValue({
              codigo: `${ser}-${doc}`,
            });
          }),
          take(1)
        )
        .subscribe();
    }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorOrigenComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((entidad: Origen) =>
            entidad
              ? this.formulario.patchValue({
                  denominacion: entidad.denominacion,
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
                })
              : undefined
          )
        )
        .subscribe()
    );
  }

  guardar() {
    let entidad: Origen = this.formulario.value;
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad, this.titulo)
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._entidad
        .actualizar(this.id, entidad, this.titulo)
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
          this._entidad.eliminar(this.formulario.value.id, this.titulo)
        ),
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

  buscarProveedor() {
    let dialog = this._dialog.open(BuscadorProveedorComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((proveedor: Proveedor) => {
          if (proveedor) {
            this.formulario.patchValue({ proveedorId: proveedor.id });
          }
        }),
        take(1)
      )
      .subscribe();
  }
}
