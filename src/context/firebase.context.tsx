/* eslint-disable @typescript-eslint/no-empty-function */
// @TODO REFACTOR – Waiting for iOS 16 Web Push Notifications WORKING Support
import React, { createContext, useEffect, useState } from "react";
import { FirebaseApp } from "@firebase/app";
import { getMessaging, getToken, Messaging, isSupported as isMessagingSupported } from "@firebase/messaging";
import { initializeApp } from "firebase/app";
import * as Sentry from "@sentry/nextjs";
import { Analytics, getAnalytics, isSupported as isAnalyticsSupported } from "@firebase/analytics";
import { DEFAULT_FIREBASE_CONFIG } from "../settings/globals";
import ApiClient from "../api/client";

export interface FirebaseContextType {
  app: FirebaseApp | null;
  setApp: (app: FirebaseApp | null) => void;
  analytics: Analytics | null;
  setAnalytics: (analytics: Analytics | null) => void;
  messaging: Messaging | null;
  setMessaging: (messaging: Messaging | null) => void;
}

export const FirebaseContext = createContext<FirebaseContextType>({
  app: null,
  setApp: () => {},
  analytics: null,
  setAnalytics: () => {},
  messaging: null,
  setMessaging: () => {},
});

const Component: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [messaging, setMessaging] = useState<Messaging | null>(null);

  useEffect(() => {
    try {
      setApp(initializeApp(DEFAULT_FIREBASE_CONFIG));
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
    }
  }, []);

  useEffect(() => {
    const asyncEffect = async () => {
      const isSupported = await isMessagingSupported();

      if (!app || !isSupported) {
        return;
      }

      try {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            try {
              setMessaging(getMessaging(app));
            } catch (error) {
              console.error("Firebase messaging already initialized");
              Sentry.captureException(error);
            }
          }
        });
      } catch (error) {
        if (error instanceof TypeError) {
          // Safari Fix
          Notification.requestPermission(() => {
            setMessaging(getMessaging(app));
          });
        } else {
          console.error("Firebase messaging not initialized");
          Sentry.captureException(error);
        }
      }
    };

    void asyncEffect();
  }, [app]);

  useEffect(() => {
    const asyncEffect = async () => {
      const isSupported = await isAnalyticsSupported();

      if (!app || !isSupported) {
        return;
      }

      setAnalytics(getAnalytics(app));
    };

    void asyncEffect();
  }, [app]);

  useEffect(() => {
    if (!messaging) {
      return;
    }

    const deviceToken = localStorage.getItem("refreshToken");

    try {
      getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      })
        .then((fcmToken) => {
          if (fcmToken && deviceToken) {
            new ApiClient("en-GB").postFcmToken({ deviceToken, fcmToken });

            if (process.env.NODE_ENV !== "production") {
              // eslint-disable-next-line no-console
              console.debug("FCM token: ", fcmToken);
            }
          } else {
            console.error("No registration token available. Request permission to generate one.");
            Sentry.captureMessage("No registration token available. Request permission to generate one.");
          }
        })
        .catch((err) => {
          Sentry.captureMessage("No registration token available. Request permission to generate one. " + String(err));
        });
    } catch (err) {
      console.error("Error getting FCM token: ", err);
      Sentry.captureException(err);
    }
  }, [messaging]);

  return (
    <FirebaseContext.Provider
      value={{
        app,
        setApp,
        analytics,
        setAnalytics,
        messaging,
        setMessaging,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default Component;
