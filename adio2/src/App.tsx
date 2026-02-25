import { useState, useEffect, useRef, type ReactNode } from "react";

/* ═══════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════ */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(44px)",
        transition: `all 0.95s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Logo ─── */
function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-0 select-none">
      {/* 
        Replace with your logo file:
        <img src="logo.png" alt="adio2" className="h-7" />
      */}
      <span
        className={`text-[22px] font-black ${dark ? "text-white" : "text-[#000]"}`}
        style={{ letterSpacing: "-0.05em" }}
      >
        adio
      </span>
      <span
        className="text-[22px] font-black"
        style={{ letterSpacing: "-0.05em", color: "var(--accent)" }}
      >
        2
      </span>
    </a>
  );
}

/* ─── Phone Mockup ─── */
function PhoneMockup() {
  const bars = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="relative" style={{ width: "clamp(200px, 55vw, 260px)" }}>
      {/* Glow */}
      <div
        className="absolute inset-0 -inset-x-10 blur-[60px] glow-pulse rounded-full"
        style={{ background: "var(--accent)" }}
      />

      {/* Frame */}
      <div
        className="relative rounded-[34px] bg-[#1c1c1e] p-[5px]"
        style={{
          boxShadow:
            "0 40px 100px -15px rgba(0,0,0,0.55), 0 15px 40px -8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[22px] bg-[#1c1c1e] rounded-b-2xl z-10" />

        {/* Screen */}
        <div
          className="relative bg-[#fafafa] rounded-[29px] overflow-hidden"
          style={{ aspectRatio: "9 / 19.5" }}
        >
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 pt-7 pb-1 text-[9px] font-bold text-gray-800">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
              </svg>
              <div className="w-3.5 h-[9px] border border-gray-700 rounded-[2px] relative">
                <div className="absolute inset-[1px] right-[3px] bg-gray-700 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* App header */}
          <div className="px-5 pt-3 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--accent)" }}
                >
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-gray-900">
                  adio2
                </span>
              </div>
              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Recording mode indicator */}
          <div className="mx-5 mb-3 px-3 py-1.5 rounded-lg bg-red-50 flex items-center gap-2">
            <span className="w-[6px] h-[6px] rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] font-semibold text-red-600 uppercase tracking-wider">
              Nagrywanie
            </span>
          </div>

          {/* Timer */}
          <div className="text-center mb-4">
            <p
              className="text-[28px] font-extralight tracking-[0.08em] text-gray-900"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              02:47
            </p>
          </div>

          {/* Animated Waveform */}
          <div className="flex items-center justify-center gap-[2px] h-12 px-6 mb-5">
            {bars.map((i) => (
              <div
                key={i}
                className="waveform-bar rounded-full"
                style={{
                  width: "2.5px",
                  background: i < 22 ? "var(--accent)" : "var(--accent-20)",
                  animationDelay: `${i * 0.065}s`,
                  animationDuration: `${0.8 + Math.random() * 0.8}s`,
                }}
              />
            ))}
          </div>

          {/* Record button */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full bg-red-500 pulse-ring"
              />
              <div
                className="relative w-14 h-14 rounded-full bg-red-500 flex items-center justify-center"
                style={{
                  boxShadow: "0 4px 24px rgba(239,68,68,0.4)",
                }}
              >
                <div className="w-5 h-5 rounded-[4px] bg-white" />
              </div>
            </div>
          </div>

          {/* Output tags */}
          <div className="flex gap-1.5 justify-center px-4 flex-wrap">
            {[".pdf", ".xls", ".word", ".json"].map((f) => (
              <span
                key={f}
                className="px-2.5 py-[3px] rounded-full text-[8px] font-semibold"
                style={{
                  background: "var(--accent-bg)",
                  color: "var(--accent)",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Flow Line with Particles ─── */
function FlowLineH() {
  return (
    <div
      className="relative h-[2px] flex-1 hidden md:block"
      style={{
        background:
          "linear-gradient(to right, transparent 0%, var(--accent-20) 20%, var(--accent-20) 80%, transparent 100%)",
      }}
    >
      {[0, 0.55, 1.1, 1.65].map((d, i) => (
        <div key={i} className="flow-particle" style={{ animationDelay: `${d}s` }} />
      ))}
    </div>
  );
}

function FlowLineV() {
  return (
    <div
      className="relative w-[2px] h-12 md:hidden"
      style={{
        background:
          "linear-gradient(to bottom, transparent 0%, var(--accent-20) 20%, var(--accent-20) 80%, transparent 100%)",
      }}
    >
      {[0, 0.5, 1.0].map((d, i) => (
        <div key={i} className="flow-particle-v" style={{ animationDelay: `${d}s` }} />
      ))}
    </div>
  );
}

/* ─── FAQ Item ─── */
function FaqItem({
  question,
  answer,
  delay = 0,
}: {
  question: string;
  answer: string;
  delay?: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={delay}>
      <div className="border-b border-gray-200/70">
        <button
          className="w-full flex items-center justify-between py-6 text-left group"
          onClick={() => setOpen(!open)}
        >
          <span className="text-[15px] sm:text-[17px] font-semibold text-[#000] pr-6 group-hover:opacity-70 transition-opacity">
            {question}
          </span>
          <span
            className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
              open ? "rotate-45 border-transparent" : "border-gray-200"
            }`}
            style={open ? { background: "var(--accent)" } : {}}
          >
            <svg
              className={`w-4 h-4 transition-colors ${open ? "text-white" : "text-gray-400"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </span>
        </button>
        <div
          className="overflow-hidden transition-all duration-600"
          style={{
            maxHeight: open ? "400px" : "0",
            opacity: open ? 1 : 0,
            transition:
              "max-height 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
          }}
        >
          <p className="pb-6 text-gray-500 leading-[1.75] text-[14px] sm:text-[15px]">
            {answer}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════ */

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formType, setFormType] = useState("produkt");
  const [formSent, setFormSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      {/* ═══════════ NAVBAR ═══════════ */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/70 backdrop-blur-2xl border-b border-gray-100/50"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[64px] flex items-center justify-between">
          <Logo />

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-9">
            <a
              href="#produkt"
              className="text-[13px] text-gray-500 hover:text-[#000] transition-colors font-medium"
            >
              Produkt
            </a>
            <a
              href="#dedykowane-ai"
              className="text-[13px] text-gray-500 hover:text-[#000] transition-colors font-medium"
            >
              Dedykowane AI
            </a>
            <a
              href="#faq"
              className="text-[13px] text-gray-500 hover:text-[#000] transition-colors font-medium"
            >
              FAQ
            </a>
            <a
              href="#kontakt"
              className="text-[13px] text-gray-500 hover:text-[#000] transition-colors font-medium"
            >
              Kontakt
            </a>
            <a
              href="#kontakt"
              className="ml-1 px-5 py-2 text-white text-[13px] font-semibold rounded-full transition-all hover:shadow-lg hover:brightness-110 active:scale-95"
              style={{
                background: "var(--accent)",
                boxShadow: "0 2px 12px var(--accent-30)",
              }}
            >
              Zacznij nagrywać
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-gray-900 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-gray-900 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-gray-900 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white/95 backdrop-blur-2xl ${
            menuOpen
              ? "max-h-[360px] border-b border-gray-100"
              : "max-h-0"
          }`}
        >
          <div className="px-6 py-6 space-y-5">
            {["Produkt", "Dedykowane AI", "FAQ", "Kontakt"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setMenuOpen(false)}
                className="block text-[15px] font-medium text-gray-600 hover:text-[#000]"
              >
                {label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setMenuOpen(false)}
              className="inline-block px-5 py-2.5 text-white text-[13px] font-semibold rounded-full"
              style={{ background: "var(--accent)" }}
            >
              Zacznij nagrywać
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section id="produkt" className="pt-28 sm:pt-36 pb-4 px-5 sm:px-6">
        <div className="max-w-[1100px] mx-auto">
          {/* ─ Headline ─ */}
          <div className="text-center max-w-[780px] mx-auto mb-12 sm:mb-16">
            <div className="hero-anim">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold text-gray-500 mb-7"
                style={{ background: "var(--accent-bg)" }}
              >
                <span
                  className="w-[6px] h-[6px] rounded-full animate-pulse"
                  style={{ background: "var(--accent)" }}
                />
                Nowa era dokumentacji
              </span>
            </div>

            <h1
              className="hero-anim delay-1 text-[clamp(1.75rem,5.5vw,3.6rem)] font-extrabold leading-[1.06] mb-6 text-[#000000]"
              style={{ letterSpacing: "-0.04em" }}
            >
              Raporty same się
              <br className="hidden sm:block" /> nie wypełnią?{" "}
              <span className="text-gray-300">Być może.</span>
              <br />
              Ale możesz skrócić czas o{" "}
              <span style={{ color: "var(--accent)" }}>90%</span>.
            </h1>

            <p className="hero-anim delay-2 text-[clamp(0.95rem,2vw,1.2rem)] text-gray-400 leading-relaxed max-w-[600px] mx-auto">
              Nagraj głos — odbierz gotowy dokument. adio2 zamienia nagrania
              w&nbsp;profesjonalne pliki .word, .xls, .txt, PDF i&nbsp;JSON.
              Analiza kontekstowa AI, nie tylko transkrypcja.
            </p>

            <div className="hero-anim delay-3 flex flex-col sm:flex-row gap-3.5 justify-center mt-9">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-semibold text-[14px] rounded-full transition-all hover:brightness-110 active:scale-[0.97]"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 6px 24px var(--accent-30)",
                }}
              >
                <svg
                  className="w-[18px] h-[18px]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
                Zacznij nagrywać
              </a>
              <a
                href="#flow"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-gray-500 font-semibold text-[14px] rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 transition-all active:scale-[0.97]"
              >
                Jak to działa
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* ─ Hero Visual ─ */}
          <div className="hero-anim delay-4 relative pb-[100px] md:pb-[90px]">
            {/* Background container */}
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "40px" }}
            >
              <div className="relative h-[260px] sm:h-[350px] md:h-[440px]">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80"
                  alt="Praca biurowa"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "brightness(0.6) grayscale(0.3)" }}
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.5) 100%)",
                  }}
                />
                {/* Text on image */}
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 z-10 max-w-xs sm:max-w-md">
                  <p className="text-white/50 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.1em] mb-1">
                    Zamieniamy chaos w porządek
                  </p>
                  <p
                    className="text-white text-base sm:text-xl md:text-2xl font-bold"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    Mów naturalnie. My zrobimy resztę.
                  </p>
                </div>
                {/* Stats on image (desktop) */}
                <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-10 z-10 hidden sm:flex gap-6">
                  <div className="text-right">
                    <p className="text-white text-xl md:text-2xl font-bold">
                      90%
                    </p>
                    <p className="text-white/40 text-[10px] font-medium uppercase tracking-wider">
                      oszczędności czasu
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-xl md:text-2xl font-bold">
                      5+
                    </p>
                    <p className="text-white/40 text-[10px] font-medium uppercase tracking-wider">
                      formatów wyjściowych
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Mockup — floating */}
            <div className="absolute left-1/2 bottom-0 z-20 phone-float-desktop hidden md:block">
              <PhoneMockup />
            </div>
            {/* Phone on mobile (static, in flow) */}
            <div className="md:hidden flex justify-center -mt-12 relative z-20">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ DATA FLOW ═══════════ */}
      <section id="flow" className="py-20 sm:py-28 px-5 sm:px-6">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <div className="text-center max-w-xl mx-auto mb-14 sm:mb-20">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3"
                style={{ color: "var(--accent)" }}
              >
                Jak to działa
              </p>
              <h2
                className="text-[clamp(1.6rem,4vw,2.8rem)] font-extrabold text-[#000000]"
                style={{ letterSpacing: "-0.04em" }}
              >
                Od głosu do dokumentu
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-0 md:gap-4">
              {/* Stage 1: Inputs */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="flex gap-2.5">
                  {[
                    { icon: "🎤", tip: "Głos" },
                    { icon: "📧", tip: "E-mail" },
                    { icon: "☁️", tip: "Chmura" },
                  ].map((s) => (
                    <div
                      key={s.tip}
                      className="w-[52px] h-[52px] rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[20px] hover:scale-110 hover:shadow-md transition-all cursor-default"
                      title={s.tip}
                    >
                      {s.icon}
                    </div>
                  ))}
                </div>
                <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                  Źródła danych
                </span>
              </div>

              {/* Arrow/Line */}
              <FlowLineH />
              <FlowLineV />

              {/* Stage 2: adio2 */}
              <div className="flex flex-col items-center gap-3 shrink-0 my-2 md:my-0">
                <div className="relative">
                  <div
                    className="absolute inset-0 blur-3xl opacity-20 rounded-full scale-150"
                    style={{ background: "var(--accent)" }}
                  />
                  <div
                    className="relative w-[72px] h-[72px] rounded-[22px] flex items-center justify-center text-white"
                    style={{
                      background: "var(--accent)",
                      boxShadow: "0 10px 36px var(--accent-30)",
                    }}
                  >
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <p
                    className="text-[13px] font-bold text-[#000]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    adio2
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium">
                    Analiza branżowa AI
                  </p>
                </div>
              </div>

              {/* Arrow/Line */}
              <FlowLineH />
              <FlowLineV />

              {/* Stage 3: Outputs */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="flex gap-2.5">
                  {[
                    { icon: "📄", label: ".pdf" },
                    { icon: "📊", label: ".xls" },
                    { icon: "📝", label: ".word" },
                    { icon: "🔗", label: ".json" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="w-[52px] h-[52px] rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center hover:scale-110 hover:shadow-md transition-all cursor-default"
                    >
                      <span className="text-[17px] leading-none mb-[2px]">
                        {s.icon}
                      </span>
                      <span className="text-[7px] text-gray-400 font-bold uppercase">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                  Formaty wyjściowe
                </span>
              </div>
            </div>
          </Reveal>

          {/* Feature cards below flow */}
          <div className="grid sm:grid-cols-3 gap-5 mt-16 sm:mt-24">
            {[
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                ),
                title: "Błyskawicznie",
                desc: "Dokumenty generowane w sekundy, nie godziny. Oszczędzaj czas na to, co naprawdę ważne.",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                    />
                  </svg>
                ),
                title: "Analiza kontekstowa",
                desc: "Nie tylko transkrypcja — AI rozumie kontekst branżowy i generuje trafne, strukturyzowane dokumenty.",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                ),
                title: "Pełne szyfrowanie",
                desc: "E2E encryption, serwery w EU, zgodność z RODO. Twoje dane są zawsze bezpieczne.",
              },
            ].map((f, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <div className="group p-7 sm:p-8 rounded-[24px] border border-gray-100 hover:border-gray-200 bg-white hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-500 hover:-translate-y-1 h-full">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-500 text-gray-400 group-hover:text-white bg-gray-50 group-hover:bg-[var(--accent)]"
                    style={
                      {
                        "--accent-val": "var(--accent)",
                      } as React.CSSProperties
                    }
                  >
                    {f.icon}
                  </div>
                  <h3
                    className="text-[15px] font-bold text-[#000] mb-2"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section id="faq" className="py-20 sm:py-28 px-5 sm:px-6 bg-gray-50/50">
        <div className="max-w-[680px] mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3"
                style={{ color: "var(--accent)" }}
              >
                FAQ
              </p>
              <h2
                className="text-[clamp(1.6rem,4vw,2.8rem)] font-extrabold text-[#000000] mb-4"
                style={{ letterSpacing: "-0.04em" }}
              >
                Bezpieczeństwo danych
              </h2>
              <p className="text-gray-400 text-[15px] max-w-md mx-auto leading-relaxed">
                Twoje dane to priorytet. Oto odpowiedzi na najczęstsze pytania.
              </p>
            </div>
          </Reveal>

          <FaqItem
            question="Gdzie przetwarzane są moje dane?"
            answer="Wszystkie dane przetwarzane są wyłącznie na serwerach zlokalizowanych w Unii Europejskiej. Jesteśmy w pełni zgodni z RODO/GDPR. Masz prawo do wglądu, eksportu i usunięcia swoich danych w dowolnym momencie."
            delay={0.05}
          />
          <FaqItem
            question="Czy moje nagrania są wykorzystywane do trenowania AI?"
            answer="Absolutnie nie. Korzystamy z modeli zamkniętych — Twoje dane nigdy nie są wykorzystywane do trenowania ani fine-tuningu naszych modeli. Gwarantujemy to zapisami w polityce prywatności i umowach SLA."
            delay={0.1}
          />
          <FaqItem
            question="Jakie szyfrowanie stosujecie?"
            answer="Stosujemy szyfrowanie end-to-end (E2EE) z protokołem TLS 1.3 dla danych w tranzycie oraz AES-256 dla danych w spoczynku. Klucze szyfrujące zarządzane są w dedykowanym HSM (Hardware Security Module)."
            delay={0.15}
          />
          <FaqItem
            question="Czy adio2 tylko transkrybuje nagrania?"
            answer="Nie. adio2 to znacznie więcej niż transkrypcja. Nasz silnik AI przeprowadza pełną analizę kontekstową — rozumie branżę, strukturę dokumentu i intencję mówcy. Na tej podstawie generuje gotowe, sformatowane dokumenty — nie surowy tekst."
            delay={0.2}
          />
          <FaqItem
            question="Kto ma dostęp do moich plików?"
            answer="Nikt poza Tobą. Nasz zespół nie ma dostępu do treści Twoich nagrań ani dokumentów. Systemy AI przetwarzają dane automatycznie, bez udziału ludzi. Stosujemy zasadę najmniejszych uprawnień (least privilege)."
            delay={0.25}
          />
          <FaqItem
            question="Czy mogę wdrożyć adio2 na własnych serwerach?"
            answer="Tak. Dla klientów Enterprise oferujemy wdrożenie on-premise lub w prywatnej chmurze (private cloud). Daje to pełną kontrolę nad infrastrukturą i przepływem danych w ramach Twojej organizacji."
            delay={0.3}
          />
        </div>
      </section>

      {/* ═══════════ DEDYKOWANE AI ═══════════ */}
      <section
        id="dedykowane-ai"
        className="relative py-20 sm:py-28 px-5 sm:px-6 overflow-hidden"
        style={{ background: "#09090b" }}
      >
        {/* Background effects */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23fff' stroke-width='0.5' fill='none'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute top-[-200px] left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] glow-pulse"
          style={{ background: "var(--accent)", opacity: 0.08 }}
        />
        <div
          className="absolute bottom-[-200px] right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] glow-pulse"
          style={{
            background: "var(--accent-light)",
            opacity: 0.06,
            animationDelay: "1.5s",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div>
              <Reveal>
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold text-gray-400 mb-7 border border-white/[0.06]"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: "var(--accent)" }}
                  >
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                  Dedykowane AI
                </span>
              </Reveal>

              <Reveal delay={0.1}>
                <h2
                  className="text-[clamp(1.6rem,4.5vw,3rem)] font-extrabold text-white leading-[1.1] mb-6"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  Budujemy systemy AI
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, var(--accent), var(--accent-light))`,
                    }}
                  >
                    na zamówienie.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-[15px] sm:text-[16px] text-gray-500 leading-[1.75] mb-8 max-w-lg">
                  adio2 to nasz produkt — ale nasz zespół to eksperci od AI.
                  Projektujemy i&nbsp;wdrażamy niestandardowe systemy sztucznej
                  inteligencji, automatyzacje procesów i&nbsp;dedykowane modele
                  językowe dopasowane do Twojej firmy.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold text-[14px] rounded-full transition-all hover:brightness-110 active:scale-[0.97]"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 6px 30px var(--accent-30)",
                  }}
                >
                  Skonsultuj projekt AI
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
              </Reveal>
            </div>

            {/* Right — cards */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
              {[
                {
                  icon: "🤖",
                  title: "Dedykowane modele",
                  desc: "Fine-tuning i trenowanie modeli na Twoich danych branżowych.",
                },
                {
                  icon: "⚡",
                  title: "Automatyzacja",
                  desc: "Od dokumentów po workflow — automatyzujemy procesy biznesowe.",
                },
                {
                  icon: "🔌",
                  title: "Integracje API",
                  desc: "Łączymy AI z Twoimi istniejącymi systemami i narzędziami.",
                },
                {
                  icon: "📊",
                  title: "Analityka NLP",
                  desc: "Analiza tekstu, sentymentu i ekstrakcja kluczowych danych.",
                },
              ].map((s, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <div className="p-5 sm:p-6 rounded-[20px] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 group h-full bg-white/[0.02] hover:bg-white/[0.04]">
                    <span className="text-[22px] block mb-3">{s.icon}</span>
                    <h3 className="font-bold text-[13px] mb-1.5 text-white">
                      {s.title}
                    </h3>
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="kontakt" className="py-20 sm:py-28 px-5 sm:px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left info */}
            <div className="lg:col-span-2">
              <Reveal>
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  Kontakt
                </p>
                <h2
                  className="text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold text-[#000000] mb-5"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  Porozmawiajmy.
                </h2>
                <p className="text-gray-400 text-[14px] leading-[1.75] mb-8">
                  Masz pytanie o adio2 lub chcesz omówić projekt AI? Wypełnij
                  formularz — odezwiemy się w&nbsp;ciągu 24&nbsp;godzin.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center"
                      style={{ color: "var(--accent)" }}
                    >
                      <svg
                        className="w-[16px] h-[16px]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <span className="text-[13px] text-gray-500 font-medium">
                      hello@adio2.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center"
                      style={{ color: "var(--accent)" }}
                    >
                      <svg
                        className="w-[16px] h-[16px]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                        />
                      </svg>
                    </div>
                    <span className="text-[13px] text-gray-500 font-medium">
                      adio2.com
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right form */}
            <div className="lg:col-span-3">
              <Reveal delay={0.12}>
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-[28px] border border-gray-100 p-7 sm:p-9 shadow-sm"
                >
                  {/* Type selector */}
                  <div className="mb-7">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-3">
                      Rodzaj zapytania
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: "produkt", label: "Produkt adio2" },
                        { value: "ai", label: "Projekt AI" },
                        { value: "demo", label: "Demo" },
                        { value: "inne", label: "Inne" },
                      ].map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setFormType(t.value)}
                          className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-300 ${
                            formType === t.value
                              ? "text-white shadow-md"
                              : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                          }`}
                          style={
                            formType === t.value
                              ? {
                                  background: "var(--accent)",
                                  boxShadow: "0 4px 16px var(--accent-30)",
                                }
                              : {}
                          }
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-2">
                        Imię
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jan"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/40 text-[13px] text-gray-900 placeholder:text-gray-300 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jan@firma.pl"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/40 text-[13px] text-gray-900 placeholder:text-gray-300 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-2">
                      Firma
                    </label>
                    <input
                      type="text"
                      placeholder="Nazwa firmy (opcjonalnie)"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/40 text-[13px] text-gray-900 placeholder:text-gray-300 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="mb-7">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-2">
                      Wiadomość
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Opisz krótko, w czym możemy pomóc..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/40 text-[13px] text-gray-900 placeholder:text-gray-300 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-white font-semibold text-[14px] rounded-full transition-all hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2"
                    style={{
                      background: formSent ? "#10b981" : "var(--accent)",
                      boxShadow: formSent
                        ? "0 4px 20px rgba(16,185,129,0.3)"
                        : "0 4px 20px var(--accent-30)",
                    }}
                  >
                    {formSent ? (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        Wysłano! Odezwiemy się wkrótce
                      </>
                    ) : (
                      <>
                        Wyślij wiadomość
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="py-10 px-5 sm:px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <Logo />
          <div className="flex items-center gap-7 text-[12px] text-gray-400 font-medium">
            <a
              href="#produkt"
              className="hover:text-gray-600 transition-colors"
            >
              Produkt
            </a>
            <a
              href="#dedykowane-ai"
              className="hover:text-gray-600 transition-colors"
            >
              Dedykowane AI
            </a>
            <a href="#faq" className="hover:text-gray-600 transition-colors">
              FAQ
            </a>
            <a
              href="#kontakt"
              className="hover:text-gray-600 transition-colors"
            >
              Kontakt
            </a>
          </div>
          <p className="text-[11px] text-gray-300">
            © {new Date().getFullYear()} adio2. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  );
}
