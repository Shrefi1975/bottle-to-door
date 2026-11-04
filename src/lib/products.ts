export type Opt = { label: string; price: number };

// Only explicitly priced packs are orderable; unlisted existing packs stay unchanged.
export const BRANDS: Record<string, Opt[]> = {
  البيان: [{ label: "330 مل — 40 حبة", price: 11 }],
  بيرين: [{ label: "330 مل — 40 حبة", price: 12 }],
  صفا: [
    { label: "200 مل — 48 حبة", price: 20 },
    { label: "330 مل — 40 حبة", price: 19 },
    { label: "1.5 لتر", price: 15 },
    { label: "جالون 5 لتر", price: 15 },
  ],
  العيون: [{ label: "330 مل — 40 حبة", price: 10 }],
  نوفا: [{ label: "330 مل — 40 حبة", price: 14 }, { label: "200 مل — 48 حبة", price: 13 }],
  موارد: [{ label: "330 مل — 40 حبة", price: 11 }],
  أكويا: [{ label: "200 مل — 48 حبة", price: 14 }, { label: "330 مل — 40 حبة", price: 15 }],
  "نقا آسيا": [{ label: "330 مل — 40 حبة", price: 10 }],
  زلال: [{ label: "330 مل — 40 حبة", price: 10 }],
  إيفا: [{ label: "330 مل — 40 حبة", price: 11 }],
  طويق: [{ label: "330 مل — 40 حبة", price: 10 }, { label: "330 مل شرنك — 24 حبة", price: 5 }],
  أصايل: [{ label: "200 مل — 48 حبة", price: 11 }, { label: "330 مل — 40 حبة", price: 10 }, { label: "330 مل شرنك", price: 5 }],
  ميراد: [
    { label: "200 مل — 48 حبة", price: 11 },
    { label: "330 مل — 40 حبة", price: 10 },
    { label: "330 مل شرنك", price: 6 },
    { label: "600 مل", price: 12 },
    { label: "5 لتر", price: 10 },
  ],
  رفا: [{ label: "250 مل — 40 حبة", price: 12 }, { label: "330 مل — 40 حبة", price: 12 }],
  العين: [{ label: "330 مل — 40 حبة", price: 12 }],
};