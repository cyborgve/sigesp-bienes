import { TipoMensajeNotificacion } from '@core/types/tipo-mensaje-notificacion';

export interface MensajeNotificacion {
  id: number;
  mensajes: {
    tipo: TipoMensajeNotificacion;
    texto: string;
    completo: string;
    parcial: string;
  }[];
}
