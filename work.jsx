const DS = window.NoahCreativeMarketingStudioDesignSystem_9bf6a7;
const { Footer, Icon, Tag } = DS;
const { useEffect, useRef, useState } = React;

const CATS = [
  { id: "video", en: "Video Production", cn: "影片制作", subs: [
    { id: "ai", label: "AI Video" }, { id: "commercial", label: "Commercial" }, { id: "kol", label: "KOL" }, { id: "ip", label: "IP Video" }] },
  { id: "design", en: "Brand Design", cn: "品牌设计", subs: [
    { id: "sleepinc", label: "Sleep Inc" }, { id: "furwell", label: "Furwell" }] },
  { id: "social", en: "Social Media", cn: "社媒代运营", subs: [
    { id: "xhs", label: "小红书" }, { id: "metaposting", label: "Meta素材" }] },
  { id: "ads", en: "Advertisement", cn: "广告投放", subs: [] },
  { id: "campaign", en: "Campaign", cn: "整合campaign", subs: [] },
  { id: "others", en: "Others", cn: "其他", subs: [] },
];

const PROJECTS = [
  { id: "v-flower", cat: "video", sub: "ai", title: "Talking flower", year: "2026", media: { type: "video", src: "assets/talking-flower.mp4" }, poster: "assets/poster-talking-flower.jpg", ratio: "3/4", playRatio: "9/16", yt: "" },
  { id: "v-jinhaishen", cat: "video", sub: "ai", title: "金海参鱼鳞冻 · AI film", year: "2026", media: { type: "video", src: "assets/jinhaishen-ai.mp4" }, poster: "assets/poster-jinhaishen-ai.jpg", ratio: "3/4", playRatio: "9/16", yt: "" },
  { id: "v-covo", cat: "video", sub: "commercial", title: "IOI COVO", year: "2026", media: { type: "video", src: "assets/ioi-covo.mp4" }, poster: "assets/poster-ioi-covo.jpg", ratio: "3/4", playRatio: "9/16", yt: "" },
  { id: "v-banting-1", cat: "video", sub: "commercial", title: "IOI Industrial Park Banting — I", year: "2026", media: { type: "video", src: "assets/ioi-banting-1.mp4" }, poster: "assets/poster-ioi-banting-1.jpg", ratio: "3/4", playRatio: "9/16", yt: "" },
  { id: "v-banting-3", cat: "video", sub: "commercial", title: "IOI Industrial Park Banting — II", year: "2026", media: { type: "video", src: "assets/ioi-banting-3.mp4" }, poster: "assets/poster-ioi-banting-3.jpg", ratio: "3/4", playRatio: "9/16", yt: "" },
  { id: "v-zotac", cat: "video", sub: "commercial", title: "Zotac RTX 5070", year: "2026", media: { type: "video", src: "assets/zotac-rtx5070.mp4" }, poster: "assets/poster-zotac-rtx5070.jpg", ratio: "3/4", playRatio: "9/16", yt: "" },
  { id: "v-sandisk", cat: "video", sub: "kol", title: "Sandisk × Agnes", year: "2026", media: { type: "video", src: "assets/sandisk-agnes.mp4" }, poster: "assets/poster-sandisk-agnes.jpg", ratio: "3/4", playRatio: "9/16", yt: "" },
  { id: "v-kol-1", skip: true, cat: "video", sub: "kol", title: "KOL reel — transition cut", media: { type: "video", src: "assets/reel-pokemon.mp4" }, poster: "assets/poster-reel-pokemon.jpg", ratio: "3/4", playRatio: "9/16", yt: "" },
  { id: "v-pokemon", cat: "video", sub: "kol", title: "Pokemon Friends — Poke Ball", year: "2026", media: { type: "video", src: "assets/pokemon-pokeball.mp4" }, poster: "assets/poster-pokemon-pokeball.jpg", ratio: "3/4", playRatio: "9/16", yt: "" },
  { id: "d-sleep-1", cat: "design", sub: "sleepinc", title: "Sleep Inc — rebranding", media: { type: "img", src: "assets/sleepinc-cover.jpg" }, ratio: "16/10", deck: { subtitle: "品牌重塑 · Rebranding 2026", pages: ["assets/sleepinc-01.jpg", "assets/sleepinc-02.jpg", "assets/sleepinc-03.jpg", "assets/sleepinc-04.jpg", "assets/sleepinc-05.jpg", "assets/sleepinc-06.jpg", "assets/sleepinc-07.jpg", "assets/sleepinc-08.gif", "assets/sleepinc-09.jpg"] } },
  { id: "d-fur-1", cat: "design", sub: "furwell", title: "Furwell", media: { type: "img", src: "assets/furwell-cover.jpg" }, ratio: "16/10", deck: { subtitle: "品牌形象设计 · Brand Identity", pages: ["assets/furwell-01.jpg", "assets/furwell-02.jpg", "assets/furwell-03.jpg", "assets/furwell-04.jpg", "assets/furwell-05.jpg", "assets/furwell-06.jpg", "assets/furwell-07.jpg", "assets/furwell-08.jpg", "assets/furwell-09.jpg", "assets/furwell-10.jpg", "assets/furwell-11.jpg"] } },
  { id: "d-sou-1", skip: true, cat: "design", sub: "souffle", title: "Souffle", slot: "Souffle — drop artwork", ratio: "4/3" },
  { id: "d-oth-1", skip: true, cat: "design", sub: "d-others", title: "My Enak — name card", media: { type: "img", src: "assets/design-namecard.png" }, ratio: "4/3", pad: true },
  { id: "d-oth-2", skip: true, cat: "design", sub: "d-others", title: "Hopereno — logo", media: { type: "logo", src: "assets/design-logo-2.png" }, ratio: "4/3" },
  { id: "s-3g-1", cat: "social", sub: "xhs", title: "3G Auto", phone: true, media: { type: "img", src: "assets/xhs-3gauto.jpg" }, ratio: "4/5", deck: { subtitle: "小红书内容与账号运营 · Xiaohongshu Content & Account Management", pages: ["assets/3gauto-01.jpg", "assets/3gauto-02.jpg", "assets/3gauto-03.jpg", "assets/3gauto-04.jpg", "assets/3gauto-05.jpg", "assets/3gauto-06.jpg", "assets/3gauto-07.jpg", "assets/3gauto-08.jpg"] } },
  { id: "s-amz-1", cat: "social", sub: "xhs", title: "Amazing", phone: true, media: { type: "img", src: "assets/xhs-amazing.jpg" }, ratio: "4/5" },
  { id: "s-ling-1", cat: "social", sub: "xhs", title: "Ling家女孩", phone: true, media: { type: "img", src: "assets/xhs-ling.jpg" }, ratio: "4/5", deck: { subtitle: "小红书内容与账号运营 · Xiaohongshu Content & Account Management", pages: ["assets/ling-01.jpg", "assets/ling-02.jpg", "assets/ling-03.jpg", "assets/ling-04.jpg", "assets/ling-05.jpg", "assets/ling-06.jpg"] } },
  { id: "s-glam-1", skip: true, cat: "social", sub: "xhs", title: "Glamhaus", phone: true, slot: "Glamhaus — drop 小红书截图", ratio: "4/5" },
  { id: "s-mp-1", cat: "social", sub: "metaposting", title: "Amazing Postnatal Care", phone: true, noIsland: true, media: { type: "img", src: "assets/fb-amazing.jpg" }, ratio: "4/5" },
  { id: "s-mp-2", cat: "social", sub: "metaposting", title: "Furwell Pet Memorial", phone: true, noIsland: true, media: { type: "img", src: "assets/fb-furwell.jpg" }, ratio: "4/5" },
  { id: "s-mp-3", cat: "social", sub: "metaposting", title: "HealthLand Berjaya Times Square", phone: true, noIsland: true, media: { type: "img", src: "assets/fb-healthland.jpg" }, ratio: "4/5" },
  { id: "s-mp-4", cat: "social", sub: "metaposting", title: "HLA", phone: true, noIsland: true, media: { type: "img", src: "assets/fb-hla.jpg" }, ratio: "4/5" },
  { id: "c-bkk", cat: "campaign", sub: null, title: "Bungkus Kaw Kaw — Video & Animation", year: "2025", media: { type: "img", src: "assets/bkk-cover.jpg" }, ratio: "16/10", deck: { subtitle: "3D 动画 · WhatsApp 贴图 · Raya campaign 2025", pages: ["assets/bkk-01.jpg", "assets/bkk-02.jpg", "assets/bkk-03.gif", "assets/bkk-04.jpg", "assets/bkk-05.gif", "assets/bkk-07.gif"] } },
  { id: "c-fadazai", cat: "campaign", sub: null, title: "FaDaZai — Event VI Design", year: "2024", media: { type: "img", src: "assets/fadazai-01.jpg" }, ratio: "16/9", deck: { subtitle: "发达仔 · 龙年原创 IP 与活动视觉 2024", pages: ["assets/fadazai-01.jpg", "assets/fadazai-02.jpg", "assets/fadazai-03.jpg", "assets/fadazai-04.jpg", "assets/fadazai-05.gif", "assets/fadazai-06.jpg", "assets/fadazai-07.jpg", "assets/fadazai-08.jpg", "assets/fadazai-09.jpg"] } },
  { id: "o-1", skip: true, cat: "others", sub: null, title: "Others", slot: "Other work — drop file", ratio: "4/3" },
];

const CLIENTS = [
  { name: "HLA", src: "assets/client-hla.jpg" },
  { name: "Sandisk", src: "assets/client-sandisk.jpg" },
  { name: "Ikigai Solar", src: "assets/client-ikigai.jpg" },
  { name: "HealthLand Family Wellness Centre", src: "assets/client-healthland.jpg" },
  { name: "Amazing Postnatal Care", src: "assets/client-amazing.jpg" },
  { name: "Furwell 毛忆谷", src: "assets/client-furwell.jpg" },
];

const catOf = (id) => CATS.find((c) => c.id === id);
const subLabel = (p) => { const c = catOf(p.cat); const s = c && c.subs.find((x) => x.id === p.sub); return s ? s.label : c.en; };

function Toolbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 13);
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={"toolbar" + (scrolled ? " scrolled" : "")}>
      <div className="toolbar-in">
        <a href="index.html"><img src="assets/logo-noah-blue.png" alt="Noah Creative Marketing Studio" style={{ height: 22, width: "auto", display: "block" }} /></a>
        <nav className="tb-nav">
          <a href="index.html#reel">Services</a>
          <a href="index.html#contact">Contact</a>
          <a href="work.html" className="tb-work on">Work<span className="tb-arr">↗</span></a>
        </nav>
      </div>
    </header>
  );
}

function HoverVideo({ p }) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const hovering = useRef(false);
  const card = useRef(null);
  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const wrap = el.closest(".wk-card");
    if (!wrap) return;
    const enter = () => { hovering.current = true; setArmed(true); const v = ref.current; if (v && v.src) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); } };
    const leave = () => { hovering.current = false; const v = ref.current; if (v) { v.pause(); try { v.currentTime = 0; } catch (e) {} } };
    wrap.addEventListener("pointerenter", enter);
    wrap.addEventListener("pointerleave", leave);
    return () => { wrap.removeEventListener("pointerenter", enter); wrap.removeEventListener("pointerleave", leave); };
  }, []);
  useEffect(() => {
    if (!armed) return;
    const v = ref.current;
    if (!v) return;
    if (v.load) v.load();
    if (hovering.current) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); }
  }, [armed]);
  return (
    <div ref={card} style={{ width: "100%", height: "100%", position: "relative", background: "var(--grey-100,#EDEFF2)" }}>
      {p.poster && <img src={p.poster} alt={p.title} onError={(e) => { e.currentTarget.style.display = "none"; }} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
      <video ref={ref} src={armed ? p.media.src : undefined} muted loop playsInline preload="none" onLoadedData={() => { const v = ref.current; if (v && hovering.current) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); } }} style={{ position: "relative", width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: armed ? 1 : 0, transition: "opacity .18s linear" }}></video>
      <span className="wk-play"><Icon name="play" size={16} /></span>
    </div>
  );
}

function PhoneMock({ p }) {
  return (
    <div className="ph-stage">
      <div className="ph">
        <div className="ph-screen">
          {p.slot
            ? <image-slot id={p.id} shape="rect" placeholder={p.slot} style={{ width: "100%", height: "100%" }}></image-slot>
            : <img src={p.media.src} alt={p.title} />}
          {!p.noIsland && <span className="ph-island"></span>}
        </div>
      </div>
    </div>
  );
}

function Media({ p }) {
  if (p.phone) return <PhoneMock p={p} />;
  if (p.slot) return <image-slot id={p.id} shape="rounded" radius="0" placeholder={p.slot} style={{ width: "100%", height: "100%" }}></image-slot>;
  if (p.media.type === "video") return <HoverVideo p={p} />;
  if (p.media.type === "logo") return <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", background: "#fff", padding: 28, boxSizing: "border-box" }}><img src={p.media.src} alt={p.title} style={{ maxWidth: "78%", maxHeight: "78%", objectFit: "contain" }} /></div>;
  return <img src={p.media.src} alt={p.title} style={{ width: "100%", height: "100%", objectFit: p.pad ? "contain" : "cover", background: "#fff", display: "block" }} />;
}

function Deck({ p, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", esc); };
  }, [onClose]);
  return (
    <div className="dk-scrim" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <button type="button" className="dk-x" onClick={onClose} aria-label="Close"><Icon name="x" size={20} /></button>
      <div className="dk-scroll">
        <div className="dk-head">
          <h2>{p.title}</h2>
          {p.deck.subtitle && <p>{p.deck.subtitle}</p>}
        </div>
        <div className="dk-pages">
          {p.deck.pages.map((src, i) => <img key={src} src={src} alt={p.title + " — " + (i + 1)} loading={i < 2 ? "eager" : "lazy"} decoding="async" />)}
        </div>
        <div className="dk-foot">
          <span>Noah Creative Marketing Studio</span>
          <a href="https://wa.me/601113113264" target="_blank" rel="noopener noreferrer">Start a project like this<Icon name="arrow-up-right" size={16} /></a>
        </div>
      </div>
    </div>
  );
}

function Player({ p, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", esc); };
  }, [onClose]);
  const rat = p.playRatio || p.ratio;
  const vertical = rat === "9/16";
  return (
    <div className="dk-scrim" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <button type="button" className="dk-x" onClick={onClose} aria-label="Close"><Icon name="x" size={20} /></button>
      <div className="pl-wrap" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className={"pl-frame" + (vertical ? " tall" : "")} style={{ aspectRatio: rat }}>
          {p.yt
            ? <iframe src={"https://www.youtube.com/embed/" + p.yt + "?autoplay=1&rel=0&playsinline=1"} title={p.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen frameBorder="0"></iframe>
            : <video src={p.media.src} controls autoPlay loop playsInline></video>}
        </div>
        <div className="pl-meta">
          <h2>{p.title}</h2>
          <p>{catOf(p.cat).en + " · " + subLabel(p) + " · " + (p.year || "2026")}</p>
        </div>
      </div>
    </div>
  );
}

function WorkCard({ p, showCat, onOpen }) {
  const clickable = !!(p.deck || (p.media && p.media.type === "video"));
  return (
    <article className={"wk-card" + (clickable ? " has-deck" : "")} onClick={() => clickable && onOpen(p)}>
      <div className="wk-media" style={{ aspectRatio: p.ratio }}>
        <Media p={p} />
        <div className="wk-go"><Icon name="arrow-up-right" size={18} /></div>
      </div>
      <div className="wk-meta">
        <div style={{ minWidth: 0 }}>
          <h3>{p.title}</h3>
          <p>{showCat ? catOf(p.cat).en + " · " + subLabel(p) : subLabel(p)}</p>
        </div>
        <span className="wk-yr">{p.year || "2026"}</span>
      </div>
    </article>
  );
}

const catFromHash = () => { const h = (window.location.hash || "").replace("#", "").toLowerCase(); return CATS.some((c) => c.id === h) ? h : "all"; };


const WA = "https://wa.me/601113113264";
const FOOT_LINKS = { "Video Production": "work.html#video", "Brand Design": "work.html#design", "Meta & Google Ads": "work.html#ads", "Social Media Management": "work.html#social" };
function useFooterLinks() {
  useEffect(() => {
    const foot = document.querySelector("footer");
    if (!foot) return;
    foot.querySelectorAll("a").forEach((a) => {
      const t = (a.textContent || "").trim();
      const href = a.getAttribute("href") || "";
      if (href.startsWith("mailto:") || /whatsapp/i.test(t)) { a.href = WA; a.target = "_blank"; a.rel = "noopener noreferrer"; }
      else if (/instagram/i.test(t)) { a.href = "https://www.instagram.com/noah_creative_studio"; a.target = "_blank"; a.rel = "noopener noreferrer"; }
      else if (FOOT_LINKS[t]) a.href = FOOT_LINKS[t];
    });
  }, []);
}

function WorkPage() {
  useFooterLinks();
  useEffect(() => {
    const row = document.querySelector(".wk-cats"); const on = row && row.querySelector(".on");
    if (row && on && row.scrollWidth > row.clientWidth) row.scrollTo({ left: on.getBoundingClientRect().left - row.getBoundingClientRect().left + row.scrollLeft - 20, behavior: "smooth" });
  }, [cat]);

  const [cat, setCat] = useState(catFromHash);
  const [sub, setSub] = useState("all");
  const [open, setOpen] = useState(null);
  useEffect(() => {
    const jump = () => { const el = document.querySelector(".wk-cats"); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" }); };
    if (catFromHash() !== "all") setTimeout(jump, 60);
    const on = () => { setCat(catFromHash()); setSub("all"); if (catFromHash() !== "all") jump(); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const active = cat === "all" ? null : catOf(cat);
  const list = PROJECTS.filter((p) => !p.skip && (cat === "all" || p.cat === cat) && (sub === "all" || !active || !active.subs.length || p.sub === sub));
  const pick = (id) => { setCat(id); setSub("all"); if (window.history && window.history.replaceState) window.history.replaceState(null, "", id === "all" ? window.location.pathname : "#" + id); };
  const count = (id) => id === "ads" ? CLIENTS.length : PROJECTS.filter((p) => !p.skip && p.cat === id).length;
  return (
    <div>
      <Toolbar />
      {open && (open.deck ? <Deck p={open} onClose={() => setOpen(null)} /> : <Player p={open} onClose={() => setOpen(null)} />)}
      <section className="dotbg wk-hero" style={{ padding: "150px 40px 40px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <span className="noah-eyebrow">Our portfolio</span>
          <h1 style={{ margin: "16px 0 0", fontWeight: 700, fontSize: "clamp(44px,5.5vw,72px)", letterSpacing: "-.03em", lineHeight: 0.98, color: "var(--blue-600,#08296B)" }}>Selected work<span style={{ color: "var(--noah-yellow,#FFF145)", textShadow: "0 1px 0 rgba(8,41,107,.25)" }}>.</span></h1>
          <p style={{ margin: "12px 0 0", fontFamily: "var(--font-cn-display,'FZLanTing TeHei Bian',sans-serif)", fontSize: 26, color: "var(--grey-500,#858B99)" }}>精选作品</p>
          <div className="wk-cats">
            <button type="button" className={"wk-pill" + (cat === "all" ? " on" : "")} onClick={() => pick("all")}>All<i>{PROJECTS.filter((p) => !p.skip).length}</i></button>
            {CATS.filter((c) => count(c.id) > 0).map((c) => (
              <button type="button" key={c.id} className={"wk-pill" + (cat === c.id ? " on" : "")} onClick={() => pick(c.id)}>{c.en}<i>{count(c.id)}</i></button>
            ))}
          </div>
          {active && active.subs.length > 0 && (
            <div className="wk-subs" key={cat}>
              <span className="wk-subhint"><Icon name="circle-dot" size={14} /></span>
              <button type="button" className={"wk-sub" + (sub === "all" ? " on" : "")} onClick={() => setSub("all")}>All</button>
              {active.subs.map((s) => (
                <button type="button" key={s.id} className={"wk-sub" + (sub === s.id ? " on" : "")} onClick={() => setSub(s.id)}>{s.label}</button>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="wk-body" style={{ padding: "8px 40px 96px", background: "var(--grey-50,#F6F7F9)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          {cat === "ads" ? (
            <div key="ads-clients">
              <h2 className="cl-head">Brands we run ads for<span>Meta · Google · 持续投放与优化</span></h2>
              <div className="cl-grid">
                {CLIENTS.map((c) => (
                  <div className="cl-cell" key={c.src}><img src={c.src} alt={c.name} loading="lazy" /></div>
                ))}
              </div>
            </div>
          ) : (<>
          <div className={"wk-grid" + (cat === "design" ? " wk-grid-2" : "")} key={cat + "/" + sub}>
            {list.map((p) => <WorkCard key={p.id} p={p} showCat={cat === "all"} onOpen={setOpen} />)}
          </div>
          {list.length === 0 && <p style={{ color: "var(--grey-500,#858B99)", fontWeight: 600 }}>Nothing here yet — work is on its way.</p>}
          </>)}
        </div>
      </section>
      <section className="wk-cta-sec" style={{ background: "var(--blue-600,#08296B)", padding: "72px 40px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h2 style={{ margin: 0, fontWeight: 700, fontSize: "clamp(30px,3.6vw,44px)", letterSpacing: "-.03em", color: "#fff" }}>Like what you see?</h2>
            <p style={{ margin: "8px 0 0", fontFamily: "var(--font-cn-mid,'FZLanTing ZhongCuHei',sans-serif)", fontSize: 18, color: "rgba(255,255,255,.65)" }}>跟我们说说你的想法和预算。</p>
          </div>
          <a href="https://wa.me/601113113264" target="_blank" rel="noopener noreferrer" className="wk-cta">Whatsapp DM<Icon name="arrow-up-right" size={18} /></a>
        </div>
      </section>
      <Footer logoSrc="assets/logo-noah-white.png" columns={[{ title: "Work", links: ["Video Production", "Brand Design", "Meta & Google Ads", "Social Media Management"] }, { title: "Connect", links: ["Instagram · noah_creative_studio", "Whatsapp · +601113113264"] }]} address={<>01-03, Wisma LKT,<br />22, Jalan Nadchatiram 1, Taman Taynton View,<br />5600 Cheras, Kuala Lumpur, Malaysia</>} email="+60 11-1311-3264" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WorkPage />);
