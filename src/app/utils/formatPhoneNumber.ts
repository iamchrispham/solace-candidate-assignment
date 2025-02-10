export default function formatPhoneNumber(phone: string | number) {
  const cleaned = String(phone).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (!match) return phone;
  return `(${match[1]}) ${match[2]}-${match[3]}`;
}
