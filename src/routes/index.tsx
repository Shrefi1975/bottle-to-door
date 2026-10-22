import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Droplets, Truck, Wallet, MessageCircle, ArrowLeft, Check, Minus, Plus, Package } from "lucide-react";
import heroA from "@/assets/hero2.jpg.asset.json";
import b1 from "@/assets/brand1.jpg.asset.json";
import b2 from "@/assets/brand2.jpg.asset.json";
import b3 from "@/assets/brand3.png.asset.json";
import b4 from "@/assets/brand4.jpg.asset.json";
import b5 from "@/assets/brand5.webp.asset.json";
import b6 from "@/assets/brand6.webp.asset.json";
import b7 from "@/assets/brand7.webp.asset.json";
import b8 from "@/assets/brand8.jpg.asset.json";
const hero = heroA.url;
const IMAGES: Record<string, string> = {
  أصايل: b1.url, أكويا: b2.url, البيان: b3.url, العين: b4.url,
  ارفا: b5.url, صفا: b6.url, ميراد: b7.url, نوفا: b8.url,
};
const SHOW = Object.keys(IMAGES);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مياه البيت | توصيل مياه في جدة" },
      { name: "description", content: "اطلب مياهك المفضلة وتوصلك لباب بيتك في جدة، والدفع عند الاستلام." },
      { property: "og:title", content: "مياه البيت | توصيل مياه في جدة" },
      { property: "og:description", content: "اطلب مياهك المفضلة وتوصلك لباب بيتك في جدة." },
    ],
  }),
  component: Index,
});

const WHATSAPP = "966500000000";

type Opt = { label: string; price: number };
const BRANDS: Record<string, Opt[]> = {
  طويق: [{ label: "330 مل — 40 حبة", price: 10 }, { label: "330 مل شرنك — 24 حبة", price: 7 }],
  أصايل: [{ label: "330 مل — 40 حبة", price: 11 }, { label: "600 مل — 30 حبة", price: 12 }],
  ميراد: [{ label: "330 مل — 40 حبة", price: 10 }],
  صفا: [{ label: "330 مل — 40 حبة", price: 9 }, { label: "جالون 5 لتر", price: 5 }],
  نوفا: [{ label: "330 مل — 40 حبة", price: 14 }, { label: "200 مل — 48 حبة", price: 13 }],
  أكويا: [{ label: "330 مل — 40 حبة", price: 12 }],
  ارفا: [{ label: "330 مل — 40 حبة", price: 11 }],
  العين: [{ label: "330 مل — 40 حبة", price: 13 }],
  البيان: [{ label: "330 مل — 40 حبة", price: 10 }],
};

const ar = (n: number) => n.toLocaleString("ar-SA");
const wa = (t: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;

function Index() {
  const brands = Object.keys(BRANDS);
  const [brand, setBrand] = useState<string>("طويق");
  const [size, setSize] = useState(0);
  const [qty, setQty] = useState(1);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSlide((i) => (i + 1) % SHOW.length), 3000);
    return () => clearInterval(t);
  }, [paused]);
  const pick = (b: string) => {
    setBrand(b); setSize(0);
    const i = SHOW.indexOf(b);
    if (i >= 0) { setSlide(i); setPaused(true); } else setPaused(false);
  };
  const shown = SHOW[slide] ?? SHOW[0] ?? "";
  const list: Opt[] = BRANDS[brand] ?? [];
  const opt: Opt = list[size] ?? list[0] ?? { label: "", price: 0 };
  const total = opt.price * qty;
  const msg = useMemo(
    () => `مرحباً، أبغى أطلب:\nالماركة: ${brand}\nالحجم: ${opt.label}\nالكمية: ${qty}\nالقيمة: ${total} ر.س\nأرجو تأكيد التوفر والتوصيل.`,
    [brand, opt, qty, total],
  );

  return (
    <main className="min-h-screen bg-background font-sans text-foreground">
      <section className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-10 md:px-16">
          <div className="mb-12 flex items-center gap-3">
            <Droplets className="h-7 w-7 text-primary" />
            <span className="text-2xl font-bold text-primary">مياه البيت</span>
            <span className="border-r border-border pr-3 text-xs text-muted-foreground">مياه • توصيل • جدة</span>
          </div>
          <p className="mb-6 flex items-center gap-2 text-sm font-medium text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" /> راحتك تبدأ من هنا
          </p>
          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            لا تشيل هم المياه.
            <br />
            <span className="text-primary">نوصلها لبابك.</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            اختر طلبك وخلّ الباقي علينا.
          </p>
          <a href="#order" className="mt-8 flex max-w-xs items-center justify-between rounded-lg bg-cta-gradient px-6 py-4 font-bold text-cta-foreground shadow-lg">
            <span className="flex items-center gap-2"><MessageCircle className="h-5 w-5" /> اطلب الحين</span>
            <ArrowLeft className="h-5 w-5" />
          </a>
          <div className="mt-4 flex gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Wallet className="h-4 w-4 text-primary" /> الدفع عند الاستلام</span>
            <span className="flex items-center gap-1"><Check className="h-4 w-4 text-primary" /> بدون حساب</span>
          </div>
        </div>
        <div className="relative min-h-80">
          <img src={hero} alt="كراتين مياه عند باب منزل" width={1280} height={960} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute bottom-6 right-6 flex items-center gap-3 rounded-lg bg-card p-3 shadow-lg">
            <span className="rounded-full bg-secondary p-2"><Truck className="h-5 w-5 text-primary" /></span>
            <div><p className="text-sm font-bold">توصيل لين الباب</p><p className="text-xs text-muted-foreground">بيوت ومكاتب جدة</p></div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 md:grid-cols-3">
          {[
            [Truck, "نوصل لك", "لا مشاوير ولا شيل"],
            [Droplets, "ماركات متنوعة", "اللي يناسب بيتك ومكتبك"],
            [Wallet, "الدفع لما يوصل", "بدون أي دفع مقدم"],
          ].map(([Icon, t, d]: any) => (
            <div key={t} className="flex items-center gap-4">
              <span className="rounded-full bg-secondary p-3"><Icon className="h-6 w-6 text-primary" /></span>
              <div><h2 className="font-bold">{t}</h2><p className="text-sm text-muted-foreground">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="order" className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-sm text-primary">على كيفك</p><h2 className="text-3xl font-bold">رتّب طلبك بسرعة</h2></div>
          <span className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm text-primary"><Package className="h-4 w-4" /> الأسعار تبدأ من ٥ ر.س</span>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(SHOW.includes(brand))}>
            <div className="relative h-80 bg-secondary">
              {SHOW.map((b, i) => (
                <img key={b} src={IMAGES[b]} alt={`مياه ${b}`} loading="lazy"
                  className={`absolute inset-0 h-full w-full object-contain p-6 transition-all duration-700 ease-out ${i === slide ? "scale-100 opacity-100 animate-float" : "scale-90 opacity-0"}`} />
              ))}
              <span className="absolute right-4 top-4 rounded-full bg-card px-3 py-1 text-sm font-bold text-primary shadow">{shown}</span>
            </div>
            <div className="flex justify-center gap-2 p-4">
              {SHOW.map((b, i) => (
                <button key={b} aria-label={b} onClick={() => pick(b)}
                  className={`h-2 rounded-full transition-all duration-500 ${i === slide ? "w-8 bg-primary" : "w-2 bg-border"}`} />
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <label className="block text-sm font-bold">اختر الماركة
              <select value={brand} onChange={(e) => pick(e.target.value)} className="mt-2 w-full rounded-lg border border-input bg-card p-3 font-normal">
                {brands.map((b) => <option key={b}>{b}</option>)}
              </select>
            </label>
            <label className="block text-sm font-bold">الحجم والعبوة
              <select value={size} onChange={(e) => setSize(+e.target.value)} className="mt-2 w-full rounded-lg border border-input bg-card p-3 font-normal">
                {list.map((o, i) => <option key={o.label} value={i}>{o.label}</option>)}
              </select>
            </label>
            <div className="flex items-center justify-between">
              <div><p className="text-xs text-muted-foreground">سعر العبوة</p><p className="text-xl font-bold">{ar(opt.price)} ر.س</p></div>
              <div className="flex items-center rounded-lg border border-input bg-card">
                <button aria-label="زيادة" onClick={() => setQty(qty + 1)} className="p-3"><Plus className="h-4 w-4" /></button>
                <span className="w-10 text-center font-bold">{qty}</span>
                <button aria-label="إنقاص" onClick={() => setQty(Math.max(1, qty - 1))} className="p-3"><Minus className="h-4 w-4" /></button>
              </div>
            </div>
            <a href={wa(msg)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-cta-gradient py-4 font-bold text-cta-foreground">
              <MessageCircle className="h-5 w-5" /> أرسل الطلب {ar(total)} ر.س
            </a>
            <p className="text-xs text-muted-foreground">السعر للمنتجات فقط، ونأكد معك التوصيل والوقت على واتساب.</p>
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-14 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold">مويتك لبيتك، بدون تعب.</h2>
        <p className="mt-3 opacity-90">محتار؟ كلمنا ونساعدك تختار.</p>
        <a href={wa("مرحباً، أبغى أطلب مياه.")} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cta-gradient px-8 py-4 font-bold text-cta-foreground">
          <MessageCircle className="h-5 w-5" /> كلمنا على واتساب
        </a>
      </section>
    </main>
  );
}
