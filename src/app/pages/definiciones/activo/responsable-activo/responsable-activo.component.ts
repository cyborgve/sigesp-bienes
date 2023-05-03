import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MDefinicionesBasicas } from '@core/models/MDefinicionesBasicas';
import { SigespService } from 'sigesp';
import { MUnidadAdministrativa } from '@core/models/MUnidadAdministrativa';
import { MActivo } from '@core/models/MActivo';

@Component({
  selector: 'app-responsable-activo',
  templateUrl: './responsable-activo.component.html',
  styleUrls: ['./responsable-activo.component.scss'],
})
export class ResponsableActivoComponent implements OnInit {
  public formResponsable: FormGroup;
  @Input() public stateConservation: MDefinicionesBasicas[] = [];
  @Input() public administrativeUnit: MUnidadAdministrativa;
  @Input() public dataGeneral: MActivo;
  @Input() public dataInicilizar: boolean = false;

  constructor(private router: Router, private sigesp: SigespService) {
    this.formResponsable = new FormGroup({
      dependenciaResponsable: new FormControl(),
      dependenciaUbicacion: new FormControl(),
      responsableAdministrativo: new FormControl(),
      responsableUso: new FormControl(),
      responsableCuido: new FormControl(),
    });
  }

  ngOnInit() {
    this.showData();
    this.inicializar();
  }

  // ngOnChanges(){
  //   this.dataGeneral
  //   this.dataInicilizar
  //   this.showData()
  //   if (this.dataInicilizar){
  //     this.inicializar()
  //   }
  // }

  public inicializar() {
    this.formResponsable.reset();
  }

  public showData() {
    if (this.dataGeneral != undefined) {
      this.formResponsable
        .get('dependenciaResponsable')
        .setValue(this.dataGeneral.idUnidadAdministrativaBien);
      this.formResponsable
        .get('dependenciaUbicacion')
        .setValue(this.dataGeneral.idSede);
      this.formResponsable
        .get('responsableAdministrativo')
        .setValue(this.dataGeneral.id_Responsable);
      this.formResponsable
        .get('responsableUso')
        .setValue(this.dataGeneral.idResponsableUso);
      this.formResponsable
        .get('responsableCuido')
        .setValue(this.dataGeneral.id_Responsable);
    }
  }
}
