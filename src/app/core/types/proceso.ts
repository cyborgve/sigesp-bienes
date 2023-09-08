import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { CambioResponsable } from '@core/models/procesos/cambio-responsable';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { Desincorporacion } from '@core/models/procesos/desincorporacion';
import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { Incorporacion } from '@core/models/procesos/incorporacion';
import { Modificacion } from '@core/models/procesos/modificacion';
import { Reasignacion } from '@core/models/procesos/reasignacion';
import { Retorno } from '@core/models/procesos/retorno';

export type Proceso =
  | ActaPrestamo
  | AutorizacionSalida
  | CambioResponsable
  | Depreciacion
  | Desincorporacion
  | EntregaUnidad
  | Incorporacion
  | Modificacion
  | Reasignacion
  | Retorno;
