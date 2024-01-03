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
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Subscription } from 'rxjs';
import { MODOS_ADQUISICION } from '@core/constants/modos-adquisicion';
import { BuscadorProveedorComponent } from '@shared/components/buscador-proveedor/buscador-proveedor.component';
import { Proveedor } from '@core/models/otros-modulos/proveedor';
import { BuscadorBeneficiarioComponent } from '@shared/components/buscador-beneficiario/buscador-beneficiario.component';
import { Beneficiario } from '@core/models/otros-modulos/beneficiario';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

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
      empresaId: [undefined],
      id: [undefined],
      codigo: [undefined],
      denominacion: [undefined, Validators.required],
      fechaOrigen: [undefined],
      fechaAdquisicion: [undefined],
      modoAdquisicion: [undefined],
      numeroFormaAdquisicion: [undefined, Validators.maxLength(16)],
      nombreFormaAdquisicion: [undefined, Validators.maxLength(16)],
      fechaFactura: [undefined],
      numeroFactura: [undefined],
      proveedorId: [undefined],
      tomo: [undefined],
      folio: [undefined],
      nombrePropietarioAnterior: [undefined],
      nombreBenefactor: [undefined],
      nombreBeneficiario: [undefined],
      observaciones: [undefined],
      creado: [undefined],
      modificado: [undefined],
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
          tap(entidad => {
            this.formulario.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              codigo: entidad.codigo,
              denominacion: entidad.denominacion,
              fechaOrigen: entidad.fechaOrigen,
              fechaAdquisicion: entidad.fechaAdquisicion,
              modoAdquisicion: entidad.modoAdquisicion,
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
          }),
          take(1)
        )
        .subscribe();
    } else {
      this._correlativo
        .buscarPorId(CORRELATIVOS.find(c => c.nombre === this.titulo).id)
        .pipe(
          tap(correlativo => {
            let ser = correlativo.serie.toString().padStart(4, '0');
            let cor = correlativo.correlativo.toString().padStart(8, '0');
            this.formulario.patchValue({
              empresaId: 0,
              id: 0,
              codigo: `${ser}-${cor}`,
              denominacion: '',
              fechaOrigen: undefined,
              fechaAdquisicion: undefined,
              modoAdquisicion: '',
              numeroFormaAdquisicion: '',
              nombreFormaAdquisicion: '',
              fechaFactura: undefined,
              numeroFactura: '',
              proveedorId: '---',
              tomo: '',
              folio: '',
              nombrePropietarioAnterior: '',
              nombreBenefactor: '',
              nombreBeneficiario: '---',
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
    let dialog = this._dialog.open(BuscadorOrigenComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          tap((entidad: Origen) =>
            this.formulario.patchValue({
              denominacion: entidad.denominacion,
              fechaOrigen: entidad.fechaOrigen,
              fechaAdquisicion: entidad.fechaAdquisicion,
              modoAdquisicion: entidad.modoAdquisicion,
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
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.proveedorId),
        tap((proveedor: Proveedor) => {
          if (proveedor) {
            this.formulario.patchValue({ proveedorId: proveedor.id });
          }
        }),
        take(1)
      )
      .subscribe();
  }

  buscarBenefactor() {
    let dialog = this._dialog.open(BuscadorBeneficiarioComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.nombreBenefactor),
        tap((beneficiario: Beneficiario) => {
          if (beneficiario) {
            this.formulario.patchValue({ nombreBenefactor: beneficiario.id });
          }
        }),
        take(1)
      )
      .subscribe();
  }

  buscarBeneficiario() {
    let dialog = this._dialog.open(BuscadorBeneficiarioComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.nombreBeneficiario),
        tap((beneficiario: Beneficiario) => {
          if (beneficiario) {
            this.formulario.patchValue({ nombreBeneficiario: beneficiario.id });
          }
        }),
        take(1)
      )
      .subscribe();
  }

  reiniciarBuscarProveedor = () => {
    this.formulario.patchValue({ proveedorId: '---' });
  };
  reiniciarBuscarBeneficiario = () => {
    this.formulario.patchValue({ nombreBeneficiario: '---' });
  };
}
