import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoDetalle } from '@core/models/definiciones/activo-detalle';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';

export const adaptarActivo = () =>
  pipe(
    map(
      (activo: any) =>
        <Activo>{
          empresaId: Number(activo.empresaId),
          id: Number(activo.id),
          codigo: activo.codigo,
          tipoActivo: activo.tipoActivo,
          fechaRegistro: activo.fechaRegistro,
          catalogoCuentas: activo.catalogoCuentas,
          serialRotulacion: activo.serialRotulacion,
          denominacion: activo.denominacion,
          observaciones: activo.observaciones,
          fechaAdquisicion: activo.fechaAdquisicion,
          valorAdquisicion: Number(activo.valorAdquisicion),
          monedaId: activo.monedaId,
          modeloId: Number(activo.modeloId),
          anioFabricacion: activo.anioFabricacion,
          serialFabrica: activo.serialFabrica,
          colorId: Number(activo.colorId),
          rotulacionId: Number(activo.rotulacionId),
          categoriaId: Number(activo.categoriaId),
          detalle: adaptarDetalle(activo.detalles),
          componentes: adaptarComponentes(activo.componentes),
          depreciacion: adaptarDepreciacion(activo.depreciacion),
          ubicacion: adaptarUbicacion(activo.ubicacion),
          creado: activo.creado,
          modificado: activo.modificado,
        }
    )
  );

function adaptarDetalle(detalle: any): ActivoDetalle {
  return <ActivoDetalle>{
    empresaId: Number(detalle.empresaId),
    id: Number(detalle.id),
    activoId: Number(detalle.activoId),
    garantia: Number(detalle.garantia),
    unidadGarantia: detalle.unidadGarantia,
    inicioGarantia: detalle.inicioGarantia,
    finGarantia: detalle.finGarantia,
    asegurado: Number(detalle.asegurado),
    claseId: Number(detalle.claseId),
    origenId: Number(detalle.origenId),
    descripcionOtraClase: detalle.descripcionOtraClase,
    fuenteFinanciamiento: detalle.fuenteFinanciamiento,
    codigoCentroCostos: detalle.codigoCentroCostos,
    especificacionesTecnicas: detalle.especificacionesTecnicas,
    oficinaRegistro: detalle.oficinaRegistro,
    referenciaRegistro: detalle.referenciaRegistro,
    tomo: detalle.tomo,
    folio: detalle.folio,
    protocolo: detalle.protocolo,
    numeroRegistro: detalle.numeroRegistro,
    fechaRegistrado: detalle.fechaRegistrado,
    propietarioAnterior: detalle.propietarioAnterior,
    dependencias: detalle.dependencias,
    areaConstruccion: Number(detalle.areaConstruccion),
    unidadAreaConstruccion: detalle.unidadAreaConstruccion,
    areaTerreno: Number(detalle.areaTerreno),
    unidadAreaTerreno: detalle.unidadAreaTerreno,
    especificacionesInmueble: detalle.especificacionesInmueble,
    perteneceASede: Number(detalle.perteneceASede),
    especificacionesColor: detalle.especificacionesColor,
    serialCarroceria: detalle.serialCarroceria,
    serialMotor: detalle.serialMotor,
    placas: detalle.placas,
    numeroTituloPropiedad: detalle.numeroTituloPropiedad,
    capacidad: detalle.capacidad,
    nombre: detalle.nombre,
    usoId: Number(detalle.usoId),
    tieneGps: Number(detalle.tieneGps),
    especificacionesGps: detalle.especificacionesGps,
    tipoSemovienteId: Number(detalle.tipoSemovienteId),
    genero: detalle.genero,
    propositoSemovienteId: Number(detalle.propositoSemovienteId),
    peso: Number(detalle.peso),
    unidadMedidaPeso: detalle.unidadMedidaPeso,
    numeroHierro: detalle.numeroHierro,
    especificacionesAnimal: detalle.especificacionesAnimal,
    fechaNacimientoAnimal: detalle.fechaNacimientoAnimal,
    razaId: Number(detalle.razaId),
    creado: detalle.creado,
    modificado: detalle.modificado,
  };
}

function adaptarComponentes(componentes: any[]): ActivoComponente[] {
  return componentes as ActivoComponente[];
}

function adaptarDepreciacion(depreciacion: any): ActivoDepreciacion {
  return <ActivoDepreciacion>{
    empresaId: Number(depreciacion.empresaId),
    id: Number(depreciacion.id),
    activoId: Number(depreciacion.activoId),
    depreciable: Number(depreciacion.depreciable),
    metodoDepreciacion: depreciacion.metodoDepreciacion,
    cuentaContableGasto: depreciacion.cuentaContableGasto,
    cuentaContableDepreciacion: depreciacion.cuentaContableDepreciacion,
    vidaUtil: Number(depreciacion.vidaUtil),
    unidadVidaUtil: depreciacion.unidadVidaUtil,
    valorRescate: Number(depreciacion.ValorRescate),
    monedaValorRescate: depreciacion.monedaValorRescate,
    creado: depreciacion.creado,
    modificado: depreciacion.modificado,
  };
}

function adaptarUbicacion(ubicacion: any): ActivoUbicacion {
  return <ActivoUbicacion>{
    empresaId: Number(ubicacion.empresaId),
    id: Number(ubicacion.id),
    activoId: Number(ubicacion.activoId),
    sedeId: Number(ubicacion.sedeId),
    unidadAdministrativaId: Number(ubicacion.unidadAdministrativaId),
    fechaIngreso: ubicacion.fechaIngreso,
    estadoUsoId: Number(ubicacion.estadoUsoId),
    estadoConservacionId: Number(ubicacion.estadoConservacionId),
    descripcionEstadoConservacion: ubicacion.descripcionEstadoConservacion,
    responsableId: ubicacion.responsableId,
    responsableUsoId: ubicacion.responsableUsoId,
    creado: ubicacion.creado,
    modificado: ubicacion.modificado,
  };
}
