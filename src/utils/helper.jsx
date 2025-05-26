import { errorMessage } from "../Components/Modules/Toast/ToastCustom";
export function toFarsiNumber(number) {
  return number?.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

export function toEnglishNumber(number) {
  return number
    ?.toString()
    .replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
}

export function formatWithThousandSeparators(number) {
  return number?.replace(/[^\d]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

export function isValidFileSize(file) {
  if (!file) return false;

  if (file.size > MAX_FILE_SIZE) {
    errorMessage(`حجم فایل نباید بیشتر از ${MAX_FILE_SIZE_MB} مگابایت باشد.`);
    return false;
  }

  return true;
}
