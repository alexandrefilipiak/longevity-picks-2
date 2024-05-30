// app/providers.js
'use client'
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: 'https://us.posthog.com' // or 'https://eu.posthog.com' if your PostHog is hosted in Europe
  })
}
export function CSPostHogProvider({ children } : { children: React.ReactNode}) {
    return <PostHogProvider client={posthog}>
        <CSPostHogWrapper>
        {children}
        </CSPostHogWrapper>
        </PostHogProvider>
}

export function CSPostHogWrapper({ children } : { children: React.ReactNode}) {
    const auth = useAuth();
    const userInfo = useUser();

    useEffect(() => {
        if (userInfo.user) {
            posthog.identify(userInfo.user.id, 
                { email: userInfo.user.primaryEmailAddress,
                username: userInfo.user.username,
                fullName: userInfo.user.fullName
                 }
            );
        } else if (!auth.isSignedIn) {
            posthog.reset();
        }
    }, [auth, userInfo]);
    
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}