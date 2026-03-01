import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { ReactNode, useEffect } from 'react';

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST;

export function PostHogProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        if (posthogKey && posthogHost) {
            posthog.init(posthogKey, {
                api_host: posthogHost,
                person_profiles: 'identified_only',
                loaded: (posthog_instance) => {
                    if (import.meta.env.DEV) {
                        posthog_instance.debug(false);
                    }
                },
            });
        }
    }, []);

    return <PHProvider client={posthog}>{children}</PHProvider>;
}
