import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Intro" },
  { id: "projects", label: "Projects" },
  { id: "essays", label: "Essays" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const sectionCacheRef = useRef<Array<{ id: string; top: number; bottom: number }>>([]);
  const rafRef = useRef<number>();
  const isInitializedRef = useRef(false);

  // 初始化缓存：仅在组件挂载时计算一次 section 位置
  useEffect(() => {
    const initSectionCache = () => {
      const cache = sections.map((section) => {
        const element = document.getElementById(section.id);
        if (!element) return { id: section.id, top: 0, bottom: 0 };
        return {
          id: section.id,
          top: element.offsetTop,
          bottom: element.offsetTop + element.offsetHeight,
        };
      });
      sectionCacheRef.current = cache;
      isInitializedRef.current = true;
    };

    // 延迟初始化，确保 DOM 已完全加载
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSectionCache);
      return () => document.removeEventListener('DOMContentLoaded', initSectionCache);
    } else {
      initSectionCache();
    }
  }, []);

  // 使用 useCallback 避免在每次渲染时创建新函数
  const handleScroll = useCallback(() => {
    if (!isInitializedRef.current) return;

    // 取消之前的 RAF，避免堆积
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollPosition = window.scrollY + 100;

      // 优化：使用缓存的位置信息，而不是每次都查询 DOM
      for (const section of sectionCacheRef.current) {
        if (scrollPosition >= section.top && scrollPosition < section.bottom) {
          setActiveSection(section.id);
          break;
        }
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  const scrollTo = useCallback((id: string) => {
    const section = sectionCacheRef.current.find((s) => s.id === id);
    if (section) {
      window.scrollTo({
        top: section.top,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 h-screen w-16 md:w-24 hidden md:flex flex-col items-center py-8 z-40 border-r border-border/50">
      <div className="text-xl font-serif font-bold mb-12 tracking-tighter">JL.</div>

      <div className="flex-1 flex flex-col justify-center gap-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group relative flex items-center justify-center w-full"
          >
            <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-ink text-surface text-xs font-mono py-1 px-2 rounded whitespace-nowrap pointer-events-none">
              {section.label}
            </div>

            <motion.div
              animate={{
                height: activeSection === section.id ? 24 : 8,
                backgroundColor: activeSection === section.id ? "var(--color-ink)" : "var(--color-border)",
              }}
              className="w-1 rounded-full transition-colors duration-300"
            />
          </button>
        ))}
      </div>

      <div className="text-xs font-mono text-graphite rotate-180" style={{ writingMode: 'vertical-rl' }}>
        © 2026
      </div>
    </nav>
  );
}
