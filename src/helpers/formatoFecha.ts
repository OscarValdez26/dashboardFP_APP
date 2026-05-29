export const fechaCorta = (fecha: string) => {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(fecha));
};

export const fechaSinDia = (fecha: string) => {
  const fechaTexto = new Intl.DateTimeFormat("es-MX", {
    month: "long",
    year: "numeric",
  }).format(new Date(fecha));
  return `${fechaTexto.charAt(0).toUpperCase()}${fechaTexto.slice(1)}`;
};

export const fechaHora = (fecha: string) => {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(fecha));
};

export const fechaHoraCorta = (fecha: string) => {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(fecha));
};
