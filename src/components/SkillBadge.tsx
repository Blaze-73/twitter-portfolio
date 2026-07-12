import { motion } from "framer-motion"

interface SkillBadgeProps {
  label: string
  index?: number
}

export function SkillBadge({ label, index = 0 }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      className="inline-flex rounded-full border border-twitter-border bg-white dark:bg-[#16181c] px-3.5 py-1.5 text-sm text-twitter-gray transition-all hover:border-twitter-blue/50 hover:text-twitter-dark cursor-default"
    >
      {label}
    </motion.span>
  )
}
