import {IEstructurPredominante, IComponentesEstructura } from '@core/interfaces/BienesDefiniciones';

export class MEstructuraPredominante {
    public idEmpresa:number= null; 
    public idTipoEstructura:number=null;
    public codigoTipoEstructura: string=null; 
    public denominacionTipoEstructura:string= null

    constructor(ep: IEstructurPredominante){
        this.idEmpresa=parseInt(ep.id_empresa);
        this.idTipoEstructura=parseInt(ep.id_tipest);
        this.codigoTipoEstructura=ep.codtipest;
        this.denominacionTipoEstructura=ep.dentipest;       
    }

}

export class MComponenteEstructura {
    public idEmpresa:number= null; 
    public idTipoEstructura:number=null;
    public idComponenteEstructura:number=null;
    public codigoComponenteEstructura: string=null; 
    public denominacionComponenteEstructura:string= null

    constructor(ce: IComponentesEstructura){
        this.idEmpresa=parseInt(ce.id_empresa);
        this.idTipoEstructura=parseInt(ce.id_tipest);
        this.idComponenteEstructura=parseInt(ce.id_comest);
        this.codigoComponenteEstructura=ce.codcomest;
        this.denominacionComponenteEstructura=ce.dencomest;       
    }

}


