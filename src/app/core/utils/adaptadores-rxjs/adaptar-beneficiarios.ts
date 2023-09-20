import { map } from 'rxjs/operators';
import { Proveedor } from '@core/models/otros-modulos/proveedor';
import { pipe } from 'rxjs';
import { Beneficiario } from '@core/models/otros-modulos/beneficiario';

export const adaptarBeneficiarios = () =>
  pipe(
    map((beneficiarios: any[]) =>
      beneficiarios.map(
        beneficiario =>
          <Beneficiario>{
            empresaId: Number(beneficiario.id_empresa),
            id: Number(beneficiario.id_proveedor),
            cedula: beneficiario.nacpro + '-' + beneficiario.cedben,
            rif: beneficiario.rifppro,
            nombre: beneficiario.nompro,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
