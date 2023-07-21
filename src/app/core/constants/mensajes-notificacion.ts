import { MensajeNotificacion } from '@core/models/auxiliares/mensaje-notificacion';
import { CORRELATIVOS } from './correlativos';
import { tipoOracion } from '@core/utils/funciones/tipo-oracion';

const estadoGuardar = [
  '", fue guardado parcialmente',
  '", fue guardado correctamente',
];

const estadoActualizar = [
  '", fue actualizado parcialmente',
  '", fue actualizado correctamente',
];
const estadoEliminar = [
  '", fue eliminado parcialmente',
  '", fue eliminado correctamente',
];

export const MENSAJES_NOTIFICACION: MensajeNotificacion[] = [
  {
    id: 0,
    mensajes: [
      {
        tipo: 'GUARDAR',
        texto: `El ${tipoOracion(CORRELATIVOS[0]['nombre'])} "`,
        completo: estadoGuardar[1],
        parcial: estadoGuardar[0],
      },
      {
        tipo: 'ACTUALIZAR',
        texto: `El ${tipoOracion(CORRELATIVOS[0]['nombre'])} "`,
        completo: estadoActualizar[1],
        parcial: estadoActualizar[0],
      },
      {
        tipo: 'ELIMINAR',
        texto: `El ${tipoOracion(CORRELATIVOS[0]['nombre'])} "`,
        completo: estadoEliminar[1],
        parcial: estadoEliminar[0],
      },
    ],
  },
];
