import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SigespService } from 'sigesp';
import { ConfiguracionBienesService } from '@core/services/configuracion-bienes.service';
import { MCatalogoGeneral } from '@core/models/MCatalogoGeneral';
import { CatalogoGeneralService } from '@core/services/catalogo-general.service';
//import { MConfigSBN } from "@core/models/MconfigSBN";

@Component({
  selector: 'app-configuracion-bienes',
  templateUrl: './configuracion-bienes.component.html',
  styleUrls: ['./configuracion-bienes.component.scss'],
})
export class ConfiguracionBienesComponent implements OnInit {
  public formSbnConfig: FormGroup;
  public operacion: string;
  public idConfig: number;
  public cuentaPattern = '(^[0-9-]{1,30})$';
  public config: any = [];
  public longFormatoGeneral: number;
  public longFormatoInstitu: number;
  public AllCatalog: MCatalogoGeneral[] = [];

  constructor(
    private router: Router,
    private sigesp: SigespService,
    private configSBNService: ConfiguracionBienesService,
    private catalogoGeneralService: CatalogoGeneralService
  ) {
    this.formSbnConfig = new FormGroup({
      normativa: new FormControl(),
      afectacion: new FormControl(),
      incorporacionAuto: new FormControl(),
      generarAsiento: new FormControl(),
      formatoCuentaGeneral: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(1),
        Validators.pattern(this.cuentaPattern),
      ]),
      formatoCuentaInstitucional: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(1),
        Validators.pattern(this.cuentaPattern),
      ]),
      mostrarSeperadores: new FormControl(),
    });
  }

  ngOnInit() {
    this.getConfig();
    this.catalogoGeneralService.getAllGeneralCatalog().subscribe(resp => {
      this.AllCatalog = resp.data;
    });
  }

  public exit() {
    this.router.navigate(['']);
  }
  public inicializar() {
    this.formSbnConfig.reset();
    this.config = [];
    this.idConfig = 0;
    this.operacion = 'guardar';
    this.getConfig();
  }

  onlyGuionNumber(event: any) {
    return this.sigesp.onlyGuionesAndNine(event);
  }

  public getConfig() {
    this.configSBNService.getConfigSbn().subscribe(resp => {
      this.config = resp.data;
      if (this.config.length > 0) {
        this.mostarConfig();
        this.operacion = 'actualizar';
      } else {
        this.operacion = 'guardar';
        this.sigesp.showToastSuccess('No existe configuración registrada');
      }
    });
  }

  public mostarConfig() {
    this.formSbnConfig
      .get('formatoCuentaGeneral')
      .setValue(this.config[0].formatoCuentaGeneral);
    this.formSbnConfig
      .get('formatoCuentaInstitucional')
      .setValue(this.config[0].formatoCuentaInstitucionalActivo);
    this.formSbnConfig
      .get('normativa')
      .setValue(this.config[0].normartiaActivoFijo);
    this.formSbnConfig
      .get('afectacion')
      .setValue(this.config[0].afectacionDepreciacion);
    let incorporacionAuto = this.config[0].fechaIncorporacionAutomatica;
    if (incorporacionAuto == 1) {
      this.formSbnConfig.get('incorporacionAuto').setValue(true);
    } else if (incorporacionAuto == 0) {
      this.formSbnConfig.get('incorporacionAuto').setValue(false);
    }
    let generarAsiento = this.config[0].generarAsientoContable;
    if (generarAsiento == 1) {
      this.formSbnConfig.get('generarAsiento').setValue(true);
    } else if (generarAsiento == 0) {
      this.formSbnConfig.get('generarAsiento').setValue(false);
    }
    let mostrarSeperadores = this.config[0].estatusSeparadorMascara;
    if (mostrarSeperadores == 1) {
      this.formSbnConfig.get('mostrarSeperadores').setValue(true);
    } else if (mostrarSeperadores == 0) {
      this.formSbnConfig.get('mostrarSeperadores').setValue(false);
    }
    this.idConfig = this.config[0].idSbn;
    this.longFormatoGeneral = this.config[0].longMaxCaracterCuentaGeneral;
    this.longFormatoInstitu =
      this.config[0].longMaxCaracterCuentaInstitucionalActivo;
  }

  public newConfig() {
    if (this.operacion == 'guardar') {
      this.saveScbConfig();
    } else if (this.operacion == 'actualizar') {
      this.updateScbConfig();
    }
  }

  public saveScbConfig() {
    this.getAccountFormat();
    this.configSBNService
      .saveConfigSbn(
        this.formSbnConfig,
        this.longFormatoGeneral,
        this.longFormatoInstitu
      )
      .subscribe((resp: any) => {
        if (resp.data.length > 0) {
          this.sigesp.showToastSuccess(
            'Configuración de Bienes Nacionales guarda con éxito'
          );
          this.inicializar();
        } else this.sigesp.showToastError(resp.message);
      });
  }

  public updateScbConfig() {
    this.getAccountFormat();
    this.configSBNService
      .updateConfigSbn(
        this.formSbnConfig,
        this.idConfig,
        this.longFormatoGeneral,
        this.longFormatoInstitu
      )
      .subscribe((resp: any) => {
        if (resp.data) {
          this.sigesp.showToastSuccess(
            'Configuración de Bienes Nacionales actualizada con éxito'
          );
          this.inicializar();
        } else this.sigesp.showToastError(resp.message);
      });
  }

  public getAccountFormat() {
    let formatoGeneral = this.formSbnConfig
      .get('formatoCuentaGeneral')
      .value.trim();
    let formatoInstitucional = this.formSbnConfig
      .get('formatoCuentaInstitucional')
      .value.trim();
    if (this.formSbnConfig.get('mostrarSeperadores').value == 1) {
      this.longFormatoGeneral = formatoGeneral.length;
      this.longFormatoInstitu = formatoInstitucional.length;
    } else if (this.formSbnConfig.get('mostrarSeperadores').value == 0) {
      let formatoSinGuionGeneral = formatoGeneral.replace(/-/gi, '');
      let formatoSinGuionInst = formatoInstitucional.replace(/-/gi, '');
      this.longFormatoGeneral = formatoSinGuionGeneral.length;
      this.longFormatoInstitu = formatoSinGuionInst.length;
    }
  }
}
