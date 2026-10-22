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
<section className="relative isolate overflow-hidden">
        <img src={hero} alt="كراتين مياه عند باب منزل" width={1280} height={960} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-between px-6 py-6 text-primary-foreground md:px-12 md:py-8">
          <div className="flex items-center gap-3">
            <Droplets className="h-7 w-7" />
            <span className="text-2xl font-bold">مياه البيت</span>
            <span className="border-r border-primary-foreground/30 pr-3 text-xs opacity-80">مياه • توصيل • جدة</span>
          </div>
          <div className="max-w-xl py-10">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cta" /> راحتك تبدأ من هنا
            </p>
            <h1 className="text-4xl font-bold leading-tight drop-shadow-lg md:text-6xl">
              لا تشيل هم المياه.
              <br />
              <span className="bg-gradient-to-l from-primary-foreground to-primary-foreground/70 bg-clip-text text-transparent">نوصلها لبابك.</span>
            </h1>
            <p className="mt-4 text-base opacity-90 md:text-lg">اختر طلبك وخلّ الباقي علينا.</p>
            <a href="#order" className="mt-6 inline-flex items-center gap-3 rounded-full bg-cta-gradient px-7 py-3.5 font-bold text-cta-foreground shadow-xl transition hover:scale-105">
              <MessageCircle className="h-5 w-5" /> اطلب الحين <ArrowLeft className="h-5 w-5" />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {[[Wallet, "الدفع عند الاستلام"], [Check, "بدون حساب"], [Truck, "توصيل لين الباب"]].map(([Icon, t]: any) => (
              <span key={t} className="flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 backdrop-blur-md">
                <Icon className="h-4 w-4" /> {t}
              </span>
            ))}
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
<div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="relative h-80 overflow-hidden bg-showcase [perspective:1200px]">
              <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
              {SHOW.map((b, i) => {
                const pos = (i - slide + SHOW.length) % SHOW.length;
                const cls = pos === 0 ? "opacity-100 blur-0 [transform:translateX(0)_scale(1)_rotateY(0deg)]"
                  : pos === 1 ? "opacity-0 blur-md [transform:translateX(-40%)_scale(0.8)_rotateY(25deg)]"
                  : "opacity-0 blur-md [transform:translateX(40%)_scale(0.8)_rotateY(-25deg)]";
                return <img key={b} src={IMAGES[b]} alt={`مياه ${b}`} loading="lazy"
                  className={`absolute inset-0 h-full w-full object-contain p-8 drop-shadow-2xl transition-all duration-1000 ease-[cubic-bezier(.22,1,.36,1)] ${cls}`} />;
              })}
              <span key={shown} className="absolute right-4 top-4 rounded-full bg-card/80 px-4 py-1.5 text-sm font-bold text-primary shadow backdrop-blur animate-in fade-in slide-in-from-top-2 duration-500">{shown}</span>
              <span className="absolute left-4 top-4 rounded-full bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">{ar(slide + 1)} / {ar(SHOW.length)}</span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-border/50">
                <div key={`${slide}-${paused}`} className={`h-full bg-primary ${paused ? "w-full" : "animate-progress"}`} />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto p-3">
              {SHOW.map((b, i) => (
                <button key={b} aria-label={b} onClick={() => pick(b)}
                  className={`h-14 w-14 shrink-0 rounded-xl border-2 bg-secondary p-1 transition-all duration-300 ${i === slide ? "scale-105 border-primary" : "border-transparent opacity-50 hover:opacity-100"}`}>
                  <img src={IMAGES[b]} alt="" className="h-full w-full object-contain" />
                </button>
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
