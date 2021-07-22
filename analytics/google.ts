import ReactGA from "react-ga";

export default class GoogleAnalyticsProvider {
  // Save a flag to check if it was already initialized
  initialized = false;

  // Sentry key
  key: string;

  // Initialize reporter
  constructor(key: string) {
    // Check if we are on production
    if (process.env.NEXT_PUBLIC_ENV === "production") {
      // Initialize service
      this.initialize(key);
    } else {
      // Log why we cant initialize
      console.info(`Analytics is disabled for ${process.env.NEXT_PUBLIC_ENV} environment`);
    }
  }

  private initialize(key: string) {
    // Check if the service is already initialized
    if (!this.initialized) {
      // And we have a SENTRY_DSN
      if (key) {
        // Initialize
        ReactGA.initialize(key);

        // Set the flag to true
        this.initialized = true;
      } else {
        // Log why we can't initialize
        console.info("No GA_TRACKING found");
      }
    } else {
      // Log why we didn't initialize
      console.info("Analytics was already initialized");
    }
  }

  track(event: ReactGA.EventArgs): void {
    // Check if analytics is initialized
    if (!this.initialized) {
      // Log the error
      console.warn(`Analytics is not initialized: [event] - `, event);

      // Early return
      return;
    }

    // Emit event
    return ReactGA.event(event);
  }

  pageview(path: string): void {
    // Check if analytics is initialized
    if (!this.initialized) {
      // Log the error
      console.warn(`Analytics is not initialized: [pageview] - `, path);

      // Early return
      return;
    }

    // Emit event
    return ReactGA.pageview(path);
  }
}
