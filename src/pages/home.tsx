import { createSignal } from "solid-js";
import { createSignal, onMount, onCleanup, For } from "solid-js";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  symbol: string;
  rotation: number;
  rotSpeed: number;
  life: number;
  maxLife: number;
}

const SOCIALS = [
  {
    name: "Roblox",
    href: "https://www.roblox.com/users/profile",
    color: "#e8483e",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4.597 4.823L7.17 19.202l14.233-3.797-2.573-14.38zM13.75 13.97l-3.91 1.044-.99-5.533 3.91-1.044z"/></svg>`,
  },
  {
    name: "GitHub",
    href: "https://github.com",
    color: "#8b949e",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
  },
  {
    name: "Discord",
    href: "https://discord.com",
    color: "#5865f2",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.037.056a19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>`,
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com",
    color: "#1db954",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
  },
  {
    name: "X / Twitter",
    href: "https://x.com",
    color: "#e7e9ea",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  },
];

const SKILLS = [
  { name: "Gameplay Systems", level: 97, desc: "Combat, physics, core loops" },
  { name: "UI/UX Engineering", level: 94, desc: "Responsive, animated interfaces" },
  { name: "Multiplayer Architecture", level: 96, desc: "RemoteEvents, state sync, lag comp" },
  { name: "Luau / TypeScript", level: 98, desc: "Typed, clean, scalable code" },
  { name: "Performance Optimization", level: 91, desc: "Profiling, LOD, memory mgmt" },
  { name: "World & Systems Design", level: 88, desc: "Economy, progression, feel" },
];

const ROBLOX_LOGO_SVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(-14, 50, 50)">
    <rect x="12" y="12" width="76" height="76" rx="8" fill="currentColor"/>
    <rect x="26" y="26" width="22" height="22" rx="4" fill="#070709"/>
    <rect x="52" y="26" width="22" height="22" rx="4" fill="#070709"/>
    <rect x="26" y="52" width="22" height="22" rx="4" fill="#070709"/>
    <rect x="52" y="52" width="22" height="22" rx="4" fill="#070709"/>
  </g>
</svg>`;

const ARROW_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path d="M7 17L17 7M17 7H7M17 7v10" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export default function Home() {
  const [count, setCount] = createSignal(0);
  const [musicPlaying, setMusicPlaying] = createSignal(false);
  const [loaded, setLoaded] = createSignal(false);
  const [hovering, setHovering] = createSignal(false);

  let canvasRef: HTMLCanvasElement | undefined;
  let cursorDotRef: HTMLDivElement | undefined;
  let cursorGlowRef: HTMLDivElement | undefined;
  let audioHandle: { stop: () => void } | null = null;

  onMount(() => {
    // Slight delay so CSS transition fires visibly
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setLoaded(true));
    });

    initCursor();
    initParticles();
    initScrollReveal();
    initParallax();
    initHoverTracking();
  });

  function initCursor() {
    const dot = cursorDotRef!;
    const glow = cursorGlowRef!;
    let glowX = window.innerWidth / 2;
    let glowY = window.innerHeight / 2;
    let targetX = glowX;
    let targetY = glowY;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    };

    function lerpGlow() {
      glowX += (targetX - glowX) * 0.075;
      glowY += (targetY - glowY) * 0.075;
      glow.style.transform = `translate(calc(${glowX}px - 50%), calc(${glowY}px - 50%))`;
      rafId = requestAnimationFrame(lerpGlow);
    }

    window.addEventListener("mousemove", onMove);
    lerpGlow();

    onCleanup(() => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    });
  }

  function initHoverTracking() {
    const onEnter = () => {
      setHovering(true);
    };
    const onLeave = () => {
      setHovering(false);
    };
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    onCleanup(() => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    });
  }

  function initParticles() {
    const canvas = canvasRef!;
    const ctx = canvas.getContext("2d")!;
    const SYMBOLS = ["$", "£", "€", "¥", "₿", "◆", "▲", "◇", "△", "⬡", "◈"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    function makeParticle(): Particle {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 30,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -(Math.random() * 0.55 + 0.18),
        size: Math.random() * 13 + 6,
        opacity: 0,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.014,
        life: 0,
        maxLife: Math.random() * 320 + 220,
      };
    }

    const particles: Particle[] = Array.from({ length: 38 }, () => {
      const p = makeParticle();
      p.y = Math.random() * canvas.height;
      p.life = Math.floor(Math.random() * p.maxLife);
      return p;
    });

    let rafId: number;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particles.length < 50) particles.push(makeParticle());

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        const half = p.maxLife / 2;
        p.opacity =
          p.life < half
            ? (p.life / half) * 0.17
            : ((p.maxLife - p.life) / half) * 0.17;

        if (p.life >= p.maxLife || p.y < -40) {
          particles.splice(i, 1, makeParticle());
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = "#c4993a";
        ctx.font = `${p.size}px 'Cinzel', serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener("resize", resize);

    onCleanup(() => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    });
  }

  function initScrollReveal() {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    onCleanup(() => io.disconnect());
  }

  function initParallax() {
    const onMove = (e: MouseEvent) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      document.querySelectorAll<HTMLElement>(".parallax-layer").forEach((el, i) => {
        const depth = (i + 1) * 6;
        el.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    onCleanup(() => window.removeEventListener("mousemove", onMove));
  }

  function toggleMusic() {
    if (musicPlaying()) {
      audioHandle?.stop();
      audioHandle = null;
      setMusicPlaying(false);
      return;
    }

    const audioCtx = new AudioContext();
    const master = audioCtx.createGain();
    master.gain.setValueAtTime(0, audioCtx.currentTime);
    master.gain.linearRampToValueAtTime(0.055, audioCtx.currentTime + 3.5);
    master.connect(audioCtx.destination);

    // Am pentatonic drone – four detuned layers for warmth
    const freqGroups = [
      [110, 110.4],
      [165, 164.7],
      [220, 220.6],
      [330, 329.5],
      [440, 440.8],
    ];

    const oscs = freqGroups.flatMap(([f1, f2]) => {
      return [f1, f2].map((freq) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        const lp = audioCtx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 600;
        lp.Q.value = 0.5;
        osc.type = "sine";
        osc.frequency.value = freq;
        gainNode.gain.value = 0.18 / freqGroups.length;
        osc.connect(lp);
        lp.connect(gainNode);
        gainNode.connect(master);
        osc.start();
        return osc;
      });
    });

    audioHandle = {
      stop: () => {
        master.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2.2);
        setTimeout(() => {
          oscs.forEach((o) => {
            try {
              o.stop();
            } catch {}
          });
          audioCtx.close();
        }, 2400);
      },
    };

    setMusicPlaying(true);
  }

  const PAUSE_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;
  const PLAY_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 5.14v14l11-7-11-7z"/></svg>`;

  return (
    <section class="bg-slate-200 text-slate-700 p-8 rounded-md">
      <h2 class="text-2xl">Home</h2>
      <p class="mt-4">This is the home page.</p>
    <>
      {/* Cursor */}
      <div
        ref={cursorDotRef}
        class={`cursor-dot${hovering() ? " is-hovering" : ""}`}
      />
      <div ref={cursorGlowRef} class="cursor-glow" />

      <div class="flex items-center space-x-2 mt-4">
        <button
          type="button"
          class="border rounded-lg px-2 border-slate-900"
          onClick={() => setCount(count() - 1)}
        >
          -
        </button>
      {/* Particle field */}
      <canvas ref={canvasRef} class="particles-canvas" />

      {/* ── Main portfolio ─────────────────────────── */}
      <div class={`portfolio${loaded() ? " portfolio--loaded" : ""}`}>

        {/* ── HERO ─────────────────────────────────── */}
        <section class="hero">
          <div class="hero__bg">
            <div class="parallax-layer hero__light-1" />
            <div class="parallax-layer hero__light-2" />
            <div class="parallax-layer hero__light-3" />
            <div class="hero__grid" />
          </div>

        <output class="p-10px">Count: {count()}</output>
          <div class="hero__content">
            {/* Badge */}
            <div class="hero__badge">
              <span class="hero__badge-dot" />
              <span>Available for work</span>
            </div>

            {/* Name */}
            <h1 class="hero__name">Knckles</h1>

            {/* Roblox logo */}
            <div class="hero__logo-wrap">
              <div
                class="hero__roblox-logo"
                innerHTML={ROBLOX_LOGO_SVG}
                title="Roblox Developer"
              />
            </div>

            {/* Subtitle */}
            <p class="hero__sub">
              Elite Roblox gameplay engineer crafting{" "}
              <em>combat systems</em>, <em>multiplayer architecture</em>,{" "}
              <em>immersive UI</em>, and experiences that feel{" "}
              <em>alive</em>.
            </p>

            {/* Socials */}
            <div class="socials">
              <For each={SOCIALS}>
                {(s) => (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-btn"
                    style={{ "--accent": s.color }}
                  >
                    <span class="social-btn__icon" innerHTML={s.icon} />
                    <span class="social-btn__label">{s.name}</span>
                    <span class="social-btn__glow" />
                  </a>
                )}
              </For>
            </div>

            {/* Scroll hint */}
            <div class="hero__scroll">
              <span>scroll</span>
              <div class="hero__scroll-line" />
            </div>
          </div>
        </section>

        {/* ── SKILLS ───────────────────────────────── */}
        <section class="skills-section">
          <div class="section-label reveal">Expertise</div>
          <h2 class="section-title reveal">Craft &amp; Discipline</h2>
          <div class="skills-grid">
            <For each={SKILLS}>
              {(skill) => (
                <div
                  class="skill-card reveal"
                  style={{ "--w": `${skill.level}%` }}
                >
                  <div class="skill-card__top">
                    <span class="skill-card__name">{skill.name}</span>
                    <span class="skill-card__level">{skill.level}</span>
                  </div>
                  <div class="skill-card__bar">
                    <div class="skill-card__fill" />
                  </div>
                  <p class="skill-card__desc">{skill.desc}</p>
                </div>
              )}
            </For>
          </div>
        </section>

        {/* ── WORK ─────────────────────────────────── */}
        <section class="work-section">
          <div class="section-label reveal">Selected Work</div>
          <h2 class="section-title reveal">Projects</h2>

          <div class="work-grid">
            {/* Large card */}
            <div class="work-card work-card--large reveal">
              <div class="work-card__glow" />
              <div class="work-card__corner" innerHTML={ARROW_SVG} />
              <div class="work-card__tag">Flagship Experience</div>
              <h3 class="work-card__title">Midnight Arena</h3>
              <p class="work-card__desc">
                A ranked PvP experience with custom hitbox detection, server-authoritative
                combat, and 120fps-optimized animation blending. Every mechanic
                engineered for feel-first gameplay.
              </p>
              <div class="work-card__stats">
                <span>
                  <strong>4.2M</strong> visits
                </span>
                <span>
                  <strong>94%</strong> rating
                </span>
                <span>
                  <strong>Luau</strong>
                </span>
                <span>
                  <strong>TypeScript</strong>
                </span>
              </div>
            </div>

            {/* Small card 1 */}
            <div class="work-card reveal">
              <div class="work-card__glow" />
              <div class="work-card__corner" innerHTML={ARROW_SVG} />
              <div class="work-card__tag">UI Framework</div>
              <h3 class="work-card__title">VaultOS</h3>
              <p class="work-card__desc">
                Full inventory and economy interface. Handles 10k+ concurrent
                sessions without jank.
              </p>
              <div class="work-card__stats">
                <span>
                  <strong>Open Source</strong>
                </span>
                <span>
                  <strong>TS</strong>
                </span>
              </div>
            </div>

            {/* Small card 2 */}
            <div class="work-card reveal">
              <div class="work-card__glow" />
              <div class="work-card__corner" innerHTML={ARROW_SVG} />
              <div class="work-card__tag">Co-op Multiplayer</div>
              <h3 class="work-card__title">Heist Protocol</h3>
              <p class="work-card__desc">
                Co-op stealth. Custom interpolation, zero desync, server-auth
                state machine.
              </p>
              <div class="work-card__stats">
                <span>
                  <strong>1.8M</strong> visits
                </span>
                <span>
                  <strong>91%</strong> rating
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── QUOTE ────────────────────────────────── */}
        <section class="quote-section">
          <div class="quote-card reveal">
            <div class="quote-mark">"</div>
            <blockquote>
              Every frame is a contract with the player.
              <br />
              Break it and they leave. Honor it and they stay forever.
            </blockquote>
            <cite>— on game feel</cite>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────── */}
        <footer class="footer">
          <div class="footer__name">KNCKLES</div>
          <div class="footer__line" />
          <div class="footer__copy">
            Available for contracts &amp; collaborations
          </div>
        </footer>
      </div>

      {/* ── MUSIC PLAYER ─────────────────────────── */}
      <div class={`music-player${musicPlaying() ? " music-player--active" : ""}`}>
        <button
          type="button"
          class="border rounded-lg px-2 border-slate-900"
          onClick={() => setCount(count() + 1)}
        >
          +
        </button>
          class="music-player__btn"
          onClick={toggleMusic}
          aria-label={musicPlaying() ? "Pause music" : "Play ambient music"}
          innerHTML={musicPlaying() ? PAUSE_ICON : PLAY_ICON}
        />
        <div class="music-player__info">
          <div class="music-player__track">Late Night Sessions</div>
          <div class="music-player__artist">Ambient · Procedural</div>
        </div>
        <div class="music-player__bars">
          {[1, 2, 3, 4, 5].map((i) => (
            <div class="music-player__bar" style={{ "--i": i }} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
