import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { normalizarTipoActivo } from '@core/utils/funciones/normalizar-tipo-activo';
import { ActivoLista } from '@core/models/auxiliares/activo-lista';
import { normalizarMetodoDepreciacion } from '@core/utils/funciones/normalizar-metodo-depreciacion';

export const adaptarActivoLista = () => pipe(map(adaptar));
export const adaptarActivosLista = () =>
  pipe(map((activos: any[]) => activos.map(adaptar)));

const adaptar = (activoLista: any) =>
  <ActivoLista>{
    id: Number(activoLista.id),
    nombreEmpresa: activoLista.nombreEmpresa,
    codigo: String(activoLista.codigo).substring(5),
    tipoActivo: normalizarTipoActivo(activoLista.tipoActivo),
    fechaRegistro: activoLista.fechaRegisto,
    catalogo: activoLista.catalogo,
    serialRotulacion: activoLista.serialRotulacion,
    rotulacion: activoLista.rotulacion,
    denominacion: activoLista.denominacion,
    observaciones: activoLista.observaciones,
    fechaAdquisicion: activoLista.fechaAdquisicion,
    valorAdquisicion: Number(activoLista.valorAdquisicion),
    moneda: activoLista.moneda,
    modelo: activoLista.modelo,
    color: activoLista.color,
    categoria: activoLista.categoria,
    garantia: activoLista.garantia,
    unidadGarantia: activoLista.unidadGarantia,
    inicioGarantia: activoLista.inicioGarantia,
    finGarantia: activoLista.finGarantia,
    asegurado: activoLista.asegurado === 1 ? 'SI' : 'NO',
    clase: activoLista.clase,
    origen: activoLista.origen,
    descripcionOtraClase: activoLista.descripcionOtrClese,
    fuenteFinanciamiento: activoLista.fuenteFinanciamiento,
    centroCostos: activoLista.centroCostos,
    especificacionesTecnicas: activoLista.especificacionesTecnicas,
    tomo: activoLista.tomo,
    folio: activoLista.foio,
    protocolo: activoLista.protocolo,
    propietarioAnterior: activoLista.propietarioAnterior,
    oficinaRegistro: activoLista.oficinaRegistro,
    referenciaRegistro: activoLista.referenciaRegistro,
    numeroRegistro: activoLista.numeroRegistro,
    fechaRegistrado: activoLista.fechaRegistrado,
    dependencias: activoLista.dependencias,
    areaConstruccion: Number(activoLista.areaConstruccion),
    unidadAreaConstruccion: activoLista.unidadAreaConstruccion,
    areaTerreno: Number(activoLista.areaTerreno),
    unidadAreaTerreno: activoLista.unidadAreaTerreno,
    especificacionesInmueble: activoLista.especificacionesInmueble,
    perteneceASede: activoLista.perteneceASede === 1 ? 'SI' : 'NO',
    sedeUbicacion: activoLista.sedeUbicacion,
    especificacionesColor: activoLista.especificacionesColor,
    serialCarroceria: activoLista.serialCarroceria,
    serialMotor: activoLista.serialMotor,
    placas: activoLista.placas,
    numeroTituloPropiedad: activoLista.numeroTituloPropiedad,
    capacidad: Number(activoLista.capacidad),
    nombre: activoLista.nombre,
    tipoUso: activoLista.tipoUso,
    tieneGps: activoLista.tieneGps === 1 ? 'SI' : 'NO',
    especificacionesGps: activoLista.especificacionesGps,
    tipoSemoviente: activoLista.tipoSemoviente,
    genero:
      activoLista.genero === 'S'
        ? 'NO ASIGNADO'
        : activoLista.genero === 'M'
        ? 'MASCULINO'
        : 'FEMENINO',
    propositoSemoviente: activoLista.propositoSemoviente,
    peso: Number(activoLista.peso),
    unidadMedidaPeso: activoLista.unidadMedidaPeso,
    numeroHierro: activoLista.numeroHierro,
    especificacionesAnimal: activoLista.especificacionesAnimal,
    fechaNacimientoAnimal: activoLista.fechaNacimientoAnimal,
    raza: activoLista.raza,
    depreciable: activoLista.depreciable ? 'SI' : 'NO',
    metodoDepreciacion: normalizarMetodoDepreciacion(
      activoLista.metodoDepreciacion
    ),
    cuentaContableDebe: activoLista.cuentaContableDebe,
    cuentaContableHaber: activoLista.cuentaContableHaber,
    vidaUtil: Number(activoLista.vidaUtil),
    unidadVidaUtil: activoLista.unidadVidaUtil,
    valorRescate: Number(activoLista.valorRescate),
    monedaValorRescate: activoLista.monedaValorRescate,
    sede: activoLista.sede,
    unidadAdministrativa: activoLista.unidadAdministrativa,
    fechaIngreso: activoLista.fechaIngreso,
    estadoUso: activoLista.estadoUso,
    estadoConservacion: activoLista.estadoConservacion,
    descripcionEstadoConservacion: activoLista.descripcionEstadoCOnservacion,
    responsablePrimario: activoLista.responsablePrimario,
    responsableUso: activoLista.responsableUso,
    modificacionCuentaContableDebe: activoLista.modCuentaContableDebe,
    modificacionCuentaContableHaber: activoLista.modCuentaContableHaber,
    desincorporacionCuentaContableDebe: activoLista.desCuentaContableDebe,
    desincorporacionCuentaContableHaber: activoLista.desCuentaContableHaber,
    creado: activoLista.creado,
    modificado: activoLista.modificado,
  };
