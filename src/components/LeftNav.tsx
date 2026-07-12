import { motion } from "framer-motion"

interface LeftNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const links = [
  { id: "posts", label: "Home", icon: "M12 1.696L.622 8.807l1.06 1.696L3 9.679V21.5h7v-6h4v6h7V9.679l1.318.824 1.06-1.696L12 1.696z" },
  { id: "projects", label: "Projects", icon: "M19.9 12.66a1 1 0 0 1 0-1.32l2.13-2.31a1 1 0 0 0 .22-1.09l-2.05-4.78a1 1 0 0 0-.93-.63H16.5a1 1 0 0 1-.83-.44L14 1.06a1 1 0 0 0-1.66 0l-1.67 2.53a1 1 0 0 1-.83.44H6.73a1 1 0 0 0-.93.63L3.75 9.94a1 1 0 0 0 .22 1.09l2.13 2.31a1 1 0 0 1 0 1.32l-2.13 2.31a1 1 0 0 0-.22 1.09l2.05 4.78a1 1 0 0 0 .93.63H10.5a1 1 0 0 1 .83.44l1.67 2.53a1 1 0 0 0 1.66 0l1.67-2.53a1 1 0 0 1 .83-.44h2.77a1 1 0 0 0 .93-.63l2.05-4.78a1 1 0 0 0-.22-1.09l-2.13-2.31zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" },
  { id: "skills", label: "Skills", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" },
  { id: "workflow", label: "Workflow", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" },
  { id: "contact", label: "Contact", icon: "M1.998 5.5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-18a1 1 0 0 1-1-1v-14zm2 2v3.151l7.703 4.237a1 1 0 0 0 .968.005L20.002 10.65V7.5h-16zm0 4.334V17.5h16v-5.667l-6.997 3.848-7.003-3.847z" },
]

export function LeftNav({ activeTab, onTabChange }: LeftNavProps) {
  return (
    <aside className="hidden lg:flex flex-col w-[72px] xl:w-[88px] shrink-0 sticky top-20 h-fit gap-1">
      {links.map((link) => (
        <motion.button
          key={link.id}
          whileTap={{ scale: 0.9 }}
          onClick={() => onTabChange(link.id)}
          className={`flex flex-col items-center gap-1 rounded-xl p-3 transition-colors ${
            activeTab === link.id
              ? "text-twitter-dark bg-twitter-hover"
              : "text-twitter-gray hover:text-twitter-dark hover:bg-twitter-hover"
          }`}
          title={link.label}
        >
          <svg viewBox="0 0 24 24" className="size-6 fill-current">
            <path d={link.icon} />
          </svg>
          <span className="text-[11px] font-medium">{link.label}</span>
        </motion.button>
      ))}
    </aside>
  )
}
