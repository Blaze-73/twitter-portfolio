import { useState } from "react"
import { motion } from "framer-motion"
import { profile, type Post } from "../data/profile"

interface PostCardProps {
  post: Post
  index?: number
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [retweeted, setRetweeted] = useState(false)
  const [retweetCount, setRetweetCount] = useState(post.retweets)
  const [showReplyToast, setShowReplyToast] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikeCount((p) => p - 1)
    } else {
      setLikeCount((p) => p + 1)
    }
    setLiked((p) => !p)
  }

  const handleRetweet = () => {
    if (retweeted) {
      setRetweetCount((p) => p - 1)
    } else {
      setRetweetCount((p) => p + 1)
    }
    setRetweeted((p) => !p)
  }

  const handleReply = () => {
    setShowReplyToast(true)
    setTimeout(() => setShowReplyToast(false), 4000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group relative border-b border-twitter-border px-4 py-3 transition-colors hover:bg-twitter-hover"
    >
      {post.pinned && (
        <div className="flex items-center gap-2 text-xs text-twitter-gray mb-2 pl-1">
          <svg viewBox="0 0 24 24" className="size-3.5 fill-twitter-gray">
            <path d="M22 12l-9.899 9.899-1.415-1.413L18.172 13H2v-2h16.172l-7.486-7.486 1.415-1.413L22 12z" />
          </svg>
          <span>Pinned post</span>
        </div>
      )}
      <div className="flex gap-3">
        <div className="size-10 shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-twitter-blue to-purple-600">
          <img src={profile.avatar} alt="" className="size-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="font-bold text-twitter-dark">Mouataz Billah Kachkach</span>
            <span className="text-twitter-gray">@Blaze-73</span>
            <span className="text-twitter-gray">·</span>
            <span className="text-twitter-gray hover:underline cursor-pointer">{post.timestamp}</span>
          </div>
          <p className="mt-0.5 text-[15px] text-twitter-dark leading-5 whitespace-pre-wrap">
            {post.content}
          </p>
          {post.image && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-twitter-border">
              <img src={post.image} alt="" className="w-full h-auto object-cover max-h-80" loading="lazy" />
            </div>
          )}
          <div className="mt-3 flex max-w-[420px] items-center justify-between text-twitter-gray">
            <ActionIcon
              icon="reply"
              count={post.replies}
              onClick={handleReply}
              activeColor="text-twitter-blue"
            />
            <ActionIcon
              icon="retweet"
              count={retweetCount}
              active={retweeted}
              onClick={handleRetweet}
              activeColor="text-green-500"
            />
            <ActionIcon
              icon="like"
              count={likeCount}
              active={liked}
              onClick={handleLike}
              activeColor="text-pink-500"
            />
            <ActionIcon
              icon="share"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              activeColor="text-twitter-blue"
            />
          </div>
        </div>
      </div>

      {/* Reply toast */}
      {showReplyToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-2 right-4 z-30 rounded-xl border border-twitter-border bg-white p-4 shadow-lg dark:bg-black"
        >
          <p className="text-sm text-twitter-dark mb-3">Wanna comment? Hit me up on gmail!!</p>
          <a
            href="mailto:kachkachmouata@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-twitter-blue px-4 py-2 text-sm font-bold text-white hover:bg-[#1a8cd8] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="size-4 fill-current">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            kachkachmouata@gmail.com
          </a>
        </motion.div>
      )}
    </motion.div>
  )
}

interface ActionIconProps {
  icon: string
  count?: number
  active?: boolean
  onClick?: () => void
  activeColor: string
}

function ActionIcon({ icon, count, active, onClick, activeColor }: ActionIconProps) {
  const paths: Record<string, string> = {
    reply: "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.634 8.129 8.115 0 5.089-3.788 8.144-8.033 8.144h-1.083l-4.64 3.732v-3.747c-4.041-1.01-6.744-4.28-6.744-8.244zm5.212.429c0-.367.298-.665.665-.665h.363c.367 0 .665.298.665.665 0 .367-.298.665-.665.665h-.363c-.367 0-.665-.298-.665-.665zm3.315 0c0-.367.298-.665.665-.665h.363c.367 0 .665.298.665.665 0 .367-.298.665-.665.665h-.363c-.367 0-.665-.298-.665-.665zm3.315 0c0-.367.298-.665.665-.665h.363c.367 0 .665.298.665.665 0 .367-.298.665-.665.665h-.363c-.367 0-.665-.298-.665-.665z",
    retweet: "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z",
    like: "M20.884 13.19c-1.351 2.48-4.001 5.12-7.379 8.23l-.304.284-.301-.284c-3.378-3.11-6.028-5.75-7.379-8.23a5.655 5.655 0 0 1 0-5.456c1.245-2.283 3.98-3.074 6.154-2.09.482.22 1.074.586 1.526 1.047.452-.46 1.044-.826 1.526-1.046 2.173-.986 4.91-.194 6.154 2.089a5.655 5.655 0 0 1 .003 5.456z",
    share: "M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z",
  }

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      className="flex items-center gap-1 group/action"
    >
      <div className={`flex size-8 items-center justify-center rounded-full transition-colors ${
        active ? `${activeColor}` : ""
      } group-hover/action:bg-twitter-badge`}>
        <svg viewBox="0 0 24 24" className={`size-[18px] transition-colors ${
          active ? `${activeColor} fill-current` : "fill-twitter-gray group-hover/action:fill-twitter-blue"
        }`}>
          <path d={paths[icon]} />
        </svg>
      </div>
      {count !== undefined && (
        <span className={`text-xs transition-colors ${
          active ? activeColor : "group-hover/action:text-twitter-blue"
        }`}>
          {count}
        </span>
      )}
    </motion.button>
  )
}
