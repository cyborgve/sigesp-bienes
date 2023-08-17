import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActivoDetalle } from '@core/models/definiciones/activo-detalle';
export const adaptarActivoDetalle = () =>
  pipe(
    map((detalle: any) =>
      detalle
        ? <ActivoDetalle>{
            empresaId: detalle.empresaId,
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
          }
        : undefined
    )
  );
