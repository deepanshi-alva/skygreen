import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-700 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 px-0 text-left flex items-center justify-between hover:bg-gray-800 transition-colors duration-200"
      >
        <h3 className="text-lg font-semibold text-green-400 pr-4">
          {title}
        </h3>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-green-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-green-400" />
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <div className="text-white">
          {children}
        </div>
      </div>
    </div>
  );
}