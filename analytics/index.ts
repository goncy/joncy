export function initialize(): void {
  window.dataLayer = window.dataLayer || [];
  window.gtag;

  if (process.env.NEXT_PUBLIC_ENV === "production") {
    console.log(`Analytics is enabled on ${process.env.NEXT_PUBLIC_ENV}`);

    window.gtag = function gtag(..._args) {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", process.env.NEXT_PUBLIC_GTM, {
      page_path: window.location.pathname,
    });
  } else {
    console.log(`Analytics is disabled on ${process.env.NEXT_PUBLIC_ENV}`);

    window.gtag = (...args) => console.log(`Analytics event log: `, args);
  }
}

export function track(name: string, parameters: Record<string, any>): void {
  try {
    window.gtag("event", name, parameters);
  } catch (error) {
    console.warn(`Analytics event couldn't be dispatched: `, error);
  }
}
