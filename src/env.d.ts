declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FIREBASE_API_KEY: string;
      FIREBASE_AUTH_DOMAIN: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_STORAGE_BUCKET: string;
      FIREBASE_MESSAGING_SENDER_ID: string;
      FIREBASE_APP_ID: string;
      FIREBASE_MEASUREMENT_ID: string;
      CLOUDINARY_GET_URL: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      STRIPE_API_KEY: string;
      STRIPE_API_SECRET: string;
    }
  }
}

export {}
