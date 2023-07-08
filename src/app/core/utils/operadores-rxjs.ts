import { CentroCosto } from '@core/models/centro-costo';
import { Ciudad } from '@core/models/ciudad';
import { CuentaContable } from '@core/models/cuenta-contable';
import { Estado } from '@core/models/estado';
import { FuenteFinanciemiento } from '@core/models/fuente-financiemiento';
import { Moneda } from '@core/models/moneda';
import { Municipio } from '@core/models/municipio';
import { Proveedor } from '@core/models/otros-modulos/proveedor';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MCentroCosto,
  MCity,
  MCountry,
  MCuentaInstitucional,
  MFuenteFinanciamiento,
  MMoneda,
  MMunicipality,
  MProveedor,
  MState,
} from 'sigesp';

export const filtrarValoresIniciales = () =>
  pipe(
    map((entidades: any[]) => entidades.filter(entidad => entidad.id !== '0')),
    map((entidades: any[]) =>
      entidades.filter(entidad => entidad.id !== '---')
    ),
    map((entidades: any[]) => entidades.filter(entidad => entidad.id !== '--'))
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
            id: fuente['codigo'],
            codigo: fuente['codigoFuenteFinanciamiento'],
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

export const adaptarEstados = () =>
  pipe(
    map((estados: MState[]) =>
      estados.map(
        estado =>
          <Estado>{
            empresaId: undefined,
            id: estado.code,
            paisId: estado.countryCode,
            codigo: estado.code,
            denominacion: estado.name,
            capital: estado.capital,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );

export const adaptarMunicipios = () =>
  pipe(
    map((municipios: MMunicipality[]) =>
      municipios.map(
        municipio =>
          <Municipio>{
            empresaId: undefined,
            id: municipio.code,
            paisId: municipio.countryCode,
            estadoId: municipio.stateCode,
            codigo: municipio.code,
            denominacion: municipio.name,
            capital: municipio.capital,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );

export const adaptarCiudades = () =>
  pipe(
    map((ciudades: MCity[]) =>
      ciudades.map(
        ciudad =>
          <Ciudad>{
            empresaId: undefined,
            id: ciudad.code,
            paisId: ciudad.countryCode,
            estadoId: ciudad.stateCode,
            codigo: ciudad.code,
            denominacion: ciudad.name,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );

export const adaptarCentrosCosto = () =>
  pipe(
    map((centrosCosto: MCentroCosto[]) =>
      centrosCosto.map(
        centroCosto =>
          <CentroCosto>{
            empresaId: centroCosto.idEmpresa,
            id: centroCosto.centro,
            codigo: centroCosto.centro,
            denominacion: centroCosto.denominacion,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );

export const adaptarProveedores = () =>
  pipe(
    map((proveedores: MProveedor[]) =>
      proveedores.map(
        proveedor =>
          <Proveedor>{
            empresaId: undefined,
            id: proveedor.codigo,
            codigo: proveedor.codigo,
            denominacion: proveedor.nombre,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
