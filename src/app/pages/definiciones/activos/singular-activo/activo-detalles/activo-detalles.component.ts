import { FuenteFinanciemiento } from '@core/models/otros-modulos/fuente-financiemiento';
import { map, tap } from 'rxjs/operators';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Basica } from '@core/models/auxiliares/basica';
import { BuscadorTipoSemovienteComponent } from '@pages/definiciones/tipos-semoviente/buscador-tipo-semoviente/buscador-tipo-semoviente.component';
import { BuscadorPropositoSemovienteComponent } from '@pages/definiciones/propositos-semoviente/buscador-proposito-semoviente/buscador-proposito-semoviente.component';
import { BuscadorRazaComponent } from '@pages/definiciones/razas/buscador-raza/buscador-raza.component';
import { MatDialog } from '@angular/material/dialog';
import { TipoActivo } from '@core/types/tipo-activo';
import { BuscadorSedeComponent } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.component';
import { Subscription } from 'rxjs';
import { BuscadorSeguroComponent } from '@pages/definiciones/seguros/buscador-seguro/buscador-seguro.component';
import { BuscadorClaseComponent } from '@pages/definiciones/clases/buscador-clase/buscador-clase.component';
import { BuscadorOrigenComponent } from '@pages/definiciones/origenes/buscador-origen/buscador-origen.component';
import { SigespService } from 'sigesp';
import { BuscadorFuenteFinanciemientoComponent } from '@shared/components/buscador-fuente-financiemiento/buscador-fuente-financiemiento.component';
import { UNIDADES_MEDIDA } from '@core/constants/unidades-medida';
import { BuscadorCentroCostoComponent } from '@shared/components/buscador-centro-costo/buscador-centro-costo.component';

@Component({
  selector: 'app-activo-detalles',
  templateUrl: './activo-detalles.component.html',
  styleUrls: ['./activo-detalles.component.scss'],
})
export class ActivoDetallesComponent implements OnDestroy {
  private subscripciones: Subscription[] = [];
  @Input() formulario: FormGroup = new FormGroup({});
  @Input() tipoActivo: TipoActivo = 'INMUEBLE';

  unidadesMedidaPeso = UNIDADES_MEDIDA['PESO'];
  unidadesMedidaTiempo = UNIDADES_MEDIDA['TIEMPO'];

  constructor(private _dialog: MatDialog, private _sigesp: SigespService) {}

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
          map(entidad => entidad as Basica),
          tap(entidad =>
            this.formulario.patchValue({ sedeUbicacionId: entidad.id })
          )
        )
        .subscribe()
    );
  }

  buscarTipoUso() {
    alert('TODO');
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
          map(entidad => entidad as Basica),
          tap(entidad =>
            this.formulario.patchValue({ propositoSemovienteId: entidad.id })
          )
        )
        .subscribe()
    );
  }

  buscarUnidadMedida() {
    TODO: 'preguntar de donde se obtienen estos datos';
    alert('TO-DO');
  }

  buscarTipoAnimal() {
    TODO: 'preguntar de donde se obtienen estos datos';
    alert('TO-DO');
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
          map(entidad => entidad as Basica),
          tap((entidad: Basica) =>
            this.formulario.patchValue({ seguroId: entidad.id })
          )
        )
        .subscribe()
    );
  }

  buscarFuenteFinanciamiento() {
    let dialog = this._dialog.open(BuscadorFuenteFinanciemientoComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((fuente: FuenteFinanciemiento) =>
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
  }
}
