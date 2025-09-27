import React from "react";

export function ReferralProgram() {
  return (
    <div className="flex flex-col gap-6">
      {/* Section 2 */}
      <section
        id="why-join"
        className="p-6 bg-gray-900/60 border border-gray-800 rounded-xl shadow-sm"
        style={{
          backgroundImage: "url(/images/testimonials/download_converted.png)", // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-labelledby="join-title"
      >
        <h2
          id="join-title"
          className="text-xl font-semibold text-green-400 mb-3"
        >
          Why Join the Skygreen Family?
        </h2>

        <div className="text-white space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>S - Support</strong>: We stand with you, always.
            </li>
            <li>
              <strong>K - Kindness</strong>: We treat every customer like our
              own family.
            </li>
            <li>
              <strong>Y - Yours</strong>: The energy is in your hands, not the
              power company’s.
            </li>
            <li>
              <strong>G - Goodness</strong>: We believe in honesty, fairness,
              and doing the right thing.
            </li>
            <li>
              <strong>R - Reliable</strong>: Our panels keep working in rain,
              dust, and heat.
            </li>
            <li>
              <strong>E - Easy</strong>: Simple to use, simple to save money.
            </li>
            <li>
              <strong>E - Equal</strong>: Every home, rich or poor, deserves
              clean energy.
            </li>
            <li>
              <strong>N - Nature</strong>: We care for our planet, so your
              children breathe better tomorrow.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 1 */}
      <section
        id="rewards-program"
        className="p-6 bg-gray-900/60 border border-gray-800 rounded-xl shadow-sm"
        style={{
          backgroundImage: "url(/images/testimonials/download_converted.png)", // Replace with your image path
          backgroundSize: "cover", // Ensure the image covers the entire container
          backgroundPosition: "center", // Center the image within the container
        }}
        aria-labelledby="rewards-title"
      >
        <h2
          id="rewards-title"
          className="text-xl font-semibold text-green-400 mb-3"
        >
          The Skygreen Rewards Program (Coming Soon)
        </h2>

        <div className="text-white space-y-4">
          <p>
            We value the trust you place in us, and we believe it should be
            rewarded. The Skygreen Rewards Program is designed to give back to
            everyone who helps our community grow.
          </p>

          <div>
            <h4 className="font-semibold text-green-400 mb-2">How it works:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Join the Program</strong> → Sign up and get your unique
                Skygreen Family ID &amp; referral code.
              </li>
              <li>
                <strong>Share &amp; Refer</strong> → Invite friends, dealers,
                installers, or customers to join the SKYGREEN Family.
              </li>
              <li>
                <strong>Earn Rewards</strong> → For every successful
                installation, you&apos;ll earn exciting rewards and exclusive
                benefits. (Details will be announced soon!)
              </li>
            </ul>
          </div>

          <p className="text-sm">
            💡 The more you share, the more you earn — there’s no limit to your
            rewards.
          </p>
        </div>
      </section>
    </div>
  );
}
