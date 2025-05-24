
export function toFarsiNumber(number) {
    return number?.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}

export function toEnglishNumber(number) {
    return number?.toString().replace(/[۰-۹]/g, d => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]);
}


export function formatWithThousandSeparators(number) {
  return number?.replace(/[^\d]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
