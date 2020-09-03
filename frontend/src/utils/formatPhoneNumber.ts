export default function formatPhoneNumber(phone = ''): string {
  return phone
    .replace(/(\d{4})(\d{1,5})/, '$1-$2')
    .replace(/(-\d{5})\d+?$/, '$1');
}
