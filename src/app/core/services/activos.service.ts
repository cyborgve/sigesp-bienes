import { MActivo } from './../models/MActivo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SigespService, MCuentaPresupuesto } from 'sigesp';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ActivosService {
  constructor(private http: HttpClient, private sigesp: SigespService) {}

  public getUnitMeasurement() {
    let operacion = 'buscar';
    return this.http
      .get(
        `${this.sigesp.URL}/dao/siv/unidadMedida_dao.php?operacion=${operacion}`,
        {
          headers: {
            Authorization: this.sigesp.usuarioActivo.token,
          },
        }
      )
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data;
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public getAccountPlanGeneral() {
    let egreso = 'egreso';
    return this.http
      .get(
        `${this.sigesp.URL}/dao/scg/plan_cuentas_recursos_egresos_dao.php?egreso=${egreso}`,
        { headers: this.sigesp.getHttpHeaders() }
      )
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data.map(e => new MCuentaPresupuesto(e));
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public getLastActive(catalog: string) {
    return this.http
      .get(`${this.sigesp.URL}/dao/sbn/activo_dao.php?catalog=${catalog}`, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data.map(e => new MActivo(e));
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public getActive() {
    return this.http
      .get(`${this.sigesp.URL}/dao/sbn/activo_dao.php?`, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data.map(e => new MActivo(e));
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public saveActive(active: MActivo) {
    const body = this.getBody(active);
    console.log(body);
    return this.http
      .post(`${this.sigesp.URL}/dao/sbn/activo_dao.php`, body, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            if (res.data != null) {
              res.data = res.data.map(element => new MActivo(element));
            } else {
              res.data = [];
            }
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public deleteActive(codigo: number) {
    return this.http
      .delete(`${this.sigesp.URL}/dao/sbn/activo_dao.php?codigo=${codigo}`, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data;
          }
          return res;
        })
      );
  }

  public updateActive(active: MActivo) {
    const body = this.getBody(active);
    return this.http
      .put(`${this.sigesp.URL}/dao/sbn/activo_dao.php`, body, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            if (res.data != null) {
              res.data = res.data;
            } else {
              res.data = [];
            }
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public getNetCode(serial: string) {
    return this.http
      .get(`${this.sigesp.URL}/dao/sbn/activo_dao.php?serial=${serial}`, {
        headers: {
          Authorization: this.sigesp.usuarioActivo.token,
        },
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data;
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public getBody(dG: MActivo) {
    const body = {
      id_empresa: dG.idEmpresa,
      id_activo: dG.idActivo,
      codintbien: dG.codigoInternoBien,
      desbien: dG.descripcionBien,
      catcta: dG.catalogoCuenta,
      fecregbien: dG.fechaRegistroBien,
      tipact: dG.tipoActivo,
      estdeprec: dG.estatusDepreciacion,
      fecadqbien: dG.fechaAdquisicionBien,
      fecingbien: dG.fechaIngresoBien,
      observacion: dG.observacion,
      id_origen: dG.idOrigen,
      id_uniadmbien: dG.idUnidadAdministrativaBien,
      id_sede: dG.idSede,
      peso: dG.peso,
      id_respuso: dG.idResponsableUso,
      id_estadouso: dG.idEstadoUso,
      valadqbien: dG.valorAdquisicionBien,
      codmon: dG.codigoMoneda,
      id_conservacion: dG.idConservacion,
      expedobien: dG.explicacionEstadoConservacionBien,
      numserbien: dG.numeroSerialBien,
      id_marca: dG.idMarca,
      id_modelo: dG.idModelo,
      anofabbien: dG.annoFabricacionBien,
      id_color: dG.idColor,
      estposcomp: dG.estatusPoseeComponente,
      descompbien: dG.descripcionComponenteBien,
      esptecbien: dG.especificacionesTecnicaBien,
      garantia: dG.garantia,
      id_unimedgar: dG.idUnidadMedidaGarantia,
      fecinigar: dG.fechaInicioGarantia,
      fecfingar: dG.fecchaFinGarantia,
      id_clase: dG.idClase,
      desotraclas: dG.descripcionOtraClase,
      sercarbien: dG.serialCarroceriaBien,
      sermotbien: dG.serialMotorBien,
      plasigbien: dG.placaSiglasBien,
      numtitpro: dG.numeroTituloPropiedad,
      capbien: dG.capacidadBien,
      nombien: dG.nombreBien,
      id_uso: dG.idUso,
      estgps: dG.estatusGPS,
      espsisgps: dG.especificacionSistemaGPS,
      id_tipsem: dG.idTipoSemoviente,
      genero: dG.genero,
      id_raza: dG.idRaza,
      id_prosem: dG.idPropositoSemoviente,
      id_unimedpeso: dG.idUnidadaMedidaPeso,
      numhieani: dG.numeroHierro,
      espani: dG.especificacionAnimal,
      id_tipani: dG.idTipoAnimal,
      id_responsable: dG.id_Responsable,
      fecnacani: dG.fechaNacimientoAnimal,
      ofiregnot: dG.oficinaRegistroNotaria,
      refreg: dG.referenciaRegistro,
      tomo: dG.tomo,
      folio: dG.folio,
      protocolo: dG.protocolo,
      numreg: dG.numeroRegistro,
      fecreg: dG.fechaRegistro,
      propant: dG.propietarioAnterior,
      dependencias: dG.dependencias,
      areaconst: dG.areaConstruccion,
      id_unimedconst: dG.idUnidadMedidaConstruccion,
      area_de_terreno: dG.areaDelTerreno,
      id_unimedterr: dG.idUnidadMedidaTerreno,
      espinm: dG.especificacionInmueble,
      estsede: dG.estatusSede,
      id_sede_ubicacion: dG.idSedeUbicacion,
      espcolor: dG.especificacionColor,
      id_rotulacion: dG.idRotulacion,
      id_categoria: dG.idCategoria,
      id_tipcomp: dG.idTipoComponente,
      estaseg: dG.estatusAsegurado,
      id_seguro: dG.idSeguro,
      metdep: dG.metodoDepreciacion,
      vidautil: dG.vidaUtil,
      valrescate: dG.valorRescate,
      sc_ctagasdep: dG.cuentaDepreciacion,
      sc_ctadepacum: dG.cuentaDepreciacionAcumulada,
      codfuefin: dG.codigoFuenteFinaciamiento,
      codcencos: dG.codigoCentroCosto,
      chapa: dG.chapa,
      sig_cuenta: dG.cuentaPresupuestaria,
      sc_cuenta: dG.cuentaContable,
      usobieveh: dG.usoBienVehiculo,
    };
    return body;
  }
}
