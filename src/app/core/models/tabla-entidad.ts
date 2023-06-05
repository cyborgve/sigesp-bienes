export interface TablaEntidad<T> {
  irAtras(): void;
  irAlInicio(): void;
  filtrar(event: Event): void;
  nuevo(): void;
  editar(entidad: T): void;
  eliminar(entidad: T): void;
}
