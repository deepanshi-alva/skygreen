import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function HeadOfficeInfo() {
  return (
    <section className="mt-12 pt-10 border-t border-gray-800">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left big heading */}
        <div>
          <h2 className="text-4xl leading-tight font-semibold">
            Head<br />Office
          </h2>
        </div>

        {/* Right details */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Tel */}
            <div className="grid grid-cols-[1.5rem_6rem_1fr] items-center gap-4">
              <Phone className="w-5 h-5 text-green-500" />
              <span className="text-gray-400 font-semibold">Tel.</span>
              <span className="text-white">+91 xxxxxxxxxx</span>
            </div>

            {/* Email 1 */}
            <div className="grid grid-cols-[1.5rem_6rem_1fr] items-center gap-4">
              <Mail className="w-5 h-5 text-green-500" />
              <span className="text-gray-400 font-semibold">Email</span>
              <a href="#" className="text-white hover:underline">
                info@skygreen.com
              </a>
            </div>

            {/* Email 2 */}
            <div className="grid grid-cols-[1.5rem_6rem_1fr] items-center gap-4">
              <Mail className="w-5 h-5 text-green-500" />
              <span className="text-gray-400 font-semibold">Email</span>
              <a href="mailto:sales@skygreen.com" className="text-white hover:underline">
                sales@skygreen.com
              </a>
            </div>

            {/* Address */}
            <div className="grid grid-cols-[1.5rem_6rem_1fr] items-start gap-4">
              <MapPin className="w-5 h-5 text-green-500 mt-1" />
              <span className="text-gray-400 font-semibold">Address</span>
              <address className="not-italic text-white leading-7">
                SKYGREEN Energy<br />
                D-86368, sec-63,<br />
                Noida, India
              </address>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
