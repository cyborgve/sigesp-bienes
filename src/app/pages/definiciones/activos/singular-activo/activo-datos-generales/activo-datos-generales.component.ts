import { DenominacionMarcaPipe } from '@shared/pipes/denominacion-marca.pipe';
import { tap, map, first, filter } from 'rxjs/operators';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Basica } from '@core/models/auxiliares/basica';
import { BuscadorMarcaComponent } from '@pages/definiciones/marcas/buscador-marca/buscador-marca.component';
import { BuscadorModeloComponent } from '@pages/definiciones/modelos/buscador-modelo/buscador-modelo.component';
import { BuscadorColorComponent } from '@pages/definiciones/colores/buscador-color/buscador-color.component';
import { TIPOS_ACTIVO } from '@core/constants/tipos_activo';
import { MMoneda, SigespService } from 'sigesp';
import { BuscadorCategoriaComponent } from '@pages/definiciones/categorias/buscador-categoria/buscador-categoria.component';
import { BuscadorRotulacionComponent } from '@pages/definiciones/rotulaciones/buscador-rotulacion/buscador-rotulacion.component';
import { Subscription, pipe } from 'rxjs';
import { BuscadorMonedaComponent } from '@shared/components/buscador-moneda/buscador-moneda.component';
import { Moneda } from '@core/models/otros-modulos/moneda';
import { BuscadorCatalogoGeneralComponent } from '@pages/definiciones/catalogos-generales/buscador-catalogo-general/buscador-catalogo-general.component';
import { CatalogoGeneral } from '@core/models/definiciones/catalogo-general';

@Component({
  selector: 'app-activo-datos-generales',
  templateUrl: './activo-datos-generales.component.html',
  styleUrls: ['./activo-datos-generales.component.scss'],
})
export class ActivoDatosGeneralesComponent implements OnInit, OnDestroy {
  private subscripciones: Subscription[] = [];
  @Input() formulario: FormGroup = new FormGroup({});

  tiposActivo = TIPOS_ACTIVO;
  monedas: MMoneda[] = [];
  buscadorMarca = BuscadorMarcaComponent;
  denominacionMarcaPipe = DenominacionMarcaPipe;

  constructor(private _dialog: MatDialog, private _sigesp: SigespService) {}

  ngOnInit(): void {
    this._sigesp
      .getMonedas('todas')
      .pipe(
        first(),
        tap(monedas => (this.monedas = monedas))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  buscarCatalogoCuentas() {
    let soloCuentas = () =>
      pipe(
        map((cuentas: CatalogoGeneral[]) =>
          cuentas.filter(cuenta => cuenta.estadoMovimiento === 'Cue')
        )
      );
    let dialog = this._dialog.open(BuscadorCatalogoGeneralComponent, {
      width: '85%',
      height: '95%',
      data: { filtros: [soloCuentas()] },
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          tap((catalogoGeneral: CatalogoGeneral) =>
            this.formulario.patchValue({
              catalogoCuentas: catalogoGeneral.id,
            })
          )
        )
        .subscribe()
    );
  }

  buscarMoneda() {
    let dialog = this._dialog.open(BuscadorMonedaComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          tap((moneda: Moneda) =>
            this.formulario.patchValue({ monedaId: moneda.id })
          )
        )
        .subscribe()
    );
  }

  buscarModelo() {
    let dialog = this._dialog.open(BuscadorModeloComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          map(entidad => entidad),
          tap(entidad => this.formulario.patchValue({ modeloId: entidad.id }))
        )
        .subscribe()
    );
  }

  buscarColor() {
    let dialog = this._dialog.open(BuscadorColorComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          map(entidad => entidad as Basica),
          tap((entidad: Basica) =>
            this.formulario.patchValue({ colorId: entidad.id })
          )
        )
        .subscribe()
    );
  }

  buscarRotulacion() {
    let dialog = this._dialog.open(BuscadorRotulacionComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          map(entidad => entidad as Basica),
          tap(entidad =>
            this.formulario.patchValue({ rotulacionId: entidad.id })
          )
        )
        .subscribe()
    );
  }

  buscarCategoria() {
    let dialog = this._dialog.open(BuscadorCategoriaComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          map(entidad => entidad as Basica),
          tap(entidad =>
            this.formulario.patchValue({ categoriaId: entidad.id })
          )
        )
        .subscribe()
    );
  }
}
