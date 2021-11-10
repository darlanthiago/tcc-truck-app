export function formatAddress(
  address: string | null,
  city: string | null,
  state: string | null
) {
  return `${address ? address + "," : ""}${city ? city + "-" : ""}${
    state ? state : ""
  }`;
}
