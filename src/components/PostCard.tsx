import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface PostCardProps {
  title: string;
  date: string;
  category: string;
  excerpt?: string;
  slug?: string;
}

export default function PostCard({ title, date, category, excerpt, slug }: PostCardProps) {
  const content = (
    <motion.div
      className="group bg-surface border border-border p-6 md:p-8 cursor-pointer relative overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-mono text-accent uppercase tracking-wider border border-accent/20 px-2 py-1 rounded-full">
          {category}
        </span>
        <span className="text-xs font-mono text-graphite">{date}</span>
      </div>

      <h3 className="font-serif text-2xl mb-2 group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>

      {excerpt && (
        <p className="text-graphite text-sm leading-relaxed mb-6 line-clamp-2">
          {excerpt}
        </p>
      )}

      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowUpRight className="w-5 h-5 text-accent" />
      </div>
    </motion.div>
  );

  if (slug) {
    return <a href={`/blog/${slug}`}>{content}</a>;
  }

  return content;
}
