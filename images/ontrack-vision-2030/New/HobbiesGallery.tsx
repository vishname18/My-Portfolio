import { useRef, useState, type CSSProperties } from "react";

type Hobby = {
  name: string;
  caption: string;
  gradient: string;
};

const HOBBIES: Hobby[] = [
  {
    name: "BBQ and House Parties",
    caption: "Usually the host",
    gradient: "linear-gradient(135deg, #FF6A00, #FF2D55)",
  },
  {
    name: "Cars",
    caption: "Driving, detailing, photographing",
    gradient: "linear-gradient(135deg, #1a1a2e, #4f46e5)",
  },
  {
    name: "Road Trips",
    caption: "Window down, music up",
    gradient: "linear-gradient(135deg, #FACC15, #FF6A00)",
  },
  {
    name: "Travel",
    caption: "Six countries and counting",
    gradient: "linear-gradient(135deg, #0EA5E9, #8B5CF6)",
  },
  {
    name: "Food",
    caption: "High protein, low calorie - except weekends",
    gradient: "linear-gradient(135deg, #10B981, #FACC15)",
  },
  {
    name: "Family WhatsApp",
    caption: "The loudest one in the group",
    gradient: "linear-gradient(135deg, #EC4899, #F472B6)",
  },
];

export function HobbiesGallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <section className="max-w-[1240px] mx-auto px-6 lg:px-10 py-24 border-t border-rule">
      <div className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground mb-10">
        Hobbies
      </div>
      <div
        ref={sectionRef}
        className="relative"
        onMouseMove={onMove}
        onMouseLeave={() => setHovered(null)}
      >
        <ul className="divide-y divide-rule">
          {HOBBIES.map((h, i) => (
            <li
              key={h.name}
              onMouseEnter={() => setHovered(i)}
              className="group flex items-baseline justify-between gap-6 py-6 cursor-default transition-opacity duration-300"
              style={{
                opacity: hovered === null || hovered === i ? 1 : 0.28,
              }}
            >
              <span className="font-display font-semibold text-[36px] md:text-[56px] lg:text-[72px] leading-[1] tracking-tight">
                {h.name}
              </span>
              <span className="hidden md:inline text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
                {h.caption}
              </span>
            </li>
          ))}
        </ul>

        {/* Floating preview tile */}
        <div
          aria-hidden
          className="pointer-events-none absolute hidden md:block transition-opacity duration-200"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
            opacity: hovered !== null ? 1 : 0,
          }}
        >
          <div
            className="w-[280px] h-[200px] rounded-xl shadow-2xl border border-rule overflow-hidden"
            style={
              {
                background: hovered !== null ? HOBBIES[hovered].gradient : undefined,
                transform: hovered !== null ? "scale(1)" : "scale(0.9)",
                transition: "transform 240ms cubic-bezier(.16,1,.3,1)",
              } as CSSProperties
            }
          >
            <div className="w-full h-full flex items-end p-5 text-white/95">
              <span className="font-display font-semibold text-[22px] leading-tight drop-shadow">
                {hovered !== null ? HOBBIES[hovered].name : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
