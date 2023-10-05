import { Entidad } from '@core/models/auxiliares/entidad';
import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguroService } from '@core/services/definiciones/seguro.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorSeguroComponent } from '../buscador-seguro/buscador-seguro.component';
import { Seguro } from '@core/models/definiciones/seguro';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorAseguradoraComponent } from '@pages/definiciones/aseguradoras/buscador-aseguradora/buscador-aseguradora.component';
import { BuscadorTipoPolizaComponent } from '@pages/definiciones/tipos-poliza/buscador-tipo-poliza/buscador-tipo-poliza.component';
import { BuscadorTipoCoberturaComponent } from '@pages/definiciones/tipos-cobertura/buscador-tipo-cobertura/buscador-tipo-cobertura.component';
import { Aseguradora } from '@core/models/definiciones/aseguradora';
import { TipoPoliza } from '@core/models/definiciones/tipo-poliza';
import { TipoCobertura } from '@core/models/definiciones/tipo-cobertura';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { BuscadorMonedaComponent } from '@shared/components/buscador-moneda/buscador-moneda.component';
import { Moneda } from '@core/models/otros-modulos/moneda';

@Component({
  selector: 'app-singular-seguro',
  templateUrl: './singular-seguro.component.html',
  styleUrls: ['./singular-seguro.component.scss'],
})
export class SingularSeguroComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[19].nombre;
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
      empresa_id: [0],
      id: [0],
      activoId: [0],
      codigo: ['autogenerado'],
      denominacion: ['', Validators.required],
      aseguradoraId: [0],
      tipoPolizaId: [0],
      tipoCoberturaId: [0],
      numeroPoliza: [''],
      montoAsegurado: [0],
      fechaInicioPoliza: [new Date()],
      fechaFinPoliza: [new Date()],
      monedaId: ['0'],
      monedaSecundariaId: ['0'],
      poseeRCV: [false],
      descripcionCobertura: [''],
      coberturaAdicional: [0],
      creado: [new Date()],
      modificado: [new Date()],
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
          tap(entidad => {
            this.formulario.patchValue({
              empresa_id: entidad.empresaId,
              id: entidad.id,
              activoId: entidad.activoId,
              codigo: entidad.codigo,
              denominacion: entidad.denominacion,
              aseguradoraId: entidad.aseguradoraId,
              tipoPolizaId: entidad.tipoPolizaId,
              tipoCoberturaId: entidad.tipoCoberturaId,
              numeroPoliza: entidad.numeroPoliza,
              montoAsegurado: entidad.montoAsegurado,
              fechaInicioPoliza: entidad.fechaInicioPoliza,
              fechaFinPoliza: entidad.fechaFinPoliza,
              monedaId: entidad.monedaId,
              monedaSecundariaId: entidad.monedaSecundariaId,
              poseeRCV: entidad.poseeRCV === 1 ? true : false,
              descripcionCobertura: entidad.descripcionCobertura,
              coberturaAdicional: entidad.coberturaAdicional,
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
    let dialog = this._dialog.open(BuscadorSeguroComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((entidad: Seguro) =>
          this.formulario.patchValue({
            denominacion: entidad.denominacion,
            aseguradoraId: entidad.aseguradoraId,
            tipoPolizaId: entidad.tipoPolizaId,
            tipoCoberturaId: entidad.tipoCoberturaId,
            numeroPoliza: entidad.numeroPoliza,
            montoAsegurado: entidad.montoAsegurado,
            fechaInicioPoliza: entidad.fechaInicioPoliza,
            fechaFinPoliza: entidad.fechaFinPoliza,
            monedaId: entidad.monedaId,
            monedaSecundariaId: entidad.monedaSecundariaId,
            poseeRCV: entidad.poseeRCV === 1 ? true : false,
            descripcionCobertura: entidad.descripcionCobertura,
            coberturaAdicional: entidad.coberturaAdicional,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad: Seguro = this.formulario.value;
    entidad['poseeRCV'] = !!this.formulario.value['poseeRCV'] ? 1 : 0;
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad, this.titulo.toUpperCase())
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._entidad
        .actualizar(this.id, entidad, this.titulo.toUpperCase())
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
          this._entidad.eliminar(
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
        filter(todo => !!todo),
        tap((entidad: Aseguradora) =>
          this.formulario.patchValue({
            aseguradoraId: entidad.id,
          })
        ),
        take(1)
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
        filter(todo => !!todo),
        tap((entidad: TipoPoliza) =>
          this.formulario.patchValue({
            tipoPolizaId: entidad.id,
          })
        ),
        take(1)
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
        filter(todo => !!todo),
        tap((entidad: TipoCobertura) =>
          this.formulario.patchValue({ tipoCoberturaId: entidad.id })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarCoberturaAdicional() {
    let dialog = this._dialog.open(BuscadorTipoCoberturaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((entidad: TipoCobertura) =>
          this.formulario.patchValue({ coberturaAdicional: entidad.id })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarMoneda() {
    let dialog = this._dialog.open(BuscadorMonedaComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((entidad: Moneda) =>
          this.formulario.patchValue({ monedaId: entidad.id })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarMonedaSecundaria() {
    let dialog = this._dialog.open(BuscadorMonedaComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((entidad: Moneda) =>
          this.formulario.patchValue({ monedaSecundariaId: entidad.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
