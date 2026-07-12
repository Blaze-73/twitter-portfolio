import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { ProfileData } from "../data/profile"

interface ProfileProps {
  data: ProfileData
}

export function Profile({ data }: ProfileProps) {
  const [dialog, setDialog] = useState<"idle" | "ask" | "yes" | "no">("idle")
  const [followers, setFollowers] = useState(() => {
    const stored = localStorage.getItem("tw_followers")
    return stored ? Number.parseInt(stored, 10) : data.followers
  })

  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem("tw_followers")
      if (stored) setFollowers(Number.parseInt(stored, 10))
    }
    window.addEventListener("storage", sync)
    const interval = setInterval(sync, 500)
    return () => {
      window.removeEventListener("storage", sync)
      clearInterval(interval)
    }
  }, [])

  const initials = data.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  const handleEditClick = () => setDialog("ask")
  const handleYes = () => setDialog("yes")
  const handleNo = () => setDialog("no")

  return (
    <div>
      {/* Banner */}
      <div className="relative h-36 sm:h-48 md:h-56 bg-gradient-to-r from-twitter-blue via-blue-600 to-purple-600 overflow-hidden">
        {data.banner && (
          <img src={data.banner} alt="Profile banner" className="absolute inset-0 size-full object-cover" />
        )}
        {!data.banner && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
          </div>
        )}
      </div>

      {/* Avatar + Edit */}
      <div className="mx-auto max-w-[600px] px-4">
        <div className="relative flex justify-between items-start -mt-12 sm:-mt-16 mb-4">
          <div className="relative">
            <div className="size-24 sm:size-28 md:size-32 rounded-full border-4 border-white bg-gradient-to-br from-twitter-blue to-purple-600 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white overflow-hidden shadow-xl">
              {data.avatar ? (
                <img src={data.avatar} alt={data.name} className="size-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <div className="absolute inset-0 size-24 sm:size-28 md:size-32 rounded-full border-4 border-transparent hover:border-twitter-blue/30 transition-colors cursor-pointer" />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleEditClick}
            className="mt-14 sm:mt-16 rounded-full border border-twitter-border px-4 sm:px-5 py-1.5 text-sm font-bold text-twitter-dark transition-all hover:bg-twitter-hover"
          >
            Edit profile
          </motion.button>
        </div>

        {/* Name + Bio */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-twitter-dark">{data.name}</h2>
            <svg viewBox="0 0 22 22" className="size-5 fill-twitter-blue">
              <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.1-.605.1-1.235 0-1.84-.354-.542-.852-.974-1.438-1.246.1-.605.1-1.235 0-1.84-.354-.542-.852-.974-1.438-1.246-.1-.605-.1-1.235 0-1.84-.354-.542-.852-.974-1.438-1.246-.1-.605-.1-1.235 0-1.84-.354-.542-.852-.974-1.438-1.246-.1-.605-.1-1.235 0-1.84-.354-.542-.852-.974-1.438-1.246-.1-.605-.1-1.235 0-1.84-.354-.542-.852-.974-1.438-1.246" />
            </svg>
          </div>
          <p className="text-sm text-twitter-gray">@{data.handle}</p>
          <p className="mt-3 text-sm text-twitter-gray leading-5 max-w-[500px]">
            {data.bio}
          </p>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-twitter-gray mb-4">
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="size-4 fill-current">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z" />
            </svg>
            {data.education}
          </span>
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="size-4 fill-current">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {data.location}
          </span>
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="size-4 fill-current">
              <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
            </svg>
            Joined {data.joined}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 sm:gap-5 text-sm mb-4">
          <div>
            <span className="font-bold text-twitter-dark">{data.stats.projects}</span>{" "}
            <span className="text-twitter-gray">Projects</span>
          </div>
          <div>
            <span className="font-bold text-twitter-dark">{data.stats.technologies}</span>{" "}
            <span className="text-twitter-gray">Technologies</span>
          </div>
          <div>
            <span className="font-bold text-twitter-dark">{data.stats.deployments}</span>{" "}
            <span className="text-twitter-gray">Deployments</span>
          </div>
          <div>
            <span className="font-bold text-twitter-dark">{followers}</span>{" "}
            <span className="text-twitter-gray">Followers</span>
          </div>
        </div>
      </div>

      {/* Edit profile dialog */}
      <AnimatePresence>
        {dialog !== "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70 px-4"
            onClick={() => setDialog("idle")}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#16181c] p-6 shadow-2xl text-center"
            >
              {dialog === "ask" && (
                <>
                  <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-twitter-badge">
                    <svg viewBox="0 0 24 24" className="size-7 fill-twitter-blue">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-twitter-dark mb-2">Do you really wanna edit my profile?</h3>
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={handleYes}
                      className="flex-1 rounded-full bg-twitter-blue px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#1a8cd8]"
                    >
                      Yes
                    </button>
                    <button
                      onClick={handleNo}
                      className="flex-1 rounded-full border border-twitter-border px-5 py-2.5 text-sm font-bold text-twitter-dark transition-all hover:bg-twitter-hover"
                    >
                      No
                    </button>
                  </div>
                </>
              )}
              {dialog === "yes" && (
                <>
                  <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-yellow-50">
                    <span className="text-2xl">😄</span>
                  </div>
                  <h3 className="text-lg font-bold text-twitter-dark mb-2">Nah, go edit yours bro</h3>
                  <p className="text-sm text-twitter-gray mb-5">This one's mine 😎</p>
                  <button
                    onClick={() => setDialog("idle")}
                    className="w-full rounded-full bg-twitter-blue px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#1a8cd8]"
                  >
                    OK 😂
                  </button>
                </>
              )}
              {dialog === "no" && (
                <>
                  <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-50">
                    <span className="text-2xl">👍</span>
                  </div>
                  <h3 className="text-lg font-bold text-twitter-dark mb-2">Good boy</h3>
                  <p className="text-sm text-twitter-gray mb-5">That's what I thought.</p>
                  <button
                    onClick={() => setDialog("idle")}
                    className="w-full rounded-full bg-twitter-blue px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#1a8cd8]"
                  >
                    Close
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
