import React from 'react';
import { AccordionItem } from './AccordionItem';

export function ReferralProgram() {
  return (
    <div className="space-y-0">
      {/* Section 1: Refer Friends */}
      <AccordionItem title="The Skygreen Rewards Program" defaultOpen={true}>
        <div className="space-y-4">
          <div className="space-y-3">
            <p>
              We value the trust you place in us, and we believe it should be rewarded. The Skygreen Rewards Program is designed to give back to everyone who helps our community grow.
            </p>
            <div className="">
              <h4 className="font-semibold text-green-400 mb-2">How it works:</h4>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li><span className='font-semibold'>Join the Program</span> → Sign up and get your unique Skygreen Family ID & referral code.</li>
                <li><span className='font-semibold'>Share & Refer</span> → Invite friends, dealers, installers, or customers to join the SKYGREEN Family.</li>
                <li><span className='font-semibold'>Earn Rewards</span> → For every successful installation, you earn ₹1500 cash reward or an exclusive gift voucher.</li>
              </ul>
            </div>
          </div>
          <p className='text-sm'>💡 The more you share, the more you earn — there’s no limit to your rewards.</p>
        </div>
      </AccordionItem>

      {/* Section 2: Join SkyCredits */}
      <AccordionItem title="Why Join the Skygreen Family?">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="">
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li><span className='font-semibold'>Belonging</span>: Be part of a fast-growing clean energy network across India.</li>
                <li><span className='font-semibold'>Earnings</span>: Turn your referrals into real income or rewards.</li>
                <li><span className='font-semibold'>Recognition</span>: Get featured on our leaderboards and special campaigns.</li>
                <li><span className='font-semibold'>Transparency</span>: Every referral is tracked in your Rewards Dashboard.</li>
                <li><span className='font-semibold'>Impact</span>: Every panel installed through you contributes to India’s clean energy mission.</li>
              </ul>
            </div>
          </div>
        </div>
      </AccordionItem>
    </div>
  );
}
