import { motion, AnimatePresence } from "framer-motion"
import { ProjectCard } from "./ProjectCard"
import { PostCard } from "./PostCard"
import { SkillBadge } from "./SkillBadge"
import type { ProfileData } from "../data/profile"

interface TabsProps {
  data: ProfileData
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "posts", label: "Posts" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "workflow", label: "Workflow" },
  { id: "contact", label: "Contact" },
]

export function Tabs({ data, activeTab, onTabChange }: TabsProps) {

  return (
    <div className="mx-auto max-w-[600px] px-4">
      {/* Tab bar */}
      <div className="flex border-b border-twitter-border overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex-1 px-4 py-3.5 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id ? "text-twitter-dark" : "text-twitter-gray hover:text-twitter-dark"
            }`}
          >
            {tab.id === activeTab && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-14 rounded-full bg-twitter-blue"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="py-6"
        >
          {activeTab === "posts" && (
            <div className="-mx-4">
              {data.posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="grid gap-4">
              {data.projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          )}

          {activeTab === "skills" && (
            <div className="space-y-8">
              <Section title="Frontend">
                {data.skills.frontend.map((s) => (
                  <SkillBadge key={s} label={s} />
                ))}
              </Section>
              <Section title="Backend">
                {data.skills.backend.map((s) => (
                  <SkillBadge key={s} label={s} />
                ))}
              </Section>
              <Section title="Databases">
                {data.skills.databases.map((s) => (
                  <SkillBadge key={s} label={s} />
                ))}
              </Section>
              <Section title="Tools">
                {data.skills.tools.map((s) => (
                  <SkillBadge key={s} label={s} />
                ))}
              </Section>
            </div>
          )}

          {activeTab === "workflow" && (
            <div className="space-y-4">
              {data.workflow.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-twitter-badge text-xs font-bold text-twitter-blue">
                    {i + 1}
                  </span>
                  <p className="text-sm text-twitter-dark leading-6">{step}</p>
                </motion.div>
              ))}
              <div className="pt-6 border-t border-twitter-border mt-8">
                <h4 className="text-sm font-semibold text-twitter-dark mb-3">Experience</h4>
                {data.experience.map((item) => (
                  <p key={item} className="text-sm text-twitter-gray leading-6 flex items-start gap-3">
                    <span className="text-twitter-blue mt-1">•</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-4 text-center py-8">
              <p className="text-lg text-twitter-dark font-semibold">Let's work together</p>
              <p className="text-sm text-twitter-gray max-w-md mx-auto leading-6">
                I'm currently available for freelance projects and junior developer
                opportunities. If you have a project in mind or just want to connect,
                feel free to reach out.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                <ContactLink href={`mailto:${data.social.email}`} label="Email" />
                <ContactLink href={data.social.github} label="GitHub" />
                <ContactLink href={data.social.linkedin} label="LinkedIn" />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-twitter-dark mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function ContactLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-twitter-border px-5 py-2 text-sm font-medium text-twitter-dark transition-all hover:bg-twitter-hover hover:border-twitter-blue"
    >
      {label}
      <svg viewBox="0 0 24 24" className="size-3.5 fill-current opacity-60">
        <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
        <path d="M5 5v14h14v-6h-2v4H7V7h4V5H5z" />
      </svg>
    </a>
  )
}
