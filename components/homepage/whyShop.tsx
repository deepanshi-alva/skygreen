import React from 'react';
import { Shield, IndianRupee, Zap, ShoppingCart, PhoneCall, Truck } from 'lucide-react';

function App() {
  const features = [
    {
      icon: IndianRupee,
      title: "Price Guarantee",
      description: "Transparent pricing — zero hidden costs. If you ever find a lower price for the same certified panel, we'll match it — because trust is priceless."
    },
    {
      icon: Zap,
      title: "48-Hour Dispatch",
      description: "India's fastest solar supply chain. All confirmed orders leave our warehouse within 48 hours — or you get a discount. No waiting, no delays."
    },
    {
      icon: Shield,
      title: "Fast Warranty (48 hrs)",
      description: "Replacements without the wait. Forget weeks of chasing — genuine warranty claims are approved within 48 hours. Your peace of mind, protected."
    },
    {
      icon: ShoppingCart,
      title: "Buy Now, Pay Later",
      description: "Grow without cash-flow stress. Flexible credit options so dealers & EPCs can scale projects today, without worrying about tomorrow's payments. T&C Applied."
    },
    {
      icon: PhoneCall,
      title: "Dedicated Help Center",
      description: "Real people. Real help. 24/7 WhatsApp, phone, and email support — whether you’re a dealer, EPC, or customer, we’re always just a call away."
    },
    {
      icon: Truck,
      title: "EPC Rescue Hotline",
      description: "When others fail, we deliver. If a competitor leaves you stuck, our emergency hotline ensures panels reach your site the very same day."
    }
  ];

  return (
    <div className=" bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 leading-snug"
        >
          <span
            className="px-2 sm:px-4 pb-1 sm:pb-2 inline-block"
            style={{
              borderBottom: "2px solid",
              borderImage:
                "linear-gradient(to right, #000000ff, #3ef838, #000000ff) 1",
            }}
          >
            Why Shop on{" "}
            <span className="text-[#acfe53]">Sky Green</span>
          </span>
        </h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center 
             p-10 w-full rounded-lg 
             bg-gray-900 hover:bg-gray-800 transition-all duration-300 hover:scale-105 
             hover:shadow-[0_0_24px_4px_#7ffe36]
             bg-[radial-gradient(circle,_#194500_1.2px,_transparent_1.7px)] bg-[size:16px_16px]"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mb-4">
                  <IconComponent className="w-8 h-8 text-black" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>

            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;