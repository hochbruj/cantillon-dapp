import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

import { firebaseConfig } from "../../config/firebase";

firebase.initializeApp(firebaseConfig);

// Authentication
const auth = firebase.auth();

const firebaseLoginAnonymously = () => {
  auth.signInAnonymously();
};

firebaseLoginAnonymously();

// Analytics
class FirebaseAnalyticsService {
  private _analytics: firebase.analytics.Analytics | undefined;

  private async ensureAnalytics(): Promise<void> {
    if (this._analytics) {
      return;
    }

    const supported = await firebase.analytics.isSupported();
    if (supported) {
      this._analytics = firebase.analytics();
    }
  }

  /**
   * Log a custom event with optional parameters
   *
   * @param {string} event - event names should contain 1 to 32 alphanumeric characters or underscores
   * @param {object} params - up to 100 characters is the maximum character length supported for event parameters.
   */
  public async logEvent(
    event: string,
    params?: { [key: string]: unknown }
  ): Promise<void> {
    try {
      await this.ensureAnalytics();
      if (this._analytics) {
        this._analytics.logEvent(event, params);
      }
    } catch (error) {
      console.error("Can't log firebase event", error);
    }
  }
}

export const analytics = new FirebaseAnalyticsService();

// Cloud Firestore
export const FieldValue = firebase.firestore.FieldValue;
export const Timestamp = firebase.firestore.Timestamp;
export type TimestampType = firebase.firestore.Timestamp;
export const db = firebase.firestore();
