import { motion } from "framer-motion"
import type { Project } from "../data/profile"

interface ProjectCardProps {
  project: Project
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover="hover"
      className="group relative block rounded-2xl border border-twitter-border bg-white dark:bg-[#16181c] p-5 transition-colors hover:bg-twitter-hover"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="size-2 rounded-full bg-twitter-blue shrink-0" />
            <h3 className="text-[15px] font-bold text-twitter-dark truncate">
              {project.title}
            </h3>
          </div>
          <p className="text-sm text-twitter-gray leading-5 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-twitter-badge px-2.5 py-0.5 text-xs font-medium text-twitter-blue"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <motion.div
          variants={{
            hover: { x: 4, opacity: 1 },
          }}
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-twitter-border opacity-0 transition-opacity group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="size-4 fill-twitter-dark">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </motion.div>
      </div>

      {/* Subtle glow on hover */}
      <motion.div
        variants={{
          hover: { opacity: 0.06 },
        }}
        className="absolute inset-0 rounded-2xl bg-twitter-blue opacity-0 pointer-events-none"
      />
    </motion.a>
  )
}
