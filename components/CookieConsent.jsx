"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookieConsent", "accepted", { expires: 365 });
    setShowBanner(false);
  };

  const rejectCookies = () => {
    Cookies.set("cookieConsent", "rejected", { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[700px] bg-gray-900 text-white px-6 py-4 rounded-lg shadow-lg border border-green-500/40 flex flex-col md:flex-row items-center justify-between gap-4 z-50">
      <p className="text-sm text-gray-200 leading-relaxed">
        We use cookies to improve your experience. By using our site, you accept our{" "}
        <a href="/privacy-policy" className="text-green-400 underline hover:text-green-300">
          Privacy Policy
        </a>.
      </p>
      <div className="flex gap-3">
        <button
          onClick={rejectCookies}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Reject
        </button>
        <button
          onClick={acceptCookies}
          className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-md font-semibold"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
