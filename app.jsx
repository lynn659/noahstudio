const DS = window.NoahCreativeMarketingStudioDesignSystem_9bf6a7;
const { Footer, Button, Icon, Tag, WaveDivider } = DS;
const { useEffect, useRef, useState } = React;

function Reveal({ children, delay = 0, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className="reveal" style={{ transitionDelay: delay + "ms", ...style }}>{children}</div>;
}

function useClock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kuala_Lumpur", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const SERVICES = ["Video Production", "Brand Design", "Meta & Google Ads", "Social Media Management"];

function Cursor({ name, color }) {
  return (
    <span>
      <svg width="15" height="15" viewBox="0 0 24 24" style={{ display: "block" }}><path d="M5 2.5L19.5 10.5L12.6 12.2L8.8 18.5Z" fill={color} stroke="#fff" strokeWidth="1.4" /></svg>
      <span className="tag" style={{ background: color, display: "inline-block" }}>{name}</span>
    </span>
  );
}

function Handles() {
  return null;
}

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
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}><img src="assets/logo-noah-blue.png" alt="Noah Creative Marketing Studio" style={{ height: 22, width: "auto", display: "block" }} /></a>
        <nav className="tb-nav">
          <a href="#reel" onClick={(e) => { e.preventDefault(); const sec = document.getElementById("reel"); if (!sec) return; const desk = matchMedia("(min-width: 901px)").matches; window.scrollTo({ top: sec.offsetTop + (desk ? 1300 : -70), behavior: "smooth" }); }}>Services</a>
          <a href="#contact">Contact</a>
          <a href="work.html" className="tb-work">Work<span className="tb-arr">↗</span></a>
        </nav>
      </div>
    </header>
  );
}

function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d"), parent = cv.parentElement;
    let raf, W, H, pts = [], dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    const COLORS = ["#4C86F3", "#3D7EF3", "#6FA3F7", "#0A50C8", "#2E71F1"];
    const build = () => {
      W = parent.clientWidth; H = parent.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + "px"; cv.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = []; const gap = 10, cx = W / 2, cy = H / 2;
      const add = (x, y, prob) => { if (Math.random() < prob) pts.push({ ox: x, oy: y, x, y, vx: 0, vy: 0, s: Math.random() < 0.5 ? 1 : Math.random() < 0.8 ? 1.5 : 2, c: COLORS[(Math.random() * COLORS.length) | 0] }); };
      const dist = (x, y) => { const nx = (x - cx) / (W / 2), ny = (y - cy) / (H / 2); return Math.sqrt(nx * nx + ny * ny); };
      for (let y = gap / 2; y < H + gap; y += gap) for (let x = gap / 2; x < W + gap; x += gap) add(x, y, Math.max(0.05, 1.08 - dist(x, y) * 1.05));
      for (let y = gap; y < H + gap; y += gap) for (let x = gap; x < W + gap; x += gap) add(x, y, Math.max(0, 1 - dist(x, y) * 1.7));
    };
    build();
    const ro = new ResizeObserver(build); ro.observe(parent);
    const onMove = (e) => { const b = cv.getBoundingClientRect(); mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    parent.addEventListener("pointermove", onMove); parent.addEventListener("pointerleave", onLeave);
    const R = 130, RR = R * R;
    const draw = () => { ctx.clearRect(0, 0, W, H); for (const p of pts) { ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.2832); ctx.fill(); } };
    const loop = () => {
      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < RR) { const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 5; p.vx += dx / d * f; p.vy += dy / d * f; }
        p.vx += (p.ox - p.x) * 0.02; p.vy += (p.oy - p.y) * 0.02;
        p.vx *= 0.88; p.vy *= 0.88; p.x += p.vx; p.y += p.vy;
      }
      draw(); raf = requestAnimationFrame(loop);
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) draw(); else loop();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); parent.removeEventListener("pointermove", onMove); parent.removeEventListener("pointerleave", onLeave); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, zIndex: 1 }}></canvas>;
}

function Manifesto() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const rows = el.querySelectorAll(".mf-line");
    const pill = el.querySelector(".mf-pill");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(max-width: 900px)").matches) { rows.forEach((r) => { r.style.transform = "none"; }); pill.style.transform = "rotate(-2deg)"; return; }
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const SEG = [[-0.2, 0.08], [0.12, 0.34]];
    const DROP = [0.4, 0.52];
    const on = () => {
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const q = Math.max(-0.45, Math.min(1, -r.top / (r.height - vh)));
      rows.forEach((row, i) => {
        const [a, b] = SEG[i];
        const t = Math.max(0, Math.min(1, (q - a) / (b - a)));
        row.style.transform = "translateX(" + ((1 - ease(t)) * window.innerWidth * 1.05).toFixed(1) + "px)";
      });
      const td = (q - DROP[0]) / (DROP[1] - DROP[0]);
      if (td < 1) {
        pill.classList.remove("landed");
        const e = Math.max(0, td) * Math.max(0, td);
        pill.style.transform = "translateY(" + (-(1 - e) * 115).toFixed(2) + "vh) rotate(" + (3 - 5 * Math.max(0, td)).toFixed(2) + "deg)";
      } else if (!pill.classList.contains("landed")) {
        pill.style.transform = "translateY(0) rotate(-2deg)";
        pill.classList.add("landed");
      }
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  return (
    <section ref={ref} className="mf dotbg">
      <div className="mf-pin">
        <div className="mf-line mf-sm"><span>We don't make things</span><span>just to look good.</span></div>
        <div className="mf-line mf-l2">We find the direction first.
          <span className="mf-pill"><span>Strategy</span><span className="mf-arr">→</span><span>Creativity</span><span className="mf-arr">→</span><span>Impact</span></span>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  const txtRef = useRef(null);
  const fieldRef = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const f = fieldRef.current, sec = f.parentElement;
    let mx = 0, my = 0, cx = 0, cy = 0, px = -9999, py = -9999, wx = 0, wy = 0, raf;
    const onMove = (e) => { const b = sec.getBoundingClientRect(); mx = ((e.clientX - b.left) / b.width - 0.5) * 2; my = ((e.clientY - b.top) / b.height - 0.5) * 2; px = e.clientX; py = e.clientY; };
    const onLeave = () => { mx = 0; my = 0; px = -9999; py = -9999; };
    sec.addEventListener("pointermove", onMove); sec.addEventListener("pointerleave", onLeave);
    const loop = () => {
      const el = txtRef.current;
      const h = f.clientHeight || 600;
      const p = Math.max(0, Math.min(1, window.scrollY / (h * 0.7)));
      const fb = f.getBoundingClientRect();
      const dx = fb.left + fb.width / 2 - px, dy = fb.top + fb.height / 2 - py;
      const d = Math.hypot(dx, dy) || 1, R = 340;
      let tgx = 0, tgy = 0;
      if (d < R) { const fo = (1 - d / R) * 26; tgx = dx / d * fo; tgy = dy / d * fo; }
      wx += (tgx - wx) * 0.09; wy += (tgy - wy) * 0.09;
      if (el) { el.style.transform = "translate(" + wx.toFixed(2) + "px," + (-70 * p + wy).toFixed(2) + "px) scale(" + (1 - p * 0.15) + ")"; }
      cx += (mx - cx) * 0.08; cy += (my - cy) * 0.08;
      f.style.transform = "scale(" + (1 + p * 0.06) + ") rotateX(" + (-cy * 2.6).toFixed(3) + "deg) rotateY(" + (cx * 2.6).toFixed(3) + "deg)";
      f.style.filter = "brightness(" + (1 - p * 0.38) + ")";
      const fo = Math.max(0, Math.min(1, (window.scrollY - window.innerHeight * 0.55) / (window.innerHeight * 0.3)));
      f.style.opacity = String(1 - fo);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); sec.removeEventListener("pointermove", onMove); sec.removeEventListener("pointerleave", onLeave); };
  }, []);
  return (
    <section className="dotbg hero-pin">
      <div className="hero-field" ref={fieldRef} style={{ willChange: "transform,filter" }}>
        <ParticleField />
        <div ref={txtRef} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", zIndex: 4, pointerEvents: "none", willChange: "transform,opacity" }}>
          <h1 className="hero-title">WE'RE NOAH<span style={{ color: "var(--noah-yellow,#FFF145)" }}>.</span></h1>
          <div className="hero-sub" style={{ marginTop: 24 }}>
            {SERVICES.map((s, i) => (
              <React.Fragment key={s}>
                {i > 0 && <span className="dot"></span>}
                <span>{s}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
        <a className="hero-down" href="#manifesto" aria-label="Scroll down" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: window.innerHeight * 0.92, behavior: "smooth" }); }}>
          <span className="hd-ring r1"></span>
          <span className="hd-ring r2"></span>
          <svg className="hd-dart" viewBox="0 0 100 136" width="26" height="35" aria-hidden="true"><path d="M2 2 L50 26 L98 2 Q78 70 53 133 Q26 68 2 2 Z" fill="currentColor" /></svg>
        </a>
      </div>
    </section>
  );
}

function Marquee() {
  const run = [];
  for (let r = 0; r < 4; r++) SERVICES.forEach((s, i) => run.push(
    <span key={r + "-" + i} className="mq-pill">{s}</span>
  ));
  return (
    <div className="marquee-band">
      <div className="marquee-track">{run}</div>
    </div>
  );
}

function Showcase() {
  const secRef = useRef(null), stageRef = useRef(null), frameRef = useRef(null), vidRef = useRef(null), bgRef = useRef(null), galRef = useRef(null), curRef = useRef(null), labRef = useRef(null);
  useEffect(() => {
    const sec = secRef.current, stage = stageRef.current, frame = frameRef.current, vid = vidRef.current, bg = bgRef.current, gal = galRef.current, cur = curRef.current, lab = labRef.current;
    const pin = stage.parentElement;
    const tiles = Array.prototype.slice.call(gal.children);
    let raf = 0;
    const HOLD = 260, RANGE = 920, GAP = 20;
    const ease = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const apply = () => {
      raf = 0;
      const mobile = matchMedia("(max-width: 900px)").matches;
      if (mobile) {
        stage.style.transform = "";
        frame.style.cssText = "";
        tiles.forEach((c) => { c.style.cssText = ""; });
        return;
      }
      const sRect = stage.getBoundingClientRect(), w = sRect.width, h = stage.offsetHeight;
      const iw = window.innerWidth, ih = window.innerHeight;
      const u = -sec.getBoundingClientRect().top;
      const t = Math.max(0, Math.min(1, (u - HOLD) / RANGE));
      const e = ease(t);
      const H2 = h * .92, vw2 = H2 * 9 / 16, wl = (w - vw2 - GAP * 2) / 2, tTop = (h - H2) / 2;
      const vx = wl + GAP + 30, vy = tTop + 128, vwid = vw2 - 60, vht = H2 - 158;
      const x0 = -(iw - w) / 2, y0 = -stage.offsetTop;
      const fw = iw + (vwid - iw) * e, fh = ih + (vht - ih) * e;
      const fl = x0 * (1 - e) + vx * e;
      const fy = y0 * (1 - e) + vy * e;
      frame.style.width = fw.toFixed(2) + "px"; frame.style.height = fh.toFixed(2) + "px";
      frame.style.transform = "translate(" + fl.toFixed(2) + "px," + fy.toFixed(2) + "px)";
      frame.style.borderRadius = (20 * e).toFixed(1) + "px";
      const ready = e > .98;
      if (frame.classList.contains("ready") !== ready) { frame.classList.toggle("ready", ready); if (!ready) cur.classList.remove("on"); }
      const cin = Math.max(0, Math.min(1, (t - .45) / .45));
      bg.style.opacity = Math.max(0, Math.min(1, (t - .3) / .5)).toFixed(3);
      const geo = [
        { x: 0, y: tTop, w: wl, h: H2, dx: -180, dy: 0, s: .08 },
        { x: wl + GAP, y: tTop, w: vw2, h: H2, dx: 0, dy: 90, s: 0 },
        { x: wl + GAP * 2 + vw2, y: tTop, w: wl, h: (H2 - GAP) / 2, dx: 180, dy: 0, s: .16 },
        { x: wl + GAP * 2 + vw2, y: tTop + (H2 + GAP) / 2, w: wl, h: (H2 - GAP) / 2, dx: 180, dy: 0, s: .24 }
      ];
      tiles.forEach((c, i) => {
        const g = geo[i];
        let p = Math.max(0, Math.min(1, (cin - g.s) / .4));
        if (p > .94) p = 1;
        c.style.width = g.w.toFixed(2) + "px"; c.style.height = g.h.toFixed(2) + "px";
        c.style.opacity = p.toFixed(3);
        c.style.transform = "translate(" + (g.x + (1 - p) * g.dx).toFixed(2) + "px," + (g.y + (1 - p) * g.dy).toFixed(2) + "px)";
        c.style.pointerEvents = p > .9 ? "auto" : "none";
      });
    };
    const layout = () => { apply(); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { vid.play().catch(() => {}); } else { vid.pause(); } }, { threshold: 0.02 });
    io.observe(frame);
    let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty, curRaf = 0;
    const loop = () => { cx += (tx - cx) * .16; cy += (ty - cy) * .16; cur.style.transform = "translate(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px)"; curRaf = requestAnimationFrame(loop); };
    const mm = (ev) => { tx = ev.clientX; ty = ev.clientY; };
    const CUR_CLS = { "video works": "gc-yellow", "ads works": "gc-grey", "design works": "gc-blue", "social media works": "gc-black" };
    const over = (ev) => { const el = ev.target.closest("[data-cat]"); if (!el) return; if (el === frame && !frame.classList.contains("ready")) return; lab.textContent = "View " + el.getAttribute("data-cat"); cur.classList.remove("gc-yellow", "gc-grey", "gc-blue", "gc-black"); const cc = CUR_CLS[el.getAttribute("data-cat")]; if (cc) cur.classList.add(cc); cur.classList.add("on"); };
    const out = (ev) => { const el = ev.target.closest("[data-cat]"); if (el && !el.contains(ev.relatedTarget)) cur.classList.remove("on"); };
    const CAT_ID = { "video works": "video", "ads works": "ads", "design works": "design", "social media works": "social" };
    const go = (ev) => { const el = ev.target.closest("[data-cat]"); if (!el) return; const mobile = matchMedia("(max-width: 900px)").matches; if (el === frame && !mobile && !frame.classList.contains("ready")) return; const id = CAT_ID[el.getAttribute("data-cat")]; if (id) window.location.href = "work.html#" + id; };
    stage.addEventListener("click", go);
    stage.addEventListener("mousemove", mm);
    stage.addEventListener("mouseover", over);
    stage.addEventListener("mouseout", out);
    tiles.forEach((tile, ti) => {
      if (ti === 1) return;
      const inner = tile.querySelector(".gt-in");
      tile.addEventListener("mousemove", (ev) => {
        const r = tile.getBoundingClientRect();
        const rx = ((ev.clientY - r.top) / r.height - .5) * -10;
        const ry = ((ev.clientX - r.left) / r.width - .5) * 12;
        inner.style.transform = "rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg) translateZ(12px)";
      });
      tile.addEventListener("mouseleave", () => { inner.style.transform = ""; });
    });
    curRaf = requestAnimationFrame(loop);
    layout();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    return () => { io.disconnect(); cancelAnimationFrame(curRaf); stage.removeEventListener("click", go); stage.removeEventListener("mousemove", mm); stage.removeEventListener("mouseover", over); stage.removeEventListener("mouseout", out); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", layout); };
  }, []);
  return (
    <section ref={secRef} id="reel" className="reel-sec">
      <div className="reel-pin">
        <div className="reel-bg" ref={bgRef}></div>
        <div ref={stageRef} className="reel-stage">
          <div ref={galRef} className="gal">
            <div className="gal-tile gt-black" data-cat="ads works"><div className="gt-in"><h3 className="gt-title">Meta & Google Ads Management</h3><p className="gt-desc">Paid creative that earns its budget across Meta and Google.</p><div className="gt-stack"><img className="gt-ad a1" src="assets/ads-ref-1.png" alt="Facebook ad" /><img className="gt-ad a3" src="assets/ads-ref-3.jpeg" alt="Google search ad" /><img className="gt-ad a2" src="assets/ads-ref-2.png" alt="Instagram ad" /></div></div></div>
            <div className="gal-tile gt-ink" data-cat="video works"><div className="gt-in"><h3 className="gt-title">Video</h3><p className="gt-desc">Reels, brand films and campaign cuts — shot and edited in-house.</p></div></div>
            <div className="gal-tile gt-blue" data-cat="design works"><div className="gt-in"><h3 className="gt-title">Design</h3><p className="gt-desc">Identity, key visuals and layouts that survive every format.</p><div className="gt-stack"><img className="gt-under d1" src="assets/design-namecard.png" alt="My Enak name card" /><img className="gt-logo l1" src="assets/design-logo-1.png" alt="Sleep Inc logo" /><img className="gt-logo l2" src="assets/design-logo-2.png" alt="Hopereno logo" /></div></div></div>
            <div className="gal-tile gt-grey" data-cat="social media works"><div className="gt-in"><h3 className="gt-title">Social media</h3><p className="gt-desc">Always-on content, planned and written bilingually.</p><div className="gt-stack"><img className="gt-sm s1" src="assets/sm-1.jpeg" alt="3G Auto post" /><img className="gt-sm s2" src="assets/sm-2.jpeg" alt="Cheras property post" /><img className="gt-sm s3" src="assets/sm-3.jpeg" alt="Confinement vlog post" /><img className="gt-sm s4" src="assets/sm-4.jpeg" alt="Bestie experience post" /></div></div></div>
          </div>
          <div className="reel-frame" data-cat="video works" ref={frameRef}>
            <video ref={vidRef} src="assets/reel-pokemon.mp4" muted loop playsInline preload="auto"></video>
            <div className="reel-cap"><h3 className="gt-title">Video</h3><p className="gt-desc">Reels, brand films and campaign cuts — shot and edited in-house.</p></div>
          </div>
        </div>
      </div>
      <div className="gal-cursor" ref={curRef}><span className="gc-in"><b ref={labRef}></b></span></div>
    </section>
  );
}

const WORK = [
  { id: "w1", f: "film", title: "Film", cn: "影片", h: 560, pin: true },
  { id: "w2", f: "xhs", title: "Xiaohongshu", cn: "小红书", h: 400 },
  { id: "w3", f: "ads", title: "Advertisement", cn: "广告", h: 420 },
  { id: "w4", f: "branding", title: "Branding", cn: "品牌", h: 560 },
  { id: "w5", f: "product", title: "Product shoot", cn: "产品拍摄", h: 480 },
];

function WorkCard({ w, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="wcard">
        <div className="whead" style={{ justifyContent: "flex-end" }}>
          <Tag>{w.cn}</Tag>
        </div>
        <div className="wtile" style={{ height: w.h }}>
          <image-slot id={w.id} shape="rounded" radius="20" placeholder={"Drop work — " + w.cn} style={{ width: "100%", height: "100%" }}></image-slot>
          <div className="go"><Icon name="arrow-up-right" size={20} /></div>
        </div>
        <div className="wmeta">
          <div>
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, color: "var(--blue-600,#08296B)" }}>{w.title}</h3>
            <p style={{ margin: "2px 0 0", fontFamily: "var(--font-cn-text,'FZLanTing ZhunHei',sans-serif)", fontSize: 14, color: "var(--grey-500,#858B99)" }}>{w.cn}</p>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--grey-400,#AFB4BF)" }}>2026</span>
        </div>
      </div>
    </Reveal>
  );
}

function Work() {
  const colA = [WORK[0], WORK[2], WORK[4]];
  const colB = [WORK[1], WORK[3]];
  return (
    <section id="work" style={{ padding: "96px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <span className="noah-eyebrow">Selected work</span>
              <p style={{ margin: "12px 0 0", fontFamily: "var(--font-cn-display,'FZLanTing TeHei Bian',sans-serif)", fontSize: 26, color: "var(--grey-500,#858B99)" }}>精选作品</p>
            </div>
          </div>
        </Reveal>
        <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)", gap: "72px 32px", marginTop: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 72, minWidth: 0 }}>
            {colA.map((w, i) => <WorkCard key={w.id} w={w} delay={i * 80} />)}
          </div>
          <div className="work-col-b" style={{ display: "flex", flexDirection: "column", gap: 72, marginTop: 96, minWidth: 0 }}>
            {colB.map((w, i) => <WorkCard key={w.id} w={w} delay={i * 80 + 40} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

const SROWS = [
  { n: "01", en: "Video production", cn: "影片 · 短视频制作", chips: ["Direction", "Shoot", "Edit"] },
  { n: "02", en: "Brand design", cn: "品牌设计", chips: ["Logo", "Identity", "Guidelines"] },
  { n: "03", en: "Meta & Google Ads", cn: "广告投放", chips: ["Creative", "Media buy", "Report"] },
  { n: "04", en: "Social media management", cn: "社媒代运营", chips: ["Calendar", "Content", "Community"] },
];

function Services() {
  return (
    <section id="services" className="dotbg" style={{ padding: "96px 40px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal>
          <span className="noah-eyebrow">What we do</span>
          <h2 style={{ margin: "12px 0 0", fontWeight: 700, fontSize: 48, lineHeight: 1.08, letterSpacing: "-.03em", color: "var(--blue-600,#08296B)" }}>Four ways in</h2>
          <p style={{ margin: "8px 0 0", fontFamily: "var(--font-cn-display,'FZLanTing TeHei Bian',sans-serif)", fontSize: 26, color: "var(--grey-500,#858B99)" }}>服务范围</p>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ marginTop: 48, borderBottom: "1px solid var(--grey-200,#E4E6EA)" }}>
            {SROWS.map((s) => (
              <div key={s.n} className="srow">
                <span className="num">{s.n}</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: "var(--blue-600,#08296B)" }}>{s.en}</h3>
                  <p style={{ margin: "3px 0 0", fontFamily: "var(--font-cn-text,'FZLanTing ZhunHei',sans-serif)", fontSize: 14, color: "var(--grey-500,#858B99)" }}>{s.cn}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div className="chips">{s.chips.map((c) => <Tag key={c}>{c}</Tag>)}</div>
                  <span className="arr"><Icon name="arrow-up-right" size={18} /></span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTA({ clock }) {
  return (
    <section id="contact" className="cta-sec" style={{ background: "var(--blue-600,#08296B)", padding: "88px 40px 32px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}>Have an idea worth building?</span>
            <h2 style={{ margin: "14px 0 0", fontWeight: 700, fontSize: "clamp(36px,4.5vw,56px)", letterSpacing: "-.03em", lineHeight: 1.04, color: "#fff" }}>Contact us now.</h2>
            <p style={{ margin: "10px 0 0", fontFamily: "var(--font-cn-mid,'FZLanTing ZhongCuHei',sans-serif)", fontSize: 20, color: "rgba(255,255,255,.65)" }}>跟我们说说你的想法和预算。</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
            <a href="https://wa.me/601113113264" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}><Button size="lg" variant="inverse">Whatsapp DM</Button></a>
          </div>
        </div>
        <div style={{ marginTop: 72, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.14)", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.45)" }}>
          <span>Noah Creative Marketing Studio</span>
        </div>
      </div>
    </section>
  );
}


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

function App() {
  useFooterLinks();

  const clock = useClock();
  return (
    <div>
      <Toolbar />
      <Hero />
      <Manifesto />
      <Showcase />
      <CTA clock={clock} />
      <Footer logoSrc="assets/logo-noah-white.png" columns={[{ title: "Work", links: SERVICES }, { title: "Connect", links: ["Instagram · noah_creative_studio", "Whatsapp · +601113113264"] }]} address={<>01-03, Wisma LKT,<br />22, Jalan Nadchatiram 1, Taman Taynton View,<br />5600 Cheras, Kuala Lumpur, Malaysia</>} email="+60 11-1311-3264" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
