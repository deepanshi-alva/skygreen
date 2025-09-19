import React from "react";

export function ReferralProgram() {
  return (
    <div className="grid grid-rows-1 md:grid-rows-2 gap-6">
      {/* Section 1 */}
      <section
        id="rewards-program"
        className="p-6 bg-gray-900/60 border border-gray-800 rounded-xl shadow-sm" style={{
                      backgroundImage:
                        "url(/images/testimonials/download_converted.png)", // Replace with your image path
                      backgroundSize: "cover", // Ensure the image covers the entire container
                      backgroundPosition: "center", // Center the image within the container
                    }}
        aria-labelledby="rewards-title"
      >
        <h2 id="rewards-title" className="text-xl font-semibold text-green-400 mb-3">
          The Skygreen Rewards Program
        </h2>

        <div className="text-white space-y-4">
          <p>
            We value the trust you place in us, and we believe it should be rewarded. The Skygreen Rewards Program is
            designed to give back to everyone who helps our community grow.
          </p>

          <div>
            <h4 className="font-semibold text-green-400 mb-2">How it works:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Join the Program</strong> → Sign up and get your unique Skygreen Family ID &amp; referral code.
              </li>
              <li>
                <strong>Share &amp; Refer</strong> → Invite friends, dealers, installers, or customers to join the
                SKYGREEN Family.
              </li>
              <li>
                <strong>Earn Rewards</strong> → For every successful installation, you earn ₹1500 cash reward or an
                exclusive gift voucher.
              </li>
            </ul>
          </div>

          <p className="text-sm">💡 The more you share, the more you earn — there’s no limit to your rewards.</p>
        </div>
      </section>

      {/* Section 2 */}
      <section
        id="why-join"
        className="p-6 bg-gray-900/60 border border-gray-800 rounded-xl shadow-sm"style={{
                      backgroundImage:
                        "url(/images/testimonials/download_converted.png)", // Replace with your image path
                      backgroundSize: "cover", // Ensure the image covers the entire container
                      backgroundPosition: "center", // Center the image within the container
                    }}
        aria-labelledby="join-title"
      >
        <h2 id="join-title" className="text-xl font-semibold text-green-400 mb-3">
          Why Join the Skygreen Family?
        </h2>

        <div className="text-white space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Belonging</strong>: Be part of a fast-growing clean energy network across India.
            </li>
            <li>
              <strong>Earnings</strong>: Turn your referrals into real income or rewards.
            </li>
            <li>
              <strong>Recognition</strong>: Get featured on our leaderboards and special campaigns.
            </li>
            <li>
              <strong>Transparency</strong>: Every referral is tracked in your Rewards Dashboard.
            </li>
            <li>
              <strong>Impact</strong>: Every panel installed through you contributes to India’s clean energy mission.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
