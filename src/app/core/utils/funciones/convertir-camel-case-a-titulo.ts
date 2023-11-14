export const convertirCamelCaseATitulo = (camelCase: string) =>
  camelCase
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map((palabra, index) =>
      index === 0 || palabra.toLowerCase() !== 'id'
        ? palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
        : ''
    )
    .filter(Boolean)
    .map(
      palabra =>
        `${palabra.charAt(0).toUpperCase()}${palabra.slice(1).toLowerCase()}`
    )
    .join(' ');
