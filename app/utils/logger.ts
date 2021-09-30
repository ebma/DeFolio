const defaultErrorImplementation: (error: any) => void = (error: any) => {
  if (typeof error === "string") {
    console.tron.reportError(new Error(error))
    console.tron.error(error, null)
  } else {
    console.tron.reportError(error)
    console.tron.error(error?.message, null)
  }
}
let trackErrorImplementation: (error: any) => void = defaultErrorImplementation

export function registerErrorHandler(fn: (error: any) => void) {
  trackErrorImplementation = (error) => {
    defaultErrorImplementation(error)
    fn(error)
  }
}

export function trackError(error: any) {
  trackErrorImplementation(error)
}
