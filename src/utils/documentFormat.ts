export function removeEspecialCharacters(value: string) {
  return value.replace(/[^\d]+/g, "");
}

export function formatCnpj(value: string) {
  return value.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    "$1.$2.$3/$4-$5"
  );
}
