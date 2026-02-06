import { ArrowRight } from 'lucide-react'
import { AnimatedItem, AnimatedSection } from './AnimatedSection'

interface Post {
  id: string
  title: string
  date: string
  category: string
  excerpt: string
  slug: string
}

const writings: Post[] = [
  {
    id: '1',
    title: 'The Future of React Server Components',
    date: 'Feb 02, 2026',
    category: 'Engineering',
    excerpt: 'Exploring how RSCs are reshaping the mental model of frontend development and performance.',
    slug: 'react-server-components',
  },
  {
    id: '2',
    title: 'Building Resilient APIs with Go',
    date: 'Jan 15, 2026',
    category: 'Backend',
    excerpt: 'Patterns for error handling, graceful shutdowns, and middleware design in Golang services.',
    slug: 'resilient-apis-go',
  },
  {
    id: '3',
    title: 'Minimalism in Digital Product Design',
    date: 'Dec 10, 2025',
    category: 'Design',
    excerpt: 'Why removing features often adds more value than adding them. A case study on reduction.',
    slug: 'minimalism-design',
  },
]

export default function WritingList() {
  return (
    <AnimatedSection className="flex flex-col space-y-8">
      {writings.map(post => (
        <AnimatedItem
          key={post.id}
          className="block"
        >
          <a
            href={`/blog/${post.slug}`}
            className="group pb-8 border-b border-gray-100 block transition-opacity last:border-0 hover:opacity-70"
          >
            <div className="mb-2 flex flex-col justify-between md:flex-row md:items-baseline">
              <h3 className="text-xl text-gray-900 font-bold transition-colors md:text-2xl group-hover:text-blue-600">
                {post.title}
              </h3>
              <span className="text-sm text-gray-400 font-mono mt-1 shrink-0 md:mt-0">
                {post.date}
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-3 flex gap-3 items-center">
              <span className="text-xs text-gray-600 tracking-wide font-medium px-2 py-0.5 rounded bg-gray-100 uppercase">
                {post.category}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
            <div className="text-sm text-blue-600 font-medium mt-4 opacity-0 flex transition-all duration-300 items-center group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
              Read Article
              {' '}
              <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </a>
        </AnimatedItem>
      ))}
    </AnimatedSection>
  )
}
