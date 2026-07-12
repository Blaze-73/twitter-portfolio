import type { ProfileData } from "../data/profile"

interface SidebarProps {
  data: ProfileData
}

export function Sidebar({ data }: SidebarProps) {
  return (
    <aside className="hidden lg:block w-[350px] xl:w-[380px] shrink-0">
      <div className="sticky top-20 space-y-4">
        {/* Trending */}
        <div className="rounded-2xl border border-twitter-border bg-twitter-hover overflow-hidden">
          <div className="px-4 py-3 border-b border-twitter-border">
            <h3 className="text-lg font-bold text-twitter-dark">What's happening</h3>
          </div>
          <div className="divide-y divide-twitter-border">
            <TrendingItem
              category="Project"
              title={data.projects[0].title}
              hashtag="Latest Work"
            />
            <TrendingItem
              category="Status"
              title="Available for freelance"
              hashtag="OpenToWork"
            />
            <TrendingItem
              category="Learning"
              title="Building with Supabase"
              hashtag="FullStack"
            />
            <TrendingItem
              category="Design"
              title="TailwindCSS v4 Tips"
              hashtag="CSS"
            />
            <TrendingItem
              category="Career"
              title="Junior Dev opportunities"
              hashtag="Hiring"
            />
            <TrendingItem
              category="Project"
              title={data.projects[3].title}
              hashtag="New Release"
            />
          </div>
          {data.website && (
            <a
              href={data.website}
              className="block px-4 py-3 text-sm text-twitter-blue hover:bg-twitter-hover transition-colors"
            >
              Show more
            </a>
          )}
        </div>

        {/* Who to follow */}
        <div className="rounded-2xl border border-twitter-border bg-twitter-hover overflow-hidden">
          <div className="px-4 py-3 border-b border-twitter-border">
            <h3 className="text-lg font-bold text-twitter-dark">Connect</h3>
          </div>
          <div className="p-4 space-y-3">
            <FollowCard
              label="GitHub"
              handle={data.social.github.replace("https://github.com/", "@") || "@mouataz"}
              href={data.social.github}
            />
            <FollowCard
              label="LinkedIn"
              handle="Let's connect"
              href={data.social.linkedin}
            />
            <FollowCard
              label="Email"
              handle={data.social.email}
              href={`mailto:${data.social.email}`}
            />
          </div>
        </div>

        {/* Tech Stack */}
        <div className="rounded-2xl border border-twitter-border bg-twitter-hover overflow-hidden">
          <div className="px-4 py-3 border-b border-twitter-border">
            <h3 className="text-lg font-bold text-twitter-dark">Tech Stack</h3>
          </div>
          <div className="p-4 flex flex-wrap gap-2">
            {[...data.skills.frontend.slice(0, 3), ...data.skills.backend.slice(0, 2), ...data.skills.tools.slice(0, 2)].map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-twitter-badge px-3 py-1 text-xs font-medium text-twitter-blue"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 text-xs text-twitter-gray space-y-1">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Cookie Policy</span>
          </div>
          <p>© 2024 Mouataz Billah Kachkach</p>
        </div>
      </div>
    </aside>
  )
}

function TrendingItem({
  category,
  title,
  hashtag,
}: {
  category: string
  title: string
  hashtag: string
}) {
  return (
    <div className="px-4 py-3 hover:bg-twitter-hover transition-colors cursor-pointer">
      <p className="text-xs text-twitter-gray">{category} · Trending</p>
      <p className="text-sm font-bold text-twitter-dark mt-0.5">{title}</p>
      <p className="text-xs text-twitter-gray mt-0.5">{hashtag}</p>
    </div>
  )
}

function FollowCard({
  label,
  handle,
  href,
}: {
  label: string
  handle: string
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between group"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full border border-twitter-border text-xs font-bold text-twitter-blue group-hover:bg-twitter-badge transition-colors">
          {label[0]}
        </div>
        <div>
          <p className="text-sm font-bold text-twitter-dark group-hover:underline">{label}</p>
          <p className="text-xs text-twitter-gray">{handle}</p>
        </div>
      </div>
      <button className="rounded-full bg-twitter-dark dark:bg-[#2f3336] px-4 py-1.5 text-xs font-bold text-white dark:text-white transition-all hover:opacity-80">
        Follow
      </button>
    </a>
  )
}
