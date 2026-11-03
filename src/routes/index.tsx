import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Droplets, Truck, Wallet, MessageCircle, ArrowLeft, Check, Minus, Plus, Package } from "lucide-react";
import hero from "@/assets/hero2.jpg";
import bayanImg from "@/assets/bayan-box.webp";
import berainImg from "@/assets/berain-box.webp";
import safaImg from "@/assets/safa-box.webp";
import aloyounImg from "@/assets/aloyoun-box.webp";
import novaImg from "@/assets/nova-box.webp";
import mawaredImg from "@/assets/mawared-box.webp";
import akoyaImg from "@/assets/akoya-box.webp";
import naqaImg from "@/assets/naqa-box.webp";
import zulalImg from "@/assets/zulal-box.webp";
import eveImg from "@/assets/eve-box.webp";
const IMAGES: Record<string, string> = {
  البيان: bayanImg, بيرين: berainImg, صفا: safaImg, العيون: aloyounImg,
  نوفا: novaImg, موارد: mawaredImg, أكويا: akoyaImg, "نقا آسيا": naqaImg,
  زلال: zulalImg, إيفا: eveImg,
};
const SHOW = Object.keys(IMAGES);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مياه البيت | توصيل مياه في جدة" },
      { name: "description", content: "اطلب مياهك المفضلة وتوصلك لباب بيتك في جدة، والدفع عند الاستلام." },
      { property: "og:title", content: "مياه البيت | توصيل مياه في جدة" },
      { property: "og:description", content: "اطلب مياهك المفضلة وتوصلك لباب بيتك في جدة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP = "966500000000";

type Opt = { label: string; price: number };
const BRANDS: Record<string, Opt[]> = {
  البيان: [{ label: "330 مل — 24 حبة", price: 10 }],
  بيرين: [{ label: "330 مل — 40 حبة", price: 12 }],
  صفا: [{ label: "330 مل — 40 حبة", price: 9 }, { label: "جالون 5 لتر", price: 5 }],
  العيون: [{ label: "330 مل — 40 حبة", price: 10 }],
  نوفا: [{ label: "330 مل — 40 حبة", price: 14 }, { label: "200 مل — 48 حبة", price: 13 }],
  موارد: [{ label: "330 مل — 40 حبة", price: 11 }],
  أكويا: [{ label: "330 مل — 40 حبة", price: 12 }],
  "نقا آسيا": [{ label: "330 مل — 40 حبة", price: 10 }],
  زلال: [{ label: "330 مل — 40 حبة", price: 10 }],
  إيفا: [{ label: "330 مل — 40 حبة", price: 11 }],
};

const ar = (n: number) => n.toLocaleString("ar-SA");
const wa = (t: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;

function Index() {
  const brands = Object.keys(BRANDS);
  const [brand, setBrand] = useState<string>("البيان");
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
          <div className="self-start overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-2xl ring-1 ring-primary/10" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-secondary">
              {SHOW.map((b, i) => {
                const pos = (i - slide + SHOW.length) % SHOW.length;
                const cls = pos === 0 ? "opacity-100 scale-100" : pos === 1 ? "opacity-0 scale-105 translate-x-[-6%]" : "opacity-0 scale-105 translate-x-[6%]";
                return <img key={b} src={IMAGES[b]} alt={`مياه ${b}`} loading={i === 0 ? "eager" : "lazy"} width={1200} height={800}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-[cubic-bezier(.22,1,.36,1)] ${cls}`} />;
              })}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
                <span key={shown} className="rounded-full bg-card px-4 py-1.5 text-sm font-bold text-primary shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-500">مياه {shown}</span>
                <div className="flex gap-1.5">
                  {SHOW.map((b, i) => (
                    <button key={b} aria-label={b} onClick={() => pick(b)}
                      className={`h-2 rounded-full transition-all duration-300 ${i === slide ? "w-6 bg-card" : "w-2 bg-card/50 hover:bg-card/80"}`} />
                  ))}
                </div>
              </div>
              <span className="absolute left-4 top-4 rounded-full bg-card/85 px-3 py-1 text-xs text-muted-foreground backdrop-blur">{ar(slide + 1)} / {ar(SHOW.length)}</span>
              <div className="absolute inset-x-0 top-0 h-1 bg-border/40">
                <div key={`${slide}-${paused}`} className={`h-full bg-primary ${paused ? "w-full" : "animate-progress"}`} />
              </div>
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

      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <p className="text-sm font-medium opacity-80">كل اللي يعجبك… موجود</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">ماركاتك المفضلة، توصلك لباب البيت</h2>
          <p className="mt-3 opacity-90">محتار؟ كلمنا ونساعدك تختار.</p>
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-5 gap-3 md:gap-4">
            {SHOW.map((b) => (
              <div key={b} className="group flex flex-col items-center gap-2">
                <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-card p-1.5 shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 md:h-20 md:w-20">
                  <img src={IMAGES[b]} alt={`مياه ${b}`} loading="lazy" className="max-h-full max-w-full object-contain" />
                </span>
                <span className="text-[11px] font-medium opacity-80 md:text-xs">{b}</span>
              </div>
            ))}
          </div>
          <a href={wa("مرحباً، أبغى أطلب مياه.")} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-lg bg-cta-gradient px-8 py-4 font-bold text-cta-foreground shadow-xl transition hover:scale-105">
            <MessageCircle className="h-5 w-5" /> كلمنا على واتساب
          </a>
        </div>
        <div className="border-t border-primary-foreground/15 px-6 py-5 text-center text-xs opacity-70">
          مياه البيت — توصيل مياه في جدة • الدفع عند الاستلام
        </div>
      </footer>
    </main>
  );
}
