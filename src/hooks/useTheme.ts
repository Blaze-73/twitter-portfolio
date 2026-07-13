import { useEffect, useState } from "react"
import { safeGetItem, safeSetItem } from "../utils/safeStorage"

export function useTheme() {
  const [dark, setDark] = useState(() => {
    return safeGetItem("tw_theme") === "dark"
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    safeSetItem("tw_theme", dark ? "dark" : "light")
  }, [dark])

  const toggle = () => setDark((p) => !p)

  return { dark, toggle }
}
