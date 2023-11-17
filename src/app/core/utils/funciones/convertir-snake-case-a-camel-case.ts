export const convertirSnakeCaseACamelCase = (snake_case: string) =>
  snake_case
    .split('_')
    .map((palabra, indice) =>
      indice === 0
        ? palabra.toLowerCase()
        : `${palabra.charAt(0).toUpperCase()}${palabra.slice(1).toLowerCase()}`
    )
    .join('');
