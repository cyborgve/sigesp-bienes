import { CuentaContable } from '@core/models/cuenta-contable';
import { FuenteFinanciemiento } from '@core/models/fuente-financiemiento';
import { Moneda } from '@core/models/moneda';
import { pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  MCountry,
  MCuentaInstitucional,
  MFuenteFinanciamiento,
  MMoneda,
} from 'sigesp';

export const filtrarValoresIniciales = () =>
  pipe(
    map((entidades: any[]) => entidades.filter(entidad => entidad.id !== '0')),
    map((entidades: any[]) => entidades.filter(entidad => entidad.id !== '---'))
  );

export const ordenarPorCodigo = () =>
  pipe(
    map((entidades: any[]) =>
      entidades.sort((a, b) => (a.codigo > b.codigo ? 1 : -1))
    )
  );

export const ordenarPorId = () =>
  pipe(
    map((entidades: any[]) => entidades.sort((a, b) => (a.id > b.id ? 1 : -1)))
  );

export const adaptarMonedas = () =>
  pipe(
    map((mmonedas: MMoneda[]) =>
      mmonedas.map(
        mmoneda =>
          <Moneda>{
            empresaId: undefined,
            id: mmoneda.codigo,
            codigo: mmoneda.codigo,
            denominacion: mmoneda.denominacion,
            iso: mmoneda.iso,
            simbolo: mmoneda.simbolo,
            decimales: mmoneda.decimales,
            separadorDecimal: mmoneda.separadorDecimal,
            separadorMiles: mmoneda.separadorMiles,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );

export const adaptarCuentasContables = () =>
  pipe(
    map((cuentas: MCuentaInstitucional[]) =>
      cuentas.map(
        cta =>
          <CuentaContable>{
            empresaId: undefined,
            id: cta.cuenta,
            codigo: cta.cuenta,
            denominacion: cta.denominacion,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );

export const adaptarFuentesFinanciemiento = () =>
  pipe(
    map((fuentes: MFuenteFinanciamiento[]) =>
      fuentes.map(
        fuente =>
          <FuenteFinanciemiento>{
            empresaId: undefined,
            id: fuente.codigoFuenteFinanciamiento,
            codigo: fuente.codigo,
            denominacion: fuente.denominacionFuenteFinanciamiento,
            explicacion: fuente.explicacionFuenteFinanciamiento,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );

export const adaptarPaises = () =>
  pipe(
    map((paises: MCountry[]) =>
      paises.map(
        pais =>
          <FuenteFinanciemiento>{
            empresaId: undefined,
            id: pais.code,
            codigo: pais.code,
            denominacion: pais.name,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
