import { tap, map } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorOrigenComponent } from '@pages/definiciones/origenes/buscador-origen/buscador-origen.component';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { BuscadorSedeComponent } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.component';
import { Basica } from '@core/models/basica';
import { BuscadorMarcaComponent } from '@pages/definiciones/marcas/buscador-marca/buscador-marca.component';
import { BuscadorModeloComponent } from '@pages/definiciones/modelos/buscador-modelo/buscador-modelo.component';
import { BuscadorColorComponent } from '@pages/definiciones/colores/buscador-color/buscador-color.component';
import { BuscadorClaseComponent } from '@pages/definiciones/clases/buscador-clase/buscador-clase.component';
import { BuscadorUsoComponent } from '@pages/definiciones/usos/buscador-uso/buscador-uso.component';
import { BuscadorTipoSemovienteComponent } from '@pages/definiciones/tipos-semoviente/buscador-tipo-semoviente/buscador-tipo-semoviente.component';
import { BuscadorPropositoSemovienteComponent } from '@pages/definiciones/propositos-semoviente/buscador-proposito-semoviente/buscador-proposito-semoviente.component';
import { BuscadorCategoriaComponent } from '@pages/definiciones/categorias/buscador-categoria/buscador-categoria.component';
import { BuscadorTipoComponenteComponent } from '@pages/definiciones/tipos-componente/buscador-tipo-componente/buscador-tipo-componente.component';
import { BuscadorRazaComponent } from '@pages/definiciones/razas/buscador-raza/buscador-raza.component';
import { TIPOS_ACTIVO } from '@core/constants/tipos_activo';
import { MMoneda, CurrencyService } from 'sigesp';

@Component({
  selector: 'app-activo-datos-generales',
  templateUrl: './activo-datos-generales.component.html',
  styleUrls: ['./activo-datos-generales.component.scss'],
})
export class ActivoDatosGeneralesComponent {
  @Input() formulario: FormGroup = new FormGroup({});

  tiposActivo = TIPOS_ACTIVO;

  monedas: MMoneda[] = [];

  constructor(private _dialog: MatDialog, private _moneda: CurrencyService) {}

  buscarCatalogoCuentas() {
    TODO: 'Pendiente de oreguntar de donde obtengo estos datos';
    alert('TO-DO');
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

  buscarUnidadAdministrativa() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ origenId: entidad.id })
      )
    );
  }

  buscarSede() {
    let dialog = this._dialog.open(BuscadorSedeComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ sedeId: entidad.id })
      )
    );
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

  buscarUso() {
    let dialog = this._dialog.open(BuscadorUsoComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ usoId: entidad.id })
      )
    );
  }

  buscarTipoSemoviente() {
    let dialog = this._dialog.open(BuscadorTipoSemovienteComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ tipoSemovienteId: entidad.id })
      )
    );
  }

  buscarPropositoSemoviente() {
    let dialog = this._dialog.open(BuscadorPropositoSemovienteComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ propositoSemovienteId: entidad.id })
      )
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

  buscarTipoComponente() {
    let dialog = this._dialog.open(BuscadorTipoComponenteComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ tipoComponenteId: entidad.id })
      )
    );
  }

  buscarRaza() {
    let dialog = this._dialog.open(BuscadorRazaComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ razaId: entidad.id })
      )
    );
  }

  buscarFuenteFinanciamiento() {
    TODO: 'preguntar de donde se obtienen estos datos';
    alert('TO-DO');
  }
}
