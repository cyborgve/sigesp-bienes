import { MatTableDataSource } from '@angular/material/table';

export abstract class AbstractTablaFunciones<T> {
  dataSource: MatTableDataSource<T> = new MatTableDataSource();
  abstract irAtras();
  abstract irAlInicio();
  abstract filtrar(event: Event);
  abstract nuevo();
  abstract editar(entidad: T);
  abstract eliminar(entidad: T);
}
