import { motion, AnimatePresence } from "framer-motion"
import { useOnlineStatus } from "../hooks/useOnlineStatus"

export function OfflineBanner() {
  const online = useOnlineStatus()

  return (
    <AnimatePresence>
      {!online && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="sticky top-14 z-50 flex items-center justify-center gap-2 bg-yellow-500 px-4 py-2 text-sm font-medium text-black"
        >
          <svg viewBox="0 0 24 24" className="size-4 fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          You are offline — some features may be unavailable
        </motion.div>
      )}
    </AnimatePresence>
  )
}
