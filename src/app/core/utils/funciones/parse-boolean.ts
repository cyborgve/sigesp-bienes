/**
 * @description transforma un valor numerico recibido de la base de datos que podria ser 1 ó 0,
 * retornando true o false respectivamente.
 * @param numero number
 * @returns boolean
 */
export function parseBoolean(numero: string): boolean {
  return numero === '1';
}
