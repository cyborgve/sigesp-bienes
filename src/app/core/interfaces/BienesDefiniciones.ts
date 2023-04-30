export interface IConfigSBN{
    id_empresa:string,
    id_sbn:string, 
    estgenasiconsbn:string, 
    fecincaut:string, 
    afedep:string, 
    noract:string, 
    estsepmascodact:string, 
    lonmaxcatctagral:string, 
    lonmaxcodinsact:string, 
    formcatctagral:string, 
    formcodinsact:string 
}

export interface ICondicionCompra{
    id_empresa: string,
    id_concompra: string,   
    codconcom: string, 
    denconcom:string
    explicacion:string,    
}

export interface ICausaMovimiento {
    id_causa:string, 
    codcaumov:string, 
    dencaumov:string, 
    tipcaumov:string, 
    estafecon:string, 
    estafepre:string
}

export interface IEstructurPredominante {
    id_empresa:string, 
    id_tipest:string, 
    codtipest: string, 
    dentipest:string
}

export interface IComponentesEstructura{
    id_empresa:string, 
    id_tipest:string, 
    id_comest:string, 
    codcomest:string, 
    dencomest:string
}

export interface ICatalogoGeneral{
    id_empresa:string, 
    catcta:string, 
    dencat:string, 
    ctaref:string, 
    estmov:string
}

export interface IMarcas{
    id_marca:string, 
    codmarca:string, 
    denmarca:string,
    id_tipomarca:string,
}
export interface IModelo{
    id_marca:string, 
    id_modelo:string, 
    codmodelo:string, 
    denmodelo:string
}


export interface IUnidadAdministrativa{
    id_empresa:string, 
    id_uniadmbien:string, 
    coduniadmbien:string, 
    denuniadmbien:string, 
    id_catuniadmin:string, 
    denominacion:string, 
    id_uniadm:string
}

export interface IFormaAdquisicion{
    id_empresa:string, 
    id_adquisicion:string, 
    codforadq:string,
    denforadq:string
}


export interface ISede{
    id_empresa:string, 
    id_sede:string, 
    id_tipsede:string, 
    codsede:string, 
    densede:string,     
    localizacion:string, 
    codpai:string, 
    codest:string, 
    codmun:string, 
    codpar:string, 
    codciu:string, 
    urbanizacion:string, 
    calleav:string, 
    casaedif:string, 
    piso:string
}


export interface IOrigen{
    id_origen:string, 
    codori:string, 
    fecori:string, 
    fecadq:string,
    modadq:string, 
    fecforadq:string, 
    numforadq:string, 
    nomformadq:string, 
    fecfac:string, 
    numfac:string, 
    id_proveedor:string, 
    tomo:string, 
    folio:string, 
    nompropant:string, 
    nombenced:string, 
    nombenrec:string, 
    observacion:string,
    formadqui:string, 
    rifpro:string,
    nompro:string
}

export interface ISeguros{
    id_seguro:string, 
    codseg:string, 
    denseg:string, 
    id_aseguradora:string, 
    id_tipopoliza:string, 
    id_tipcob:string, 
    poliza:string, 
    monaseg:string, 
    fecinipol:string, 
    fecfinpol:string, 
    codmon:string, 
    monsec:string, 
    estrescivil:string, 
    descob:string, 
    cobadi:string,
	
}






