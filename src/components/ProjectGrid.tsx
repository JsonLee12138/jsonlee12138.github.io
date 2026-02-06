import { useRef } from 'react';
import { memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, ArrowUpRight } from 'lucide-react';
import { AnimatedSection, AnimatedItem } from "./AnimatedSection";

interface Repo {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
}

const projects: Repo[] = [
  {
    name: "hook-fetch",
    description: "A lightweight and modern HTTP request library developed based on the native Fetch API, providing a user-friendly interface similar to Axios.",
    stars: 74,
    language: "TypeScript",
    url: "https://github.com/JsonLee12138/hook-fetch"
  },
  {
    name: "jsonix",
    description: "A web framework for Go like NestJS. Built for scalability and developer experience.",
    stars: 12,
    language: "Go",
    url: "https://github.com/JsonLee12138/jsonix"
  },
  {
    name: "markdown-it-mermaid",
    description: "Plugin for rendering Mermaid diagrams in markdown-it. Write Mermaid code blocks directly in Markdown files.",
    stars: 7,
    language: "JavaScript",
    url: "https://github.com/JsonLee12138/markdown-it-mermaid"
  },
  {
    name: "easy-websocket-client",
    description: "A Socket class for managing WebSocket connections with automatic reconnection and heartbeat messages.",
    stars: 5,
    language: "TypeScript",
    url: "https://github.com/JsonLee12138/easy-websocket-client"
  },
  {
    name: "json-search",
    description: "A custom browser search extension built with Vue.",
    stars: 4,
    language: "Vue",
    url: "https://github.com/JsonLee12138/json-search"
  },
  {
    name: "inspect.dev",
    description: "Web inspection tool wrapper allowing usage without login constraints.",
    stars: 3,
    language: "JavaScript",
    url: "https://github.com/JsonLee12138/inspect.dev"
  }
];

// 优化：使用 memo 避免不必要的重新渲染
// 并自定义比较函数，只在 project 数据改变时重新渲染
const ProjectCard = memo(
  function ProjectCard({ project }: { project: Repo }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rectCache = useRef<DOMRect | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseEnter = () => {
    // 优化：进入时缓存 rect，避免每次鼠标移动都调用 getBoundingClientRect()
    if (ref.current) {
      rectCache.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current || !rectCache.current) return;

    const rect = rectCache.current;
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rectCache.current = null;
  };

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group block bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Cover Image */}
      <div className="h-40 bg-gray-100 relative overflow-hidden">
        <img
          src="/images/project_cover_tech.png"
          alt={project.name}
          className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />

        <div className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
          <ArrowUpRight className="w-4 h-4 text-gray-700" />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 bg-white/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {project.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${
              project.language === 'TypeScript' ? 'bg-blue-500' :
              project.language === 'JavaScript' ? 'bg-yellow-400' :
              project.language === 'Go' ? 'bg-cyan-500' :
              project.language === 'Vue' ? 'bg-green-500' :
              'bg-gray-400'
            }`} />
            <span>{project.language}</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <Star className="w-3.5 h-3.5" />
            <span>{project.stars}</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
});

export default function ProjectGrid() {
  return (
    <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr" style={{ perspective: '1000px' }}>
      {projects.map((project) => (
        <AnimatedItem key={project.name}>
            <ProjectCard project={project} />
        </AnimatedItem>
      ))}
    </AnimatedSection>
  );
}
