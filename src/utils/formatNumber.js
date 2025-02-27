export const formatNumber = (number) => {
  if (typeof number !== "number") {
    number = Number(number);
  }
  return number.toLocaleString("es-CO"); // Formato con separador de miles (ejemplo para Colombia)
};