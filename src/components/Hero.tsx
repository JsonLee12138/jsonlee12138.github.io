import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Scene from './Scene'

// @unocss-include
export default function Hero() {
  const scrollToNext = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="py-20 rounded flex flex-col min-h-screen justify-center relative overflow-hidden md:py-0">
      {/* 3D Background Scene */}
      <Scene />

      <div className="mx-auto px-4 max-w-6xl w-full relative z-10 md:px-8">
        <div className="gap-12 grid grid-cols-1 items-center md:grid-cols-2">

          {/* Left Column: Text */}
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="text-lg text-blue-600 tracking-wide font-mono mb-6 block">Hi, I'm Json Lee.</span>
              <h1 className="text-5xl text-gray-900 leading-[1.1] tracking-tight font-bold font-serif mb-8 lg:text-8xl md:text-7xl md:leading-[1]">
                Building digital
                {' '}
                <br />
                <span className="text-gray-500 font-light italic">experiences</span>
                {' '}
                that matter.
              </h1>
            </motion.div>

            <motion.div
              className="flex flex-col gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl md:text-xl">
                I'm a creative developer and open source enthusiast focusing on design systems,
                frontend architecture, and building tools that developers love.
              </p>

              <div className="flex flex-wrap gap-4 items-center md:gap-6">
                <a
                  href="#projects"
                  className="text-white font-medium px-6 py-3 rounded-lg bg-gray-900 flex gap-2 transition-colors items-center hover:bg-gray-800"
                >
                  View Projects
                  {' '}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com/JsonLee12138"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 font-medium px-6 py-3 border border-gray-200 rounded-lg bg-white/50 flex gap-2 transition-all items-center backdrop-blur-sm hover:border-gray-400 hover:bg-white"
                >
                  <Icon icon="line-md:github-loop" className="h-5 w-5" />
                  GitHub
                </a>
                {/* <a
                  href="/resume.pdf"
                  target="_blank"
                  className="text-gray-800 font-medium px-6 py-3 border border-gray-200 rounded-lg bg-white/50 flex gap-2 transition-all items-center backdrop-blur-sm hover:border-gray-400 hover:bg-white"
                >
                  <Icon icon="line-md:download-loop" className="h-5 w-5" />
                  Resume
                </a> */}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Avatar */}
          <motion.div
            className="flex h-full min-h-75 items-center justify-center order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <div className="h-64 w-64 relative md:h-96 md:w-96">
              <img
                src="/images/avatar.png"
                alt="Json Lee Avatar"
                className="h-full w-full object-contain"
                decoding="async"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 滚动指示器: 居中 + 圆形边框 + 点击滚动功能 */}
      <motion.div
        className="hidden bottom-12 left-1/2 absolute md:block -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <button
          onClick={scrollToNext}
          className="b-2 b-stone-200/50 rounded-full flex size-10 transition-all duration-300 items-center justify-center animate-bounce"
          aria-label="Scroll to next section"
        >
          <div className="opacity-70">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </button>
      </motion.div>
    </section>
  )
}
