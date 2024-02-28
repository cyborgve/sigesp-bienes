import { FuenteFinanciamiento } from '@core/models/otros-modulos/fuente-financiamiento';
import { map, tap, filter } from 'rxjs/operators';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Basica } from '@core/models/auxiliares/basica';
import { BuscadorTipoSemovienteComponent } from '@pages/definiciones/tipos-semoviente/buscador-tipo-semoviente/buscador-tipo-semoviente.component';
import { BuscadorPropositoSemovienteComponent } from '@pages/definiciones/propositos-semoviente/buscador-proposito-semoviente/buscador-proposito-semoviente.component';
import { BuscadorRazaComponent } from '@pages/definiciones/razas/buscador-raza/buscador-raza.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { TipoActivo } from '@core/types/tipo-activo';
import { BuscadorSedeComponent } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.component';
import { Subscription } from 'rxjs';
import { BuscadorSeguroComponent } from '@pages/definiciones/seguros/buscador-seguro/buscador-seguro.component';
import { BuscadorClaseComponent } from '@pages/definiciones/clases/buscador-clase/buscador-clase.component';
import { BuscadorOrigenComponent } from '@pages/definiciones/origenes/buscador-origen/buscador-origen.component';
import { SigespService } from 'sigesp';
import { BuscadorFuenteFinanciamientoComponent } from '@shared/components/buscador-fuente-financiamiento/buscador-fuente-financiamiento.component';
import { UNIDADES_MEDIDA } from '@core/constants/unidades-medida';
import { BuscadorCentroCostoComponent } from '@shared/components/buscador-centro-costo/buscador-centro-costo.component';
import { BuscadorTipoAnimalComponent } from '@pages/definiciones/tipos-animal/buscador-tipo-animal/buscador-tipo-animal.component';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-activo-detalles',
  templateUrl: './activo-detalles.component.html',
  styleUrls: ['./activo-detalles.component.scss'],
})
export class ActivoDetallesComponent implements OnInit, OnDestroy {
  private subscripciones: Subscription[] = [];
  @Input() formulario: UntypedFormGroup;
  @Input() tipoActivo: TipoActivo = 'INMUEBLE';

  unidadesMedidaPeso = UNIDADES_MEDIDA['PESO'];
  unidadesMedidaTiempo = UNIDADES_MEDIDA['TIEMPO'];

  constructor(private _dialog: MatDialog, private _sigesp: SigespService) {}

  ngOnInit(): void {
    this.formulario.valueChanges
      .pipe(
        tap(() => {
          if (this.formulario.valid)
            this.formulario.patchValue({ depreciable: 1 });
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  buscarSedeUbicacion() {
    let dialog = this._dialog.open(BuscadorSedeComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.sedeUbicacionId),
          map(entidad => entidad as Basica),
          tap(entidad =>
            this.formulario.patchValue({ sedeUbicacionId: entidad.id })
          )
        )
        .subscribe()
    );
  }

  buscarTipoSemoviente() {
    let dialog = this._dialog.open(BuscadorTipoSemovienteComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.tipoSemovienteId),
          map(entidad => entidad as Basica),
          tap(entidad =>
            this.formulario.patchValue({ tipoSemovienteId: entidad.id })
          )
        )
        .subscribe()
    );
  }

  buscarPropositoSemoviente() {
    let dialog = this._dialog.open(BuscadorPropositoSemovienteComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(
            this.formulario.value.propositoSemovienteId
          ),
          map(entidad => entidad as Basica),
          tap(entidad =>
            this.formulario.patchValue({
              propositoSemovienteId: entidad.id,
            })
          )
        )
        .subscribe()
    );
  }

  buscarTipoAnimal() {
    let dialog = this._dialog.open(BuscadorTipoAnimalComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.tipoAnimal),
          map(tipoAnimal => tipoAnimal as Basica),
          tap(entidad => this.formulario.patchValue({ tipoAnimal: entidad.id }))
        )
        .subscribe()
    );
  }

  buscarRaza() {
    let dialog = this._dialog.open(BuscadorRazaComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.razaId),
          map(entidad => entidad as Basica),
          tap(entidad => this.formulario.patchValue({ razaId: entidad.id }))
        )
        .subscribe()
    );
  }

  buscarSeguro() {
    let dialog = this._dialog.open(BuscadorSeguroComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.seguroId),
          map(entidad => entidad as Basica),
          tap((entidad: Basica) =>
            this.formulario.patchValue({ seguroId: entidad.id })
          )
        )
        .subscribe()
    );
  }

  buscarFuenteFinanciamiento() {
    let dialog = this._dialog.open(BuscadorFuenteFinanciamientoComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.fuenteFinanciaiento),
          tap((fuente: FuenteFinanciamiento) =>
            this.formulario.patchValue({ fuenteFinanciamiento: fuente.id })
          )
        )
        .subscribe()
    );
  }

  buscarClase() {
    let dialog = this._dialog.open(BuscadorClaseComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.calseId),
          map(entidad => entidad as Basica),
          tap((entidad: Basica) =>
            this.formulario.patchValue({ claseId: entidad.id })
          )
        )
        .subscribe()
    );
  }

  buscarOrigen() {
    let dialog = this._dialog.open(BuscadorOrigenComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.origenId),
          map(entidad => entidad as Basica),
          tap((origen: Basica) =>
            this.formulario.patchValue({ origenId: origen.id })
          )
        )
        .subscribe()
    );
  }

  buscarCentroCosto() {
    let dialog = this._dialog.open(BuscadorCentroCostoComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.codigoCentroCostos),
          tap(entidad =>
            this.formulario.patchValue({ codigoCentroCostos: entidad.id })
          )
        )
        .subscribe()
    );
  }
}
