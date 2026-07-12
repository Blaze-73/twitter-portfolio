import type { ProfileData } from "../data/profile"

interface FooterProps {
  data: ProfileData
  onTabChange: (tab: string) => void
}

export function Footer({ data, onTabChange }: FooterProps) {
  return (
    <footer className="border-t border-twitter-border bg-white dark:bg-black mt-8">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 text-xl font-bold text-twitter-dark mb-2">
              <svg viewBox="0 0 24 24" className="size-6 fill-twitter-blue">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </div>
            <p className="text-sm text-twitter-gray leading-5">
              {data.bio.split(".")[0]}.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-twitter-dark mb-3">Navigate</h4>
              <div className="space-y-2">
                <button onClick={() => onTabChange("posts")} className="block text-sm text-twitter-gray hover:text-twitter-dark transition-colors cursor-pointer">Home</button>
                <button onClick={() => onTabChange("projects")} className="block text-sm text-twitter-gray hover:text-twitter-dark transition-colors cursor-pointer">Explore</button>
                <button onClick={() => onTabChange("projects")} className="block text-sm text-twitter-gray hover:text-twitter-dark transition-colors cursor-pointer">Projects</button>
                <button onClick={() => onTabChange("skills")} className="block text-sm text-twitter-gray hover:text-twitter-dark transition-colors cursor-pointer">Skills</button>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-twitter-dark mb-3">Connect</h4>
              <div className="space-y-2">
                <a href={data.social.github} target="_blank" rel="noopener noreferrer" className="block text-sm text-twitter-gray hover:text-twitter-dark transition-colors">GitHub</a>
                <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="block text-sm text-twitter-gray hover:text-twitter-dark transition-colors">LinkedIn</a>
                <a href={`mailto:${data.social.email}`} className="block text-sm text-twitter-gray hover:text-twitter-dark transition-colors">Email</a>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-sm font-semibold text-twitter-dark mb-3">More</h4>
              <div className="space-y-2">
                <button onClick={() => onTabChange("workflow")} className="block text-sm text-twitter-gray hover:text-twitter-dark transition-colors cursor-pointer">Workflow</button>
                <button onClick={() => onTabChange("contact")} className="block text-sm text-twitter-gray hover:text-twitter-dark transition-colors cursor-pointer">Contact</button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-twitter-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-twitter-gray">© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-twitter-gray">
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
