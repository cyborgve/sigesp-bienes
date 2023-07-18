import { Activo } from '@core/models/definiciones/activo';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { ActivoDetalle } from '@core/models/definiciones/activo-detalle';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';

type Detalle = Omit<
  ActivoDetalle,
  'empresaId' | 'id' | 'creado' | 'modificado'
>;

type Depreciacion = Omit<
  ActivoDepreciacion,
  'empresaId' | 'id' | 'creado' | 'modificado'
>;

type Ubucacion = Omit<
  ActivoUbicacion,
  'empresaId' | 'id' | 'creado' | 'modificado'
>;

export interface ActivoCompleto
  extends Activo,
    Detalle,
    Depreciacion,
    Ubucacion {}
