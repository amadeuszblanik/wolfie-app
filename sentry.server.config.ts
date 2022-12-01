import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || "https://4e7b240ca1974acea4c091d83d2a30e7@o345595.ingest.sentry.io/4503956035796992",
  tracesSampleRate: 1.0,
});
