import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Basic",
    price: "Contact for Quote",
    description: "Perfect for small businesses",
    features: [
      "Custom Website Development",
      "Mobile Responsive Design",
      "Basic SEO Setup",
      "3 Months Support"
    ]
  },
  {
    name: "Professional",
    price: "Contact for Quote",
    description: "Ideal for growing companies",
    features: [
      "Everything in Basic",
      "E-commerce Integration",
      "M-Pesa Payment Gateway",
      "Custom API Development",
      "6 Months Support"
    ],
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Contact for Quote",
    description: "For large-scale solutions",
    features: [
      "Everything in Professional",
      "IoT Integration",
      "Cloud Infrastructure Setup",
      "24/7 Priority Support",
      "Custom Feature Development"
    ]
  }
];

export default function Pricing() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 relative">
          Service Packages
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
          <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`
                rounded-xl p-8 
                ${plan.highlighted 
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white transform scale-105 shadow-xl' 
                  : 'bg-white text-gray-900 shadow-lg'}
              `}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="text-xl font-semibold mb-2">{plan.price}</div>
              <p className={`mb-8 ${plan.highlighted ? 'text-white/90' : 'text-gray-500'}`}>
                {plan.description}
              </p>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`
                  w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 group relative overflow-hidden
                  ${plan.highlighted 
                    ? 'bg-white text-blue-600 hover:shadow-lg hover:-translate-y-1' 
                    : 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:shadow-lg hover:-translate-y-1'}
                `}
              >
                <span className="relative z-10">Contact for Quote</span>
                {!plan.highlighted && (
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0 
                    transition-opacity duration-300 group-hover:opacity-100" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}