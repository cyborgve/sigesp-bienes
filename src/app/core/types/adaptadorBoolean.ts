export type AdaptadorBoolean<T, P extends keyof T> = {
  [K in keyof T]: K extends P ? boolean : T[K];
};
