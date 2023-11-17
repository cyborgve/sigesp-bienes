import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Beneficiario } from '@core/models/otros-modulos/beneficiario';

export const adaptarBeneficiario = () => pipe(map(adaptar));
export const adaptarBeneficiarios = () =>
  pipe(map((beneficiarios: any[]) => beneficiarios.map(adaptar)));

const adaptar = (beneficiario: any) =>
  <Beneficiario>{
    empresaId: Number(beneficiario.id_empresa),
    id: Number(beneficiario.id_proveedor),
    cedula: beneficiario.nacpro + '-' + beneficiario.cedben,
    rif: beneficiario.rifppro,
    nombre: beneficiario.nompro,
    creado: new Date(),
    modificado: new Date(),
  };
