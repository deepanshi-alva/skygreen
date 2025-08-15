import React from 'react';
import { Clock, CreditCard, Shield, MessageCircle, RefreshCw, Hand } from 'lucide-react';

function App() {
  const features = [
    {
      icon: Clock,
      title: "Price Guarantee",
      description: "30 Days"
    },
    {
      icon: CreditCard,
      title: "Buy Now, Pay Later",
      description: "Flexible payment options"
    },
    {
      icon: Shield,
      title: "Warranty Protection",
      description: "Full coverage"
    },
    {
      icon: MessageCircle,
      title: "24/7 Help Center",
      description: "Always available"
    },
    {
      icon: RefreshCw,
      title: "Trade in",
      description: "Easy exchanges"
    },
    {
      icon: Hand,
      title: "30% Tax Rebate",
      description: "Save more"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#021f0c] text-white">
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 ">
          <span className='px-15 pb-2' style={{
            borderBottom: "2px solid",
            borderImage:
              "linear-gradient(to right, #000000ff, #3ef838, #000000ff) 1",
          }}>Why Shop on <span className='text-[#acfe53]'>Sky Green</span></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-8 rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mb-6">
                  <IconComponent className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;