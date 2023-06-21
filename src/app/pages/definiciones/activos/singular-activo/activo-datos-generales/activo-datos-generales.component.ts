import { tap, map, first } from 'rxjs/operators';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Basica } from '@core/models/basica';
import { BuscadorMarcaComponent } from '@pages/definiciones/marcas/buscador-marca/buscador-marca.component';
import { BuscadorModeloComponent } from '@pages/definiciones/modelos/buscador-modelo/buscador-modelo.component';
import { BuscadorColorComponent } from '@pages/definiciones/colores/buscador-color/buscador-color.component';
import { TIPOS_ACTIVO } from '@core/constants/tipos_activo';
import { MMoneda, SigespService } from 'sigesp';
import { BuscadorCategoriaComponent } from '@pages/definiciones/categorias/buscador-categoria/buscador-categoria.component';
import { BuscadorRotulacionComponent } from '@pages/definiciones/rotulaciones/buscador-rotulacion/buscador-rotulacion.component';
import { Subscription } from 'rxjs';

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
    TODO: 'Pendiente de preguntar de donde obtengo estos datos';
    alert('TO-DO');
  }

  buscarMoneda() {
    TODO: 'Pendiente de preguntar de donde obtengo estos datos';
    alert('TO-DO');
  }

  buscarMarca() {
    let dialog = this._dialog.open(BuscadorMarcaComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          map(entidad => entidad as Basica),
          tap((entidad: Basica) =>
            this.formulario.patchValue({ marcaId: entidad.id })
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
          map(entidad => entidad as Basica),
          tap((entidad: Basica) =>
            this.formulario.patchValue({ modeloId: entidad.id })
          )
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
          map(entidad => entidad as Basica),
          tap(entidad =>
            this.formulario.patchValue({ categoriaId: entidad.id })
          )
        )
        .subscribe()
    );
  }
}
