import { useState, useRef } from "react"
import { Background } from "./components/Background"
import { Profile } from "./components/Profile"
import { Tabs } from "./components/Tabs"
import { Layout } from "./components/Layout"
import { OfflineBanner } from "./components/OfflineBanner"
import { profile } from "./data/profile"

function App() {
  const [activeTab, setActiveTab] = useState("posts")
  const contentRef = useRef<HTMLDivElement>(null)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <Background />
      <OfflineBanner />
      <Layout data={profile} activeTab={activeTab} onTabChange={handleTabChange}>
        <div ref={contentRef} />
        <Profile data={profile} />
        <Tabs data={profile} activeTab={activeTab} onTabChange={setActiveTab} />
      </Layout>
    </>
  )
}

export default App
