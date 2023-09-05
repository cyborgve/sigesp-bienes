import { switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivoService } from '../definiciones/activo.service';
import { Observable, forkJoin } from 'rxjs';
import { Id } from '@core/types/id';
import { EmpresaService } from '../otros-modulos/empresa.service';
import { TIPOS_ACTIVO } from '@core/constants/tipos_activo';
import { CatalogoGeneralService } from '../definiciones/catalogo-general.service';
import { SigespService } from 'sigesp';
import { ColorService } from '../definiciones/color.service';
import { ModeloService } from '../definiciones/modelo.service';
import { MarcaService } from '../definiciones/marca.service';
import { RotulacionService } from '../definiciones/rotulacion.service';
import { CategoriaService } from '../definiciones/categoria.service';

@Injectable({
  providedIn: 'root',
})
export class InformacionDefinicionService {
  constructor(
    private _sigesp: SigespService,
    private _activo: ActivoService,
    private _empresa: EmpresaService,
    private _catalogoGeneral: CatalogoGeneralService,
    private _color: ColorService,
    private _modelo: ModeloService,
    private _marca: MarcaService,
    private _rotulacion: RotulacionService,
    private _categoria: CategoriaService
  ) {}

  private nombreEmpresa = (empresaId: Id) =>
    this._empresa
      .datosGenerales(empresaId)
      .pipe(map(datosGenerales => datosGenerales.nombre));

  private codigo = (codigo: string) => codigo.substring(1, 5);
  private tipoActivo = (tipoActivo: string) =>
    TIPOS_ACTIVO.find(
      tipo => tipo.substring(1, 3) === tipoActivo.toUpperCase()
    );
  private denominacionCatalogoCuentas = (catalogoCuentas: Id) =>
    this._catalogoGeneral
      .buscarPorId(catalogoCuentas)
      .pipe(map(catalogo => catalogo.denominacion));
  private denominacionMoneda = (monedaId: Id) =>
    this._sigesp.getMonedas('uno', Number(monedaId)).pipe(
      map(monedas => monedas[0]),
      map(moneda => moneda['denominacion'])
    );
  private denominacionColor = (colorId: Id) =>
    this._color.buscarPorId(colorId).pipe(map(color => color.denominacion));
  private denominacionModelo = (modeloId: Id) =>
    this._modelo.buscarPorId(modeloId).pipe(map(modelo => modelo.denominacion));
  private denominacionMarcaModelo = (modeloId: Id) =>
    this._modelo
      .buscarPorId(modeloId)
      .pipe(
        switchMap(modelo =>
          this._marca
            .buscarPorId(modelo.marcaId)
            .pipe(
              map(marca => `${modelo.denominacion} - ${marca.denominacion}`)
            )
        )
      );
  private denominacionRotulacion = (rotulacionId: Id) =>
    this._rotulacion
      .buscarPorId(rotulacionId)
      .pipe(map(rotulacion => rotulacion.denominacion));
  private denominacionCategoria = (categoriaId: Id) =>
    this._categoria
      .buscarPorId(categoriaId)
      .pipe(map(categoria => categoria.denominacion));

  obtenerActivo(activoId: Id) {
    return this._activo.buscarPorId(activoId).pipe(
      switchMap(activo => {
        let buscarInformacion = [
          this.nombreEmpresa(activo.empresaId),
          this.denominacionCatalogoCuentas(activo.catalogoCuentas),
          this.denominacionMoneda(activo.monedaId),
          this.denominacionColor(activo.colorId),
          this.denominacionMarcaModelo(activo.modeloId),
          this.denominacionRotulacion(activo.rotulacionId),
          this.denominacionCategoria(activo.categoriaId),
        ];
        return forkJoin(buscarInformacion).pipe(
          map(
            ([
              empresa,
              catalogoCuentas,
              moneda,
              color,
              marcaModelo,
              rotulacion,
              categoria,
            ]) => ({
              empresa: empresa,
              id: activo.id,
              codigo: this.codigo(activo.codigo),
              tipoActivo: this.tipoActivo(activo.tipoActivo),
              fechaRegistro: new Date(activo.fechaRegistro),
              catalogoCuentas: catalogoCuentas,
              serialRotulacion: activo.serialRotulacion,
              denominacion: activo.denominacion,
              observaciones: activo.observaciones,
              fechaAdquisicion: new Date(activo.fechaAdquisicion),
              valorAdquisicion: Number(activo.valorAdquisicion).toFixed(2),
              moneda: moneda,
              modelo: marcaModelo,
              anioFabricacion: activo.anioFabricacion,
              serialFabrica: activo.serialFabrica,
              color: color,
              rotulacion: rotulacion,
              categoria: categoria,
              detalle: activo.detalle,
              componentes: activo.componentes,
              depreciacion: activo.depreciacion,
              ubicacion: activo.ubicacion,
            })
          )
        );
      })
    );
  }

  obtenerActivos(ids: Id[]): Observable<any[]> {
    let buscarActivos = ids.map(id => this.obtenerActivo(id));
    return forkJoin(buscarActivos);
  }
}
