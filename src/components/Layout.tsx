import type { ReactNode } from "react"
import { Nav } from "./Nav"
import { LeftNav } from "./LeftNav"
import { Sidebar } from "./Sidebar"
import { Footer } from "./Footer"
import type { ProfileData } from "../data/profile"

interface LayoutProps {
  children: ReactNode
  data: ProfileData
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Layout({ children, data, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Nav activeTab={activeTab} onTabChange={onTabChange} />
      <main className="mx-auto flex w-full max-w-[1280px] gap-4 xl:gap-6 px-0 sm:px-4 py-4 flex-1">
        <LeftNav activeTab={activeTab} onTabChange={onTabChange} />
        <div className="min-w-0 flex-1 max-w-[600px]">{children}</div>
        <Sidebar data={data} />
      </main>
      <Footer data={data} onTabChange={onTabChange} />
    </div>
  )
}
