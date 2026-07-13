import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../hooks/useTheme"
import { safeGetItem, safeSetItem, safeParseInt } from "../utils/safeStorage"

interface NavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Nav({ activeTab, onTabChange }: NavProps) {
  const { dark, toggle: toggleTheme } = useTheme()
  const [followed, setFollowed] = useState(() => {
    return safeGetItem("tw_followed") === "true"
  })
  const [followers, setFollowers] = useState(() => {
    return safeParseInt(safeGetItem("tw_followers"), 128)
  })
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    safeSetItem("tw_followed", String(followed))
    safeSetItem("tw_followers", String(followers))
  }, [followed, followers])

  const handleFollow = () => {
    if (animating) return
    setAnimating(true)
    if (followed) {
      setFollowers((p) => p - 1)
      setFollowed(false)
    } else {
      setFollowers((p) => p + 1)
      setFollowed(true)
    }
    setTimeout(() => setAnimating(false), 600)
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-twitter-border bg-white/80 dark:bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 h-14">
        <div className="flex items-center gap-6 sm:gap-8">
          <h1 className="flex items-center gap-2 text-xl font-bold text-twitter-dark shrink-0">
            <svg viewBox="0 0 24 24" className="size-6 fill-twitter-blue">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Twitter
          </h1>
          <div className="hidden sm:flex items-center gap-6 text-sm text-twitter-gray">
            <span
              className={`cursor-pointer transition-colors ${activeTab === "posts" ? "text-twitter-dark font-medium" : "hover:text-twitter-dark"}`}
              onClick={() => onTabChange("posts")}
            >
              Home
            </span>
            <span
              className={`cursor-pointer transition-colors ${activeTab === "projects" ? "text-twitter-dark font-medium" : "hover:text-twitter-dark"}`}
              onClick={() => onTabChange("projects")}
            >
              Projects
            </span>
            <span
              className={`cursor-pointer transition-colors ${activeTab === "skills" ? "text-twitter-dark font-medium" : "hover:text-twitter-dark"}`}
              onClick={() => onTabChange("skills")}
            >
              Skills
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-3">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={toggleTheme}
            className="flex size-9 items-center justify-center rounded-full text-twitter-gray hover:bg-twitter-hover hover:text-twitter-dark transition-colors"
            title={dark ? "Light mode" : "Dark mode"}
          >
            {dark ? (
              <svg viewBox="0 0 24 24" className="size-5 fill-current">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-5 fill-current">
                <path d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
              </svg>
            )}
          </motion.button>
          <AnimatePresence>
            {animating && (
              <motion.span
                key={followed ? "inc" : "dec"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`text-sm font-semibold ${followed ? "text-green-500" : "text-red-500"}`}
              >
                {followed ? `+1` : `-1`}
              </motion.span>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleFollow}
            className={`rounded-full px-5 py-1.5 text-sm font-bold transition-all active:scale-95 ${
              followed
                ? "border border-twitter-border text-twitter-dark bg-white dark:bg-black hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 hover:text-red-500"
                : "bg-twitter-dark text-white dark:bg-[#2f3336] dark:text-white hover:opacity-85"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={followed ? "following" : "follow"}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15 }}
              >
                {followed ? "Following" : "Follow"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </nav>
  )
}
