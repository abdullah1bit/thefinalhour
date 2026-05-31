import * as Sentry from "@sentry/node";

Sentry.init({
    dsn: "https://35e622ceeb2f61d278bc2a909cde4295@o4510970063290368.ingest.us.sentry.io/4510970092781568",
    enableLogs: true,
    sendDefaultPii: true,
});
