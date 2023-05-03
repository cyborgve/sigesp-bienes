import { Id } from '@core/types/id';
import { Observable } from 'rxjs';

export interface ModeloServicio<T> {
  buscarTodos(): Observable<T[]>;
  buscarPorId(id: Id): Observable<T>;
  guardar(entity: T): Observable<T>;
  actualizar(id: Id, entity: T): Observable<T>;
  eliminar(id: Id): Observable<T>;
  existe(id: Id): Observable<boolean>;
}
