export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
