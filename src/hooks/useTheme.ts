import { useEffect, useState } from "react"

export function useTheme() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("tw_theme")
    return stored === "dark"
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("tw_theme", dark ? "dark" : "light")
  }, [dark])

  const toggle = () => setDark((p) => !p)

  return { dark, toggle }
}
