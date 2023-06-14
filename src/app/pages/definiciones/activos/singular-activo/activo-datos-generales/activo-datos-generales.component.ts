import { tap, map, first } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Basica } from '@core/models/basica';
import { BuscadorMarcaComponent } from '@pages/definiciones/marcas/buscador-marca/buscador-marca.component';
import { BuscadorModeloComponent } from '@pages/definiciones/modelos/buscador-modelo/buscador-modelo.component';
import { BuscadorColorComponent } from '@pages/definiciones/colores/buscador-color/buscador-color.component';
import { BuscadorClaseComponent } from '@pages/definiciones/clases/buscador-clase/buscador-clase.component';
import { TIPOS_ACTIVO } from '@core/constants/tipos_activo';
import { MMoneda, SigespService } from 'sigesp';
import { MCuentaInstitucional } from 'sigesp/lib/core/models/SCG/cuentaInstitucional.model';
import { BuscadorOrigenComponent } from '@pages/definiciones/origenes/buscador-origen/buscador-origen.component';
import { BuscadorSeguroComponent } from '@pages/definiciones/seguros/buscador-seguro/buscador-seguro.component';
import { BuscadorCategoriaComponent } from '@pages/definiciones/categorias/buscador-categoria/buscador-categoria.component';

@Component({
  selector: 'app-activo-datos-generales',
  templateUrl: './activo-datos-generales.component.html',
  styleUrls: ['./activo-datos-generales.component.scss'],
})
export class ActivoDatosGeneralesComponent {
  @Input() formulario: FormGroup = new FormGroup({});

  tiposActivo = TIPOS_ACTIVO;

  monedas: MMoneda[] = [];

  monedas2 = () => this._sigesp.getMonedas('todas');
  catalogoCuentas: MCuentaInstitucional[];

  constructor(private _dialog: MatDialog, private _sigesp: SigespService) {
    this._sigesp
      .getMonedas('todas')
      .pipe(
        first(),
        tap(monedas => (this.monedas = monedas))
      )
      .subscribe();
    this._sigesp
      .getCuentasInstitucionales()
      .pipe(
        first(),
        tap(cuentas => this.catalogoCuentas)
      )
      .subscribe();
  }

  buscarCatalogoCuentas() {
    TODO: 'Pendiente de oreguntar de donde obtengo estos datos';
    alert('TO-DO');
  }

  buscarMoneda() {
    TODO: 'Pendiente de oreguntar de donde obtengo estos datos';
    alert('TO-DO');
  }

  buscarMarca() {
    let dialog = this._dialog.open(BuscadorMarcaComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ marcaId: entidad.id })
      )
    );
  }

  buscarModelo() {
    let dialog = this._dialog.open(BuscadorModeloComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ modeloId: entidad.id })
      )
    );
  }

  buscarColor() {
    let dialog = this._dialog.open(BuscadorColorComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ colorId: entidad.id })
      )
    );
  }

  buscarClase() {
    let dialog = this._dialog.open(BuscadorClaseComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ claseId: entidad.id })
      )
    );
  }

  buscarOrigen() {
    let dialog = this._dialog.open(BuscadorOrigenComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((origen: Basica) =>
        this.formulario.patchValue({ origenId: origen.id })
      )
    );
  }

  buscarSeguro() {
    let dialog = this._dialog.open(BuscadorSeguroComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ seguroId: entidad.id })
      )
    );
  }

  buscarFuenteFinanciamiento() {
    TODO: 'preguntar de donde se obtienen estos datos';
    alert('TO-DO');
  }

  buscarRotulacion() {
    TODO: 'preguntar de donde se obtienen estos datos';
    alert('TO-DO');
  }

  buscarCategoria() {
    let dialog = this._dialog.open(BuscadorCategoriaComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ categoriaId: entidad.id })
      )
    );
  }
}
