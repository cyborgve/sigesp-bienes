import { Activo } from '@core/models/definiciones/activo';
import { ActivoListaInventario } from '@core/models/auxiliares/activo-lista-inventario';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';

export const convertirActivoListaInventario = (
  activo: Activo,
  ubicacion: ActivoUbicacion
) =>
  <ActivoListaInventario>{
    codigo: activo.codigo.substring(5),
    tipo: activo.tipoActivo,
    denominacion: activo.denominacion,
    identificador: activo.serialRotulacion,
    estado: ubicacion.estadoConservacionId,
    marcaModelo: activo.modeloId,
    serial: activo.serialFabrica,
    condicion: ubicacion.estadoUsoId,
    creado: activo.creado.toLocaleDateString(),
    modificado: activo.modificado.toLocaleDateString(),
    precio: activo.valorAdquisicion.toFixed(2),
  };
