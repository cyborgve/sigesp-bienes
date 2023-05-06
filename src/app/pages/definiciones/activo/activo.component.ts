import { MUnidadAdministrativa } from '@core/models/MUnidadAdministrativa';
import { UnidadAdministrativaService } from '@core/services/unidad-administrativa.service';
import { SegurosService } from '@core/services/seguros.service';
import { MOrigen } from '@core/models/MOrigen';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SigespService,
  MMoneda,
  MCuentaInstitucional,
  MCuentaPresupuesto,
  MCentroCosto,
  MFuenteFinanciamiento,
} from 'sigesp';
import { ConfiguracionBienesService } from '@core/services/configuracion-bienes.service';
import { MActivo } from '@core/models/MActivo';
import { DefinicionesBasicasService } from '@core/services/definiciones-basicas.service';
import { TipoActivo } from '@core/models/MActivo';
import { ISelect } from '@core/interfaces/BienesDefinicionesBasicas';
import { MDefinicionesBasicas } from '@core/models/MDefinicionesBasicas';
import { MModelo } from '@core/models/MMarcaModelo';
import { MMarcas } from '@core/models/MMarcaModelo';
import { MarcaModeloService } from '@core/services/marca-modelo.service';
import { CatalogoGeneralService } from '@core/services/catalogo-general.service';
import { SedesService } from '@core/services/sedes.service';
import { MCatalogoGeneral } from '@core/models/MCatalogoGeneral';
import { MSede } from '@core/models/MSede';
import { ActivosService } from '@core/services/activos.service';
import { OrigenService } from '@core/services/origen.service';
import { MSeguros } from '@core/models/MSeguros';
//import { MConfigSBN } from "@core/models/MconfigSBN";

@Component({
  selector: 'app-activo',
  templateUrl: './activo.component.html',
  styleUrls: ['./activo.component.scss'],
})
export class ActivoComponent implements OnInit {
  public idActivo: number;
  public operacion: string = 'guardar';
  public allActive: MActivo[] = [];
  public codeExists: boolean;
  public configSBN: any;
  public activeMask: string;
  public lengthMask: number;
  public tipyActive: ISelect[] = TipoActivo;
  public buyCondition: MDefinicionesBasicas[] = [];
  public stateConservation: MDefinicionesBasicas[] = [];
  public acquisitionForm: MDefinicionesBasicas[] = [];
  public stateUse: MDefinicionesBasicas[] = [];
  public typeSemoviente: MDefinicionesBasicas[] = [];
  public purposeSemoviente: MDefinicionesBasicas[] = [];
  public goodColor: MDefinicionesBasicas[] = [];
  public goodCategory: MDefinicionesBasicas[] = [];
  public goodClass: MDefinicionesBasicas[] = [];
  public typeAnimal: MDefinicionesBasicas[] = [];
  public warranty: MDefinicionesBasicas[] = [];
  public weightUnit: MDefinicionesBasicas[] = [];
  public terrainUnit: MDefinicionesBasicas[] = [];
  public constructionUnit: MDefinicionesBasicas[] = [];
  public catalogoGeneral: MCatalogoGeneral[] = [];
  public typeComponent: MCatalogoGeneral[] = [];
  public sedes: MSede[] = [];
  public brand: MMarcas[] = [];
  public model: MModelo[] = [];
  public money: MMoneda[] = [];
  public expression: boolean;
  public unitMeasurement: any[] = [];
  public accountAccounting: MCuentaInstitucional[] = [];
  public accountExpenses: MCuentaPresupuesto[] = [];

  public costCenter: MCentroCosto;
  public financingSource: MFuenteFinanciamiento[];
  public goodUser: MDefinicionesBasicas[] = [];
  public raceAnimal: MDefinicionesBasicas[] = [];
  public origin: MOrigen[] = [];
  public labelingMethod: MDefinicionesBasicas[] = [];
  public allInsurance: MSeguros[] = [];
  public typePolicy: MDefinicionesBasicas[] = [];
  public insuranceCompany: MDefinicionesBasicas[] = [];
  public typeCoverage: MDefinicionesBasicas[] = [];
  public administrativeUnit: MUnidadAdministrativa;

  public dataActivo: MActivo;
  public dataGeneral: MActivo[] = [];
  public dataInicilizar: boolean = false;

  constructor(
    private router: Router,
    private sigesp: SigespService,
    private configuracionBienesService: ConfiguracionBienesService,
    private catalogoGeneralService: CatalogoGeneralService,
    private definicionesBasicasService: DefinicionesBasicasService,
    private marcaModeloService: MarcaModeloService,
    private sedesService: SedesService,
    private activosService: ActivosService,
    private origenService: OrigenService,
    private segurosSevice: SegurosService,
    private unidadAdministrativaService: UnidadAdministrativaService
  ) {}

  ngOnInit() {
    this.GetCatalogoGeneral();
    this.getConfigurationSBN();
    this.getAcquisitionForm();
    this.getBuyCondition();
    this.getGoodCategory();
    this.getStateUse();
    this.getStatesConservation();
    this.getTypeSemoviente();
    this.getPurposeSemoviente();
    this.getStateUse();
    this.getTypeComponent();
    this.getMoney();
    this.getGoodClass();
    this.getWarranty();
    this.getSede();
    this.getBrand();
    this.getUnitMeasurement();
    this.getAccountAccounting();
    this.getAccountExpenses();
    this.getDataInicial();
    this.getCostCenter();
    this.getFinancingSource();
    this.getRaceAnimal();
    this.getOrigin();
    this.getLabelingMethod();
    this.getColor();
    this.getTypeAnimal();
    this.getInsurance();
    this.getTypePolicy();
    this.getInsurenceCompany();
    this.getTypeCoverage();
    this.getAdministrativeUnit();
  }

  public GetCatalogoGeneral() {
    this.catalogoGeneralService.getAllGeneralCatalog().subscribe(resp => {
      this.catalogoGeneral = resp.data;
    });
  }

  public getConfigurationSBN() {
    this.configuracionBienesService.getConfigSbn().subscribe(resp => {
      if (resp.data.length > 0) {
        this.configSBN = resp.data;
      }
    });
  }

  public getGoodCategory() {
    let tipo: string = '1';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.goodCategory = resp.data;
    });
  }

  public getGoodClass() {
    let tipo: string = '3';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.goodClass = resp.data;
    });
  }

  public getColor() {
    let tipo: string = '4';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.goodColor = resp.data;
    });
  }

  public getInsurenceCompany() {
    let tipo: string = '5';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.insuranceCompany = resp.data;
    });
  }

  public getStatesConservation() {
    let tipo: string = '6';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.stateConservation = resp.data;
    });
  }

  public getStateUse() {
    let tipo: string = '7';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.stateUse = resp.data;
    });
  }

  public getAcquisitionForm() {
    let tipo: string = '8';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.acquisitionForm = resp.data;
    });
  }

  public getLabelingMethod() {
    let tipo: string = '9';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.labelingMethod = resp.data;
    });
  }

  public getPurposeSemoviente() {
    let tipo: string = '10';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.purposeSemoviente = resp.data;
    });
  }

  public getTypeSemoviente() {
    let tipo: string = '13';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.typeSemoviente = resp.data;
    });
  }

  public getTypeCoverage() {
    let tipo: string = '14';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.typeCoverage = resp.data;
    });
  }

  public getTypeComponent() {
    let tipo: string = '15';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.typeComponent = resp.data;
    });
  }

  public getWarranty() {
    let tipo: string = '17';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.warranty = resp.data;
    });
  }

  public getBuyCondition() {
    let tipo: string = '19';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.buyCondition = resp.data;
    });
  }

  public getTypeAnimal() {
    let tipo: string = '21';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.typeAnimal = resp.data;
    });
  }

  public getTypePolicy() {
    let tipo: string = '22';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.typePolicy = resp.data;
    });
  }

  public getRaceAnimal() {
    let tipo: string = '23';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.raceAnimal = resp.data;
    });
  }

  public getBrand() {
    this.marcaModeloService.getAllBrand().subscribe(resp => {
      this.brand = resp.data;
    });
  }

  public getMoney() {
    this.sigesp.getMonedas().subscribe(resp => {
      this.money = resp;
    });
  }

  public getSede() {
    this.sedesService.getAllSeat().subscribe(resp => {
      this.sedes = resp.data;
    });
  }

  public getUnitMeasurement() {
    this.activosService.getUnitMeasurement().subscribe(resp => {
      this.unitMeasurement = resp.data;
    });
  }

  public getAccountAccounting() {
    this.sigesp.getCuentasInstitucionales().subscribe(resp => {
      this.accountAccounting = resp;
    });
  }

  public getAccountExpenses() {
    this.activosService.getAccountPlanGeneral().subscribe(resp => {
      this.accountExpenses = resp.data;
    });
  }

  public getGeneralData(dato) {
    this.dataActivo[dato.campo] = dato.valorInput;
    // console.log('activo ', this.dataActivo);
  }

  public getCostCenter() {
    this.sigesp.getCostCenters().subscribe(resp => {
      this.costCenter = resp.data;
    });
  }

  public getFinancingSource() {
    this.sigesp.getFuenteFinanciamiento().subscribe(resp => {
      this.financingSource = resp;
    });
  }

  public getOrigin() {
    this.origenService.getAllOrigin().subscribe(resp => {
      this.origin = resp.data;
    });
  }

  public getInsurance() {
    this.segurosSevice.getAllInsurance().subscribe(resp => {
      this.allInsurance = resp.data;
    });
  }

  public getAdministrativeUnit() {
    this.unidadAdministrativaService
      .buscarTodasUnidadesAdministrativas()
      .subscribe(resp => {
        //this.administrativeUnit = resp.data;
      });
  }

  public newActive() {
    if (this.idActivo == 0) {
      this.saveActive();
    } else {
      this.updateActive();
    }
  }

  public saveActive() {
    this.activosService.saveActive(this.dataActivo).subscribe((resp: any) => {
      if (resp.success) {
        if (resp.data.length > 0) {
          this.sigesp.showToastSuccess('Activo registrado con éxito');
          this.inicializar();
        } else if (resp.data.length == 0) {
          this.sigesp.showToastError(resp.message);
        }
      } else this.sigesp.showToastError(resp.message);
    });
  }

  public updateActive() {
    this.activosService.updateActive(this.dataActivo).subscribe((resp: any) => {
      if (resp.data) {
        this.sigesp.showToastSuccess('Registro actualizada con éxito');
        this.inicializar();
      } else this.sigesp.showToastError(resp.message);
    });
  }

  public deleteActive() {
    this.sigesp
      .openDialogConfirm('Eliminar ', 'Esta seguro de eliminar el registro?')
      .then(resp => {
        if (resp) {
          this.activosService
            .deleteActive(this.idActivo)
            .subscribe((resp: any) => {
              if (resp.data) {
                this.sigesp.showToastSuccess('Activo eliminada con éxito');
                this.inicializar();
              } else this.sigesp.showToastError(resp.message);
            });
        }
      });
  }

  public getAllActive() {
    this.dataInicilizar = false;
    let tittle = 'Catálogo Bienes Nacionales';
    let nameColummnas = ['Código', 'Bien/Activo'];
    let columnas = ['codigoInternoBien', 'descripcionBien'];
    this.activosService.getActive().subscribe(resp => {
      this.sigesp
        .openCatalogoGenerico(columnas, tittle, resp.data, nameColummnas)
        .then((res: MActivo) => {
          if (res != null) {
            this.idActivo = res.idActivo;
            this.dataGeneral[0] = res;
            this.dataActivo = res;
          }
        });
    });
  }

  public getDataInicial() {
    this.dataActivo = new MActivo({
      id_empresa: '0',
      id_activo: '0',
      codintbien: '0',
      desbien: 'NINGUNA',
      catcta: 'NINGUNA',
      fecregbien: '1999-01-01 ',
      tipact: 'M',
      estdeprec: 0,
      fecadqbien: '1999-01-01',
      fecingbien: '1999-01-01',
      observacion: 'NINGUNA',
      id_origen: '0',
      id_uniadmbien: '0',
      id_sede: '0',
      peso: 0,
      id_respuso: '0',
      id_estadouso: '0',
      valadqbien: 0,
      codmon: 0,
      id_conservacion: '0',
      expedobien: 'NINGUNA',
      numserbien: 'NINGUNA',
      id_marca: '0',
      id_modelo: '0',
      anofabbien: 0,
      id_color: '0',
      estposcomp: 0,
      descompbien: 'NINGUNA',
      esptecbien: 'NINGUNA',
      garantia: 0,
      id_unimedgar: '0',
      fecinigar: '1999-01-01',
      fecfingar: '1999-01-01',
      id_clase: '0',
      desotraclas: 'NINGUNA',
      sercarbien: 'NINGUNA',
      sermotbien: 'NINGUNA',
      plasigbien: 'NINGUNA',
      numtitpro: 'NINGUNA',
      capbien: '0',
      nombien: 'NINGUNA',
      id_uso: '0',
      estgps: 0,
      espsisgps: 'NINGUNA',
      id_tipsem: '0',
      genero: 'N',
      id_raza: '0',
      id_prosem: '0',
      id_unimedpeso: '0',
      numhieani: 'NINGUNA',
      espani: 'NINGUNA',
      id_tipani: '0',
      id_responsable: '0',
      fecnacani: '1999-01-01',
      ofiregnot: 'NINGUNA',
      refreg: 'NINGUNA',
      tomo: '----',
      folio: '-----',
      protocolo: 'NINGUNA',
      numreg: 'NINGUNA',
      fecreg: '1999-01-01',
      propant: 'NINGUNA',
      dependencias: '0',
      areaconst: 0,
      id_unimedconst: '0',
      area_de_terreno: '0',
      id_unimedterr: '0',
      espinm: 'NINGUNA',
      estsede: 0,
      id_sede_ubicacion: '0',
      espcolor: 'NINGUNA',
      id_rotulacion: '0',
      id_categoria: '0',
      id_tipcomp: '0',
      estaseg: 0,
      id_seguro: '0',
      metdep: 'N',
      vidautil: 0,
      valrescate: 0,
      sc_ctagasdep: 'NINGUNA',
      sc_ctadepacum: 'NINGUNA',
      codfuefin: 0,
      codcencos: '---',
      chapa: 'NINGUNA',
      sig_cuenta: 'NINGUNA',
      sc_cuenta: 'NINGUNA',
      usobieveh: 'NINGUNA',
      sig_cuentapre: 'NINGUNA',
      estprog: 'NINGUNA',
    });
  }

  public getOperacionToolbar(tipo) {
    if ((tipo = 'new')) {
      this.inicializar();
    }
  }

  public inicializar() {
    this.dataInicilizar = true;
    this.getDataInicial();
    this.idActivo = 0;
    this.dataGeneral = [];
  }
}
