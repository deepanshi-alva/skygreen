import React from 'react';
import { AccordionItem } from './AccordionItem';

export function ReferralProgram() {
  return (
    <div className="space-y-0">
      <AccordionItem title="Refer Friends to EcoFlow and Earn Cash Rewards." defaultOpen={true}>
        <div className="space-y-4">
          <p className="text-lg text-white">
            Give a 5% off coupon, and earn up to $500 in cash per referral.
          </p>
          <div className="space-y-3">
            <p>
              Share the power of EcoFlow with your friends and family. When they make their first 
              purchase using your referral code, they`&apos;`ll get 5% off their order and you`&apos;`ll earn 
              cash rewards based on their purchase amount.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold text-green-400 mb-2">How it works:</h4>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Share your unique referral link</li>
                <li>Friend gets 5% off their first order</li>
                <li>You earn up to $500 cash per successful referral</li>
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
    </div>
  );
}