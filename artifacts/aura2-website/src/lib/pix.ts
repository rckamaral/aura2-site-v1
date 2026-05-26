function crc16(str: string): string {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function field(id: string, value: string): string {
  return `${id}${String(value.length).padStart(2, "0")}${value}`;
}

export function generatePixPayload(
  key: string,
  name: string,
  city: string,
  amount?: number
): string {
  const pixKey = field("01", key);
  const merchantAccount = field("26", field("0014", "br.gov.bcb.pix") + pixKey);

  const safeName = name.slice(0, 25).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const safeCity = city.slice(0, 15).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  let payload =
    "000201" +
    "010212" +
    merchantAccount +
    "52040000" +
    "5303986" +
    (amount != null ? field("54", amount.toFixed(2)) : "") +
    "5802BR" +
    field("59", safeName) +
    field("60", safeCity) +
    field("62", field("05", "***")) +
    "6304";

  return payload + crc16(payload);
}
