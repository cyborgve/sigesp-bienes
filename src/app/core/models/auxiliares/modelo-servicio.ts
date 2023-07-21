import { Id } from '@core/types/id';
import { Observable } from 'rxjs';

export interface ModeloServicio<T> {
  buscarTodos(): Observable<T[]>;
  buscarPorId(id: Id): Observable<T>;
  guardar(entity: T, tipoDato: string): Observable<T>;
  actualizar(id: Id, entity: T, tipoDato: string): Observable<Number>;
  eliminar(id: Id, tipoDato: string): Observable<T>;
  existe(id: Id): Observable<boolean>;
}
