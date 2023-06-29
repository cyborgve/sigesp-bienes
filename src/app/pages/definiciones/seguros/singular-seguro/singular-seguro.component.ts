import { Entidad } from '@core/models/entidad';
import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguroService } from '@core/services/seguro.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorSeguroComponent } from '../buscador-seguro/buscador-seguro.component';
import { Seguro } from '@core/models/seguro';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorAseguradoraComponent } from '@pages/definiciones/aseguradoras/buscador-aseguradora/buscador-aseguradora.component';
import { BuscadorTipoPolizaComponent } from '@pages/definiciones/tipos-poliza/buscador-tipo-poliza/buscador-tipo-poliza.component';
import { BuscadorTipoCoberturaComponent } from '@pages/definiciones/tipos-cobertura/buscador-tipo-cobertura/buscador-tipo-cobertura.component';
import { Aseguradora } from '@core/models/aseguradora';
import { TipoPoliza } from '@core/models/tipo-poliza';
import { TipoCobertura } from '@core/models/tipo-cobertura';
import { CorrelativoService } from '@core/services/correlativo.service';
import { CORRELATIVOS } from '@core/constants/correlativos';

@Component({
  selector: 'app-singular-seguro',
  templateUrl: './singular-seguro.component.html',
  styleUrls: ['./singular-seguro.component.scss'],
})
export class SingularSeguroComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[17].nombre;
  formulario: FormGroup;

  constructor(
    private _entidad: SeguroService,
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
      codigo: ['', Validators.required],
      denominacion: ['', Validators.required],
      aseguradoraId: ['', Validators.required],
      tipoPoliza: ['', Validators.required],
      tipoCobertura: ['', Validators.required],
      numeroPoliza: ['', Validators.required],
      montoAsegurado: ['', Validators.required],
      fechaInicioPoliza: ['', Validators.required],
      fechaFinPoliza: ['', Validators.required],
      monedaId: ['', Validators.required],
      monedaSecundariaId: ['', Validators.required],
      poseeRCV: ['', Validators.required],
      descripcionCobertura: ['', Validators.required],
      coberturaAdicional: ['', Validators.required],
      creado: [''],
      modificado: [''],
    });
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
            this.formulario.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              codigo: entidad.codigo,
              denominacion: entidad.denominacion,
              aseguradoraId: entidad.aseguradoraId,
              tipoPoliza: entidad.tipoPoliza,
              tipoCobertura: entidad.tipoCobertura,
              numeroPoliza: entidad.numeroPoliza,
              montoAsegurado: entidad.montoAsegurado,
              fechaInicioPoliza: entidad.fechaInicioPoliza,
              fechaFinPoliza: entidad.fechaFinPoliza,
              monedaId: entidad.monedaId,
              monedaSecundariaId: entidad.monedaSecundariaId,
              poseeRCV: entidad.poseeRCV,
              descripcionCobertura: entidad.descripcionCobertura,
              coberturaAdicional: entidad.coberturaAdicional,
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
          take(1),
          tap(categoria =>
            this.formulario.patchValue({
              codigo:
                categoria.serie.toString().padStart(4, '0') +
                '-' +
                categoria.correlativo.toString().padStart(8, '0'),
            })
          )
        )
        .subscribe();
    }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorSeguroComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Seguro) => {
          this.formulario.patchValue({
            denominacion: entidad.denominacion,
            aseguradoraId: entidad.aseguradoraId,
            tipoPoliza: entidad.tipoPoliza,
            tipoCobertura: entidad.tipoCobertura,
            numeroPoliza: entidad.numeroPoliza,
            montoAsegurado: entidad.montoAsegurado,
            fechaInicioPoliza: entidad.fechaInicioPoliza,
            fechaFinPoliza: entidad.fechaFinPoliza,
            monedaId: entidad.monedaId,
            monedaSecundariaId: entidad.monedaSecundariaId,
            poseeRCV: entidad.poseeRCV,
            descripcionCobertura: entidad.descripcionCobertura,
            coberturaAdicional: entidad.coberturaAdicional,
          });
        })
      )
      .subscribe();
  }

  guardar() {
    let entidad: Seguro = this.formulario.value;
    entidad.modificado = new Date();
    if (this.modoFormulario === 'CREANDO') {
      entidad.creado = new Date();
      this._entidad
        .guardar(entidad)
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._entidad
        .actualizar(this.id, entidad)
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
        switchMap(() => this._entidad.eliminar(this.formulario.value.id)),
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
    this._router.navigate(['/definiciones']);
  }

  salir() {
    throw new Error('Method not implemented.');
  }

  buscarAseguradora() {
    let dialog = this._dialog.open(BuscadorAseguradoraComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Aseguradora) =>
          this.formulario.patchValue({
            aseguradoraId: entidad.codigo,
          })
        )
      )
      .subscribe();
  }

  buscarTipoPoliza() {
    let dialog = this._dialog.open(BuscadorTipoPolizaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: TipoPoliza) =>
          this.formulario.patchValue({
            tipoPoliza: entidad.codigo,
          })
        )
      )
      .subscribe();
  }

  buscarTipoCobertura() {
    let dialog = this._dialog.open(BuscadorTipoCoberturaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: TipoCobertura) =>
          this.formulario.patchValue({ tipoCobertura: entidad.codigo })
        )
      )
      .subscribe();
  }
}
