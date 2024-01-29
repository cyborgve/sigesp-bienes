import { FormGroup } from '@angular/forms';
import { Configuracion } from '@core/models/definiciones/configuracion';

export const ajustarConfiguracion = (
  formulario: FormGroup,
  configuracion: Configuracion
) => {
  formulario.value.activarPaginacion =
    configuracion.activarPaginacion === 1 ? true : false;
  formulario.value.opcionesPaginacion = configuracion.opcionesPaginacion;
  formulario.value.mostrarBotonesInicioFinal =
    configuracion.mostrarBotonesInicioFinal === 1 ? true : false;
  formulario.value.mostrarOpcionesPaginacion =
    configuracion.mostrarOpcionesPaginacion === 1 ? true : false;
  formulario.value.itemsPorPagina = configuracion.opcionesPaginacion[0];
};
