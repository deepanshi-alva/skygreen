import React from 'react';
import { AccordionItem } from './AccordionItem';

export function ReferralProgram() {
  return (
    <div className="space-y-0">
      {/* Section 1: Refer Friends */}
      <AccordionItem title="Refer Friends to Sky Green and Earn Cash Rewards." defaultOpen={true}>
        <div className="space-y-4">
          <p className="text-lg text-white">
            Give a 5% off coupon, and earn up to ₹40,000 cash per referral.
          </p>
          <div className="space-y-3">
            <p>
              Share the power of Sky Green with your network. When your friends make their first 
              purchase using your referral code, they’ll get 5% off their order and you’ll earn 
              cash rewards based on their purchase amount.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold text-green-400 mb-2">How it works:</h4>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Share your unique referral link</li>
                <li>Your friend gets 5% off their first order</li>
                <li>You earn up to ₹40,000 cash per successful referral</li>
                <li>No limit on the number of referrals</li>
              </ul>
            </div>
          </div>
          <a 
            href="#" 
            className="inline-flex items-center text-green-400 hover:text-green-300 font-medium transition-colors duration-200"
          >
            Learn More
            <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </AccordionItem>

      {/* Section 2: Join SkyCredits */}
      <AccordionItem title="Join the SkyCredits Reward Program.">
        <div className="space-y-4">
          <p className="text-lg text-white">
            Unlock exclusive rewards and benefits every time you shop, refer, or engage with Sky Green.
          </p>
          <div className="space-y-3">
            <p>
              The SkyCredits Reward Program lets you collect points for every purchase, successful referral, or special activity. 
              Redeem your SkyCredits for discounts, exclusive merchandise, or even cashback.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold text-green-400 mb-2">How to Earn SkyCredits:</h4>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Earn SkyCredits for every ₹ spent on our platform</li>
                <li>Get bonus credits for referring friends and family</li>
                <li>Participate in special promotions and events</li>
                <li>Share feedback or reviews to earn extra credits</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold text-green-400 mb-2">How to Use SkyCredits:</h4>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Redeem for instant discounts on future purchases</li>
                <li>Exchange for exclusive SkyGreen merchandise</li>
                <li>Use credits for cashback or gift cards</li>
              </ul>
            </div>
          </div>
          <a 
            href="#" 
            className="inline-flex items-center text-green-400 hover:text-green-300 font-medium transition-colors duration-200"
          >
            Discover More
            <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </AccordionItem>
    </div>
  );
}
