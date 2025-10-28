// Auto-generated mock data for Arboretum testing
// Structure: each row is { statements: {code,title}, defects: {...}, wages: {...}, parts: {...} }

const statements = [
  { code: "ST001", title: "مشکل سیستم ترمز" },
  { code: "ST002", title: "خرابی سیستم روشنایی" },
  { code: "ST003", title: "مشکل سیستم تهویه" },
  { code: "ST004", title: "خرابی موتور" },
  { code: "ST005", title: "مشکل سیستم تعلیق" },
  { code: "ST006", title: "خرابی گیربکس" },
  { code: "ST007", title: "مشکل سیستم سوخت" },
  { code: "ST008", title: "خرابی سیستم برق" },
];

const defectsByStatement = {
  ST001: [
    { code: "DF001", title: "نشت روغن ترمز" },
    { code: "DF002", title: "خرابی پدال ترمز" },
    { code: "DF003", title: "مشکل ABS" },
  ],
  ST002: [
    { code: "DF004", title: "خرابی چراغ جلو" },
    { code: "DF005", title: "مشکل چراغ عقب" },
    { code: "DF006", title: "خرابی چراغ راهنما" },
  ],
  ST003: [
    { code: "DF007", title: "خرابی کمپرسور" },
    { code: "DF008", title: "مشکل فیلتر هوا" },
    { code: "DF009", title: "خرابی فن" },
  ],
  ST004: [
    { code: "DF010", title: "مشکل شمع" },
    { code: "DF011", title: "خرابی فیلتر هوا" },
    { code: "DF012", title: "مشکل تایمینگ" },
  ],
  ST005: [
    { code: "DF013", title: "خرابی کمک فنر" },
    { code: "DF014", title: "مشکل فنر" },
    { code: "DF015", title: "خرابی بوش" },
  ],
  ST006: [
    { code: "DF016", title: "مشکل کلاچ" },
    { code: "DF017", title: "خرابی دنده" },
    { code: "DF018", title: "مشکل سنکرونایزر" },
  ],
  ST007: [
    { code: "DF019", title: "خرابی پمپ بنزین" },
    { code: "DF020", title: "مشکل فیلتر سوخت" },
    { code: "DF021", title: "خرابی انژکتور" },
  ],
  ST008: [
    { code: "DF022", title: "مشکل باتری" },
    { code: "DF023", title: "خرابی آلترناتور" },
    { code: "DF024", title: "مشکل فیوز" },
  ],
};

const pricesByDefect = {
  DF001: [
    { code: "PR001", price: 450000 },
    { code: "PR002", price: 320000 },
    { code: "PR003", price: 280000 },
  ],
  DF002: [
    { code: "PR004", price: 180000 },
    { code: "PR005", price: 220000 },
  ],
  DF003: [
    { code: "PR006", price: 850000 },
    { code: "PR007", price: 1200000 },
  ],
  DF004: [
    { code: "PR008", price: 150000 },
    { code: "PR009", price: 200000 },
  ],
  DF005: [
    { code: "PR010", price: 120000 },
    { code: "PR011", price: 180000 },
  ],
  DF006: [
    { code: "PR012", price: 80000 },
    { code: "PR013", price: 100000 },
  ],
  DF007: [
    { code: "PR014", price: 2500000 },
    { code: "PR015", price: 1800000 },
  ],
  DF008: [
    { code: "PR016", price: 120000 },
    { code: "PR017", price: 150000 },
  ],
  DF009: [
    { code: "PR018", price: 300000 },
    { code: "PR019", price: 250000 },
  ],
  DF010: [
    { code: "PR020", price: 80000 },
    { code: "PR021", price: 120000 },
  ],
  DF011: [
    { code: "PR022", price: 150000 },
    { code: "PR023", price: 200000 },
  ],
  DF012: [
    { code: "PR024", price: 400000 },
    { code: "PR025", price: 600000 },
  ],
  DF013: [
    { code: "PR026", price: 800000 },
    { code: "PR027", price: 1200000 },
  ],
  DF014: [
    { code: "PR028", price: 300000 },
    { code: "PR029", price: 450000 },
  ],
  DF015: [
    { code: "PR030", price: 200000 },
    { code: "PR031", price: 250000 },
  ],
  DF016: [
    { code: "PR032", price: 1500000 },
    { code: "PR033", price: 2000000 },
  ],
  DF017: [
    { code: "PR034", price: 800000 },
    { code: "PR035", price: 1200000 },
  ],
  DF018: [
    { code: "PR036", price: 600000 },
    { code: "PR037", price: 900000 },
  ],
  DF019: [
    { code: "PR038", price: 400000 },
    { code: "PR039", price: 600000 },
  ],
  DF020: [
    { code: "PR040", price: 100000 },
    { code: "PR041", price: 150000 },
  ],
  DF021: [
    { code: "PR042", price: 300000 },
    { code: "PR043", price: 500000 },
  ],
  DF022: [
    { code: "PR044", price: 2000000 },
    { code: "PR045", price: 3000000 },
  ],
  DF023: [
    { code: "PR046", price: 800000 },
    { code: "PR047", price: 1200000 },
  ],
  DF024: [
    { code: "PR048", price: 50000 },
    { code: "PR049", price: 80000 },
  ],
};

const partsByPrice = {
  PR001: [
    { code: "PT001", title: "سیلندر ترمز اصلی" },
    { code: "PT002", title: "لوله ترمز فلزی" },
  ],
  PR002: [
    { code: "PT003", title: "واشر ترمز" },
    { code: "PT004", title: "پیچ سیلندر" },
  ],
  PR003: [
    { code: "PT005", title: "کیت تعمیر ترمز" },
    { code: "PT006", title: "روغن ترمز DOT4" },
  ],
  PR004: [
    { code: "PT007", title: "پدال ترمز" },
    { code: "PT008", title: "سیم پدال" },
  ],
  PR005: [
    { code: "PT009", title: "کیت پدال" },
    { code: "PT010", title: "فنر پدال" },
  ],
  PR006: [
    { code: "PT011", title: "سنسور ABS" },
    { code: "PT012", title: "واحد کنترل ABS" },
  ],
  PR007: [
    { code: "PT013", title: "کیت ABS کامل" },
    { code: "PT014", title: "سیم سنسور ABS" },
  ],
  PR008: [
    { code: "PT015", title: "چراغ جلو LED" },
    { code: "PT016", title: "پوسته چراغ" },
  ],
  PR009: [
    { code: "PT017", title: "کیت چراغ جلو" },
    { code: "PT018", title: "لنز چراغ" },
  ],
  PR010: [
    { code: "PT019", title: "چراغ عقب" },
    { code: "PT020", title: "پوسته چراغ عقب" },
  ],
  PR011: [
    { code: "PT021", title: "کیت چراغ عقب" },
    { code: "PT022", title: "لامپ چراغ عقب" },
  ],
  PR012: [
    { code: "PT023", title: "چراغ راهنما" },
    { code: "PT024", title: "پوسته راهنما" },
  ],
  PR013: [
    { code: "PT025", title: "کیت راهنما" },
    { code: "PT026", title: "لامپ راهنما" },
  ],
  PR014: [
    { code: "PT027", title: "کمپرسور کولر" },
    { code: "PT028", title: "کلاچ کمپرسور" },
  ],
  PR015: [
    { code: "PT029", title: "کیت کمپرسور" },
    { code: "PT030", title: "روغن کمپرسور" },
  ],
  PR016: [
    { code: "PT031", title: "فیلتر هوای کابین" },
    { code: "PT032", title: "فیلتر هوای موتور" },
  ],
  PR017: [
    { code: "PT033", title: "کیت فیلتر هوا" },
    { code: "PT034", title: "جعبه فیلتر" },
  ],
  PR018: [
    { code: "PT035", title: "فن کولر" },
    { code: "PT036", title: "موتور فن" },
  ],
  PR019: [
    { code: "PT037", title: "کیت فن کولر" },
    { code: "PT038", title: "پروانه فن" },
  ],
  PR020: [
    { code: "PT039", title: "شمع احتراق" },
    { code: "PT040", title: "سیم شمع" },
  ],
  PR021: [
    { code: "PT041", title: "کیت شمع" },
    { code: "PT042", title: "درپوش شمع" },
  ],
  PR022: [
    { code: "PT043", title: "فیلتر هوای موتور" },
    { code: "PT044", title: "جعبه فیلتر موتور" },
  ],
  PR023: [
    { code: "PT045", title: "کیت فیلتر موتور" },
    { code: "PT046", title: "درپوش فیلتر" },
  ],
  PR024: [
    { code: "PT047", title: "تسمه تایمینگ" },
    { code: "PT048", title: "رولر تایمینگ" },
  ],
  PR025: [
    { code: "PT049", title: "کیت تایمینگ" },
    { code: "PT050", title: "پولی تایمینگ" },
  ],
  PR026: [
    { code: "PT051", title: "کمک فنر جلو" },
    { code: "PT052", title: "کمک فنر عقب" },
  ],
  PR027: [
    { code: "PT053", title: "کیت کمک فنر" },
    { code: "PT054", title: "بوش کمک فنر" },
  ],
  PR028: [
    { code: "PT055", title: "فنر تعلیق" },
    { code: "PT056", title: "بوش فنر" },
  ],
  PR029: [
    { code: "PT057", title: "کیت فنر" },
    { code: "PT058", title: "صفحه فنر" },
  ],
  PR030: [
    { code: "PT059", title: "بوش تعلیق" },
    { code: "PT060", title: "پیچ بوش" },
  ],
  PR031: [
    { code: "PT061", title: "کیت بوش" },
    { code: "PT062", title: "واشر بوش" },
  ],
  PR032: [
    { code: "PT063", title: "کلاچ کامل" },
    { code: "PT064", title: "دیسک کلاچ" },
  ],
  PR033: [
    { code: "PT065", title: "کیت کلاچ" },
    { code: "PT066", title: "بلبرینگ کلاچ" },
  ],
  PR034: [
    { code: "PT067", title: "دنده گیربکس" },
    { code: "PT068", title: "سنکرونایزر" },
  ],
  PR035: [
    { code: "PT069", title: "کیت دنده" },
    { code: "PT070", title: "یاتاقان دنده" },
  ],
  PR036: [
    { code: "PT071", title: "سنکرونایزر گیربکس" },
    { code: "PT072", title: "رینگ سنکرونایزر" },
  ],
  PR037: [
    { code: "PT073", title: "کیت سنکرونایزر" },
    { code: "PT074", title: "سیم سنکرونایزر" },
  ],
  PR038: [
    { code: "PT075", title: "پمپ بنزین" },
    { code: "PT076", title: "فیلتر پمپ" },
  ],
  PR039: [
    { code: "PT077", title: "کیت پمپ بنزین" },
    { code: "PT078", title: "سیم پمپ" },
  ],
  PR040: [
    { code: "PT079", title: "فیلتر سوخت" },
    { code: "PT080", title: "جعبه فیلتر سوخت" },
  ],
  PR041: [
    { code: "PT081", title: "کیت فیلتر سوخت" },
    { code: "PT082", title: "درپوش فیلتر سوخت" },
  ],
  PR042: [
    { code: "PT083", title: "انژکتور سوخت" },
    { code: "PT084", title: "سیم انژکتور" },
  ],
  PR043: [
    { code: "PT085", title: "کیت انژکتور" },
    { code: "PT086", title: "اورینگ انژکتور" },
  ],
  PR044: [
    { code: "PT087", title: "باتری 12V" },
    { code: "PT088", title: "کابل باتری" },
  ],
  PR045: [
    { code: "PT089", title: "کیت باتری" },
    { code: "PT090", title: "درپوش باتری" },
  ],
  PR046: [
    { code: "PT091", title: "آلترناتور" },
    { code: "PT092", title: "رگولاتور آلترناتور" },
  ],
  PR047: [
    { code: "PT093", title: "کیت آلترناتور" },
    { code: "PT094", title: "تسمه آلترناتور" },
  ],
  PR048: [
    { code: "PT095", title: "فیوز 10A" },
    { code: "PT096", title: "فیوز 15A" },
  ],
  PR049: [
    { code: "PT097", title: "کیت فیوز" },
    { code: "PT098", title: "جعبه فیوز" },
  ],
};

const rows = [];

// build combinations: for each statement -> each defect -> each price -> each part create a row
for (const s of statements) {
  const defects = defectsByStatement[s.code] || [];
  for (const d of defects) {
    const prices = pricesByDefect[d.code] || [];
    for (const pr of prices) {
      const parts = partsByPrice[pr.code] || [];
      for (const p of parts) {
        rows.push({ statements: s, defects: d, wages: pr, parts: p });
      }
    }
  }
}

export default rows;
