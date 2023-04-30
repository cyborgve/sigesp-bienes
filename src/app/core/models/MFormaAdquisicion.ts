import { IFormaAdquisicion } from '@core/interfaces/BienesDefiniciones';

export class MFormaAdquisicion {
    public idEmpresa: number= null;
    public idAdquisicion: number= null;
    public codigoFormaAdquisicion:string= null;
    public denominacionFormaAdquisicion:string= null;

    constructor(fm: IFormaAdquisicion){
        this.idEmpresa=parseInt(fm.id_empresa);
        this.idAdquisicion = parseInt(fm.id_adquisicion);
        this.codigoFormaAdquisicion= fm.codforadq;
        this.denominacionFormaAdquisicion=fm.denforadq;
    }

}