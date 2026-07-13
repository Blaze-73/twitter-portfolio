import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error.message, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex min-h-screen items-center justify-center bg-white p-8 dark:bg-black">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30">
              <svg viewBox="0 0 24 24" className="size-7 fill-red-500">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-twitter-dark">Something went wrong</h2>
            <p className="mb-6 text-sm text-twitter-gray">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={this.handleReset}
              className="rounded-full bg-twitter-blue px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1a8cd8]"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
