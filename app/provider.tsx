"use client";

import { AuthProvider } from "@/lib/authContext";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LcDp9QrAAAAAIcQ7XprZnRCd8M6KUFBwAQ1-qvc">
      <AuthProvider>{children}</AuthProvider>
    </GoogleReCaptchaProvider>
  );
}
