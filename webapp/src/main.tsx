import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import * as Sentry from "@sentry/react";
import App from "./App.js";
import "./index.css";

Sentry.init({
    dsn: "https://f439bd4d46ed7787bb4a37415ce0868a@o4510970063290368.ingest.us.sentry.io/4510970078887936",
    sendDefaultPii: true,
    enableLogs: true,
});

createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
        <App />
    </HelmetProvider>
);
