import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useEffect } from "react";
import heroImg from "@/assets/hero.jpg";
import { MagneticButton } from "@/components/animation/MagneticButton";

function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    const PARTICLE_COUNT = 90;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      alpha: number;
      alphaDir: number;
      alphaSpeed: number;
    };

    let particles: Particle[] = [];

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const initParticle = (): Particle => ({
      x: rand(0, W),
      y: rand(0, H),
      vx: rand(-0.18, 0.18),
      vy: rand(-0.35, -0.08),
      r: rand(0.8, 2.6),
      alpha: rand(0.1, 0.7),
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      alphaSpeed: rand(0.003, 0.009),
    });

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      particles = Array.from({ length: PARTICLE_COUNT }, initParticle);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir * p.alphaSpeed;

        if (p.alpha <= 0.05) { p.alpha = 0.05; p.alphaDir = 1; }
        if (p.alpha >= 0.75) { p.alpha = 0.75; p.alphaDir = -1; }

        if (p.y < -10) { p.y = H + 5; p.x = rand(0, W); }
        if (p.x < -10) { p.x = W + 5; }
        if (p.x > W + 10) { p.x = -5; }

        // draw glowing dot
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grd.addColorStop(0, `oklch(0.78 0.13 85 / ${p.alpha})`);
        grd.addColorStop(0.4, `oklch(0.78 0.13 85 / ${p.alpha * 0.5})`);
        grd.addColorStop(1, `oklch(0.78 0.13 85 / 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // solid core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.88 0.10 85 / ${p.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <img
          src={heroImg}
          alt="Cinematic luxury living room at golden hour"
          width={1920}
          height={1080}
          fetchPriority="high"
          className="h-full w-full scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/50" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_40%,oklch(0.78_0.13_85/0.12),transparent_70%)]" />
      </motion.div>

      {/* Gold particle canvas */}
      {!reduce && <GoldParticles />}

      {/* Content */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-40 pb-32 md:px-10"
      >
        <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
          <span className="h-px w-10 bg-gold" />
          Est. MMXII · Interior Design Atelier
        </p>

        <h1 className="font-display text-4xl leading-[1.0] tracking-tight text-warm-white md:text-5xl lg:text-6xl">
          <span className="block">Spaces that</span>
          <span className="block">
            <span className="font-serif italic text-gold-gradient">whisper</span> luxury.
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-warm-white/70">
          A cinematic interior design studio shaping residences, hospitality and bespoke
          environments for those who demand quiet, considered beauty.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton>
            <Link
              to="/portfolio"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-charcoal transition-all hover:shadow-[0_20px_60px_-20px_oklch(0.78_0.13_85/0.6)]"
            >
              <span className="relative z-10">Explore Portfolio</span>
              <ArrowRight className="relative z-10 size-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-warm-white transition-transform duration-700 group-hover:translate-x-0" />
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <Link
              to="/contact"
              className="inline-block rounded-full border border-warm-white/25 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-warm-white/90 transition-colors hover:border-gold hover:text-gold"
            >
              Book Consultation
            </Link>
          </MagneticButton>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.4em] text-warm-white/50">Scroll</span>
        <ArrowDown className="size-4 animate-bounce text-gold" />
      </div>
    </section>
  );
}
