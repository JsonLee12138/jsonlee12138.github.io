import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  // 优化：使用 useSpring 配置更好的弹簧参数，提升流畅度
  // mass 减小 (default 1) -> 响应更快
  // tension 增加 (default 280) -> 更紧凑
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,      // ↑ 增加硬度，响应更快
    damping: 50,         // ↓ 增加阻尼，避免过度振荡
    mass: 0.5,           // ↓ 降低质量，反应更敏捷
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
      style={{ scaleX }}
    />
  );
}

export default ReadingProgress;
