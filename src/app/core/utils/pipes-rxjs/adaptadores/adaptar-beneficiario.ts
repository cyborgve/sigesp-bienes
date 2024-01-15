import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Beneficiario } from '@core/models/otros-modulos/beneficiario';

export const adaptarBeneficiario = () => pipe(map(adaptar));
export const adaptarBeneficiarios = () =>
  pipe(map((beneficiarios: any[]) => beneficiarios.map(adaptar)));

const adaptar = (beneficiario: any) =>
  <Beneficiario>{
    empresaId: Number(beneficiario.empresaId),
    id: Number(beneficiario.id),
    cedula: beneficiario.cedula,
    rif: beneficiario.rif,
    nombre: beneficiario.nombre,
    creado: beneficiario.creado,
    modificado: beneficiario.modificado,
  };
